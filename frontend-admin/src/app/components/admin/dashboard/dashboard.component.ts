import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormGroup, FormsModule, NgModel } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../entities/account.entity';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ContestComponent } from '../contest/contest.component';
import { ContestService } from '../../../services/contest.service';
import { Contest } from '../../../entities/contest.entity';
import { Content } from '../../../entities/content.entity';
import { ContentService } from '../../../services/content.service';
import { AnnouncementService } from '../../../services/announcement.service';
import { Announcement } from '../../../entities/announcement.entity';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../entities/category.entity';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../../entities/contact.entity';
import { PaymentService } from '../../../services/payment.service';
import { Payment } from '../../../entities/payment.entity';
@Component({
  standalone: true,
  templateUrl: './dashboard.component.html',
  host: { 'collision-id': 'DashboardComponent' },
  imports : [RouterOutlet, RouterLink,TableModule,ButtonModule,CheckboxModule,FormsModule]
})
export class DashboardComponent implements OnInit {
  accounts: any[] = []; // Khai báo một mảng để lưu trữ danh sách tài khoản
  totalAccounts: number = 0; // Biến để lưu tổng số tài khoản
  contests : Contest[];
  totalContest : number = 0;
  contents : Content[];
  totalContent : number = 0;
  announcements : Announcement[];
  totalanouncements : number = 0;
  categories : Category[];
  totalcategories : number = 0;
  contacts : Contact[];
  totalcontact : number = 0;
  payments: Payment[];
  totalpayment : number = 0;
  constructor(
    private accountService: AccountService,
    private contestService : ContestService,
    private contentService : ContentService,
    private annoucementService : AnnouncementService,
    private categoryService : CategoryService,
    private contactService : ContactService,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.loadAccounts(); 
    this.loadContests();
    this.loadContents();
    this.loadAnouncements();
    this.loadcategories();
    this.loadcontacts();
    this.loadPayments();
  }

  loadPayments() {
    this.paymentService.findAll().then(
      (res) => {
        this.payments = res as any[]; // Gán danh sách tài khoản từ service vào biến accounts
        this.totalpayment = this.payments.length; // Tính tổng số tài khoản
      },
      (err) => {
        console.error('Error loading accounts: ', err); // Xử lý lỗi nếu có
      }
    );
  }
  loadAccounts() {
    this.accountService.findAll().then(
      (res) => {
        this.accounts = res as any[]; // Gán danh sách tài khoản từ service vào biến accounts
        this.totalAccounts = this.accounts.length; // Tính tổng số tài khoản
      },
      (err) => {
        console.error('Error loading accounts: ', err); // Xử lý lỗi nếu có
      }
    );
  }
  loadContests(){
    this.contestService.findAll().then(
      (res) =>{
        this.contests = res as Contest[];
        this.totalContest = this.contests.length;
      },
      (err) =>{
        console.log(err);
      }
    )
  }
  loadContents(){
    this.contentService.findAll().then(
      (res) =>{
        this.contents = res as Content[];
        this.totalContent = this.contents.length;
      },
      (err) =>{
        console.log(err);
      }
    )
  }
  loadAnouncements(){
    this.annoucementService.findAll().then(
      (res) =>{
        this.announcements = res as Announcement[];
        this.totalanouncements =this.announcements.length;
      },
      (err) =>{
        console.log(err);
      }
    )
  }
  loadcategories(){
    this.categoryService.findAll().then(
      (res) =>{
        this.categories = res as Category[];
        this.totalcategories =this.categories.length;
      },
      (err) =>{
        console.log(err);
      }
    )
  }
  loadcontacts(){
    this.contactService.findAll().then(
      (res) =>{
        this.contacts = res as Contact[];
        this.totalcontact =this.contacts.length;
      },
      (err) =>{
        console.log(err);
      }
    )
  }
}
