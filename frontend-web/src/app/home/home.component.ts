import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Content } from '../entities/content.entity';
import { ContentService } from '../services/content.service';
import { SubscriptionComponent } from '../payment/app-subscription/subscription.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { FAQ } from '../entities/faq.entity';
import { FAQService } from '../services/faq.service';
import { NgFor, NgIf } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { MessageService } from 'primeng/api';
import { NotificationService } from '../services/Notification.service';
import { ToastModule } from 'primeng/toast';
@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, SubscriptionComponent, RatingModule, FormsModule, NgIf, NgFor, GalleriaModule,ToastModule],
  templateUrl: './home.component.html',
  providers: [MessageService],
  host: { 'collision-id': 'HomeComponent' }
})
export class HomeComponent implements OnInit {
  contents: Content[];
  faqs: FAQ[];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 2
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 2
    }
  ];

  constructor(
    private contentService: ContentService,
    private fAQService: FAQService,
    private notificationService: NotificationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    // Listen for messages from the NotificationService
    this.notificationService.message$.subscribe(message => {
      this.messageService.add(message);
    });

    // Load initial data
    if (sessionStorage.getItem('username') == null) {
      this.contentService.findLatetFree(3).then(
        res => {
          this.contents = res as Content[];
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.contentService.findLatetNotFree(sessionStorage.getItem('username'), 3).then(
        res => {
          this.contents = res as Content[];
        },
        err => {
          console.log(err);
        }
      );
    }
    this.fAQService.findAll().then(
      res => {
        this.faqs = res as FAQ[];
      },
      err => {
        console.log(err);
      }
    );
  }
}
