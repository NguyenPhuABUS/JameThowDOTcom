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
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PipesModule } from '../../../pipes.module';
@Component({
  standalone: true,
  templateUrl: './content.component.html',
  host: { 'collision-id': 'ContentComponent' },
  styleUrls: ['./content.component.css'],
  providers: [MessageService],
  imports: [
    RouterOutlet,
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
    IconFieldModule,
    MultiSelectModule,
    CommonModule,
    HttpClientModule,
    ToastModule,
    PipesModule,
  ]
})
export class ContentComponent implements OnInit {
  accountInfoForm: FormGroup;
  feedbackForm: FormGroup;
  contests: Contest[];
  contents: Content[];
  account: Account;
  winnerUserId: string;
  visible: boolean = false;
  feedbacks: Feedback[];
  categorys: Category[];
  selectedCategory: string;
  categoryOptions: any[] = [];
  @ViewChild('dt2') dt2: Table;
  expandedRows: any = {};
  detailsDialog: boolean = false;
  selectedContent: Content;

  constructor(
    private contentService: ContentService,
    private accountService: AccountService,
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.categoryService.findAll().then(
      res => {
        this.categorys = res as Category[];
        this.categoryOptions = this.categorys.map(category => ({
          label: category.categoryName,
          value: category.categoryName
        }));
      },
      err => {
        console.log(err);
      }
    );
    this.contentService.findAll().then(
      res => {
        this.contents = res as Content[];
      },
      err => {
        console.log(err);
      }
    );

    this.accountService.findByUsername(sessionStorage.getItem('username')).then(
      res => {
        this.account = res as Account;
      },
      err => {
        console.log(err);
      }
    );
  }

  confirmDelete(contentId: number) {
    if (confirm("Are you sure you want to delete this content?")) {
      this.contentService.delete(contentId).then(
        res => {
          let result: boolean = res["result"];
          if (result) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Content deleted successfully' });
            this.ngOnInit();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete content' });
          }
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting content' });
          console.log(err);
        }
      );
    }
  }

  reloadPage() {
    location.reload();
  }

  search(evt: any) {
    let keyword = evt.target.value;
    if (keyword == '') {
      this.contentService.findAll().then(
        res => {
          this.contents = res as Content[];
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.contentService.findByKeyword(keyword).then(
        res => {
          this.contents = res as Content[];
          console.log('Search results:', this.contents);
          this.cd.detectChanges();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  showDialog(content: any) {
    console.log(content.contentId);
    this.feedbackService.findById(content.contentId).then(
      res => {
        this.feedbacks = res as Feedback[];
        this.visible = true;
      },
      err => {
        alert('Failed');
        console.log(err);
      }
    );
  }

  showDetailDialog(content: Content) {
    this.selectedContent = content;
    this.detailsDialog = true;
  }

  onGlobalFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt2.filterGlobal(inputElement.value, 'contains');
  }
}
