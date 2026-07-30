import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../entities/account.entity';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Contest } from '../../../entities/contest.entity';
import { NgFor } from '@angular/common';
import { ContentService } from '../../../services/content.service';
import { AnnouncementService } from '../../../services/announcement.service';
import { Announcement } from '../../../entities/announcement.entity';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../entities/category.entity';
import { DialogModule } from 'primeng/dialog';
import { Contact } from '../../../entities/contact.entity';
import { ContactService } from '../../../services/contact.service';
@Component({
  standalone: true,
  templateUrl: './contact.component.html',
  host: { 'collision-id': 'ContactComponent' },
  styleUrls: ['./contact.component.css'],
  imports: [RouterOutlet, RouterLink, TableModule, ButtonModule, NgFor, ReactiveFormsModule, FormsModule, DialogModule]
})
export class ContactComponent implements OnInit {
  accountInfoForm: FormGroup;
  contacts: Contact[];
  contact: Contact;
  contactForm: FormGroup;
  addForm: FormGroup;
  visible: boolean = false;
  visible2: boolean = false;
  @ViewChild('dt2') dt2: Table;
  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) {

  }
  ngOnInit() {
    this.contactService.findAll().then(
      res => {
        this.contacts = res as Contact[];
      },
      err => {
        console.log(err);
      }
    )

  }
  confirmDelete(contactId: number) {
    if (confirm("Are you sure you want to delete this content?")) {
      this.contactService.delete(contactId).then(
        res => {
          let result: boolean = res["result"];
          if (result) {
            this.ngOnInit();

          } else {
            alert("False")
          }
        },
        err => {
          console.log(err)
        }
      )
    }
  }
  onGlobalFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt2.filterGlobal(inputElement.value, 'contains');
  }
}
