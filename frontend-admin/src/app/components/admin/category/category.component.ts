import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../entities/account.entity';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Contest } from '../../../entities/contest.entity';
import { NgFor } from '@angular/common';
import { ContentService } from '../../../services/content.service';
import { AnnouncementService } from '../../../services/announcement.service';
import { Announcement } from '../../../entities/announcement.entity';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../entities/category.entity';
import { DialogModule } from 'primeng/dialog';
@Component({
  standalone: true,
  templateUrl: './category.component.html',
  host: { 'collision-id': 'CategoryComponent' },
  styleUrls: ['./category.component.css'],
  imports: [RouterOutlet, RouterLink, TableModule, ButtonModule, NgFor, ReactiveFormsModule, FormsModule, DialogModule]
})
export class CategoryComponent implements OnInit {
  accountInfoForm: FormGroup
  categories: Category[];
  category: Category;
  winnerUserId: string;
  updateForm: FormGroup;
  addForm: FormGroup;
  visible: boolean = false;
  visible2: boolean = false;
  constructor(
    private contentService: ContentService,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {

  }
  ngOnInit() {
    this.categoryService.findAll().then(
      res => {
        this.categories = res as Category[];
      },
      err => {
        console.log(err);
      }
    )

  }
  confirmDelete(categoryId: number) {
    if (confirm("Are you sure you want to delete this content?")) {
      this.categoryService.delete(categoryId).then(
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
  reloadPage() {
    location.reload();
  }
  showDialog(category: any) {
    this.updateForm = this.formBuilder.group({
      categoryId: category.categoryId,
      categoryName: category.categoryName,
    });
    this.visible = true;
  }
  showDialog2() {
    this.addForm = this.formBuilder.group({
      categoryName: "",
    });
    this.visible2 = true;
  }
  save() {
    const category: Category = this.updateForm.value as Category;
    const formData = new FormData();
    formData.append('sjson', JSON.stringify(category));
    this.categoryService.update(formData).then(
      res => {
        let result: boolean = res['result'];
        if (result) {
          this.reloadPage();
        } else {
          alert('Failed');
        }
      },
      err => {

        console.log(err);
      }
    );
  }
  save2() {
    let category: Category = this.addForm.value as Category;
    this.categoryService.create(category).then(
      res => {
        let result: boolean = res['result'];
        if (result) {
          this.reloadPage();
        } else {
          alert('Failed');
        }
      },
      err => {

        console.log(err);
      }
    );
  }
}
