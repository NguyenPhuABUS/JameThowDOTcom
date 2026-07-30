import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../entities/account.entity';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Contest } from '../../../entities/contest.entity';
import { ContestService } from '../../../services/contest.service';
import { NgFor } from '@angular/common';
import { ContentService } from '../../../services/content.service';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Content } from '../../../entities/content.entity';
import { ChangeDetectorRef } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.service';
import { Feedback } from '../../../entities/feedback.entity';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { Category } from '../../../entities/category.entity';
import { CategoryService } from '../../../services/category.service';
import { Payment } from '../../../entities/payment.entity';
import { PaymentService } from '../../../services/payment.service';
@Component({
  standalone: true,
  templateUrl: './payment.component.html',
  host: { 'collision-id': 'PaymentComponent' },
  styleUrls: ['./payment.component.css'],
  imports: [RouterOutlet,
    RouterLink,
    TableModule,
    ButtonModule,
    NgFor,
    DialogModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    DropdownModule,
    TagModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule
  ]
})
export class PaymentComponent implements OnInit {
  payments: Payment[];
  @ViewChild('dt2') dt2: Table;
  constructor(
    private paymentService: PaymentService,
  ) {

  }
  ngOnInit() {
    this.paymentService.findAll().then(
      res => {
        this.payments = res as Payment[];
      },
      err => {
        console.log(err);
      }
    );
  }
  onGlobalFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt2.filterGlobal(inputElement.value, 'contains');
  }
}
