import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { NgFor } from '@angular/common';
import { Content } from '../../../entities/content.entity';
import { ContentService } from '../../../services/content.service';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../entities/account.entity';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../entities/category.entity';
import { json } from 'stream/consumers';

@Component({
  standalone: true,
  templateUrl: './addContent.component.html',
  host: { 'collision-id': 'AddContentComponent' },
  styleUrls: ['./addContent.component.css'],
  imports: [RouterOutlet, RouterLink, TableModule, ButtonModule, NgFor, ReactiveFormsModule]
})
export class AddContentComponent implements OnInit {
  addForm: FormGroup;
  contents: Content[];
  file: File | null = null;
  username: string;
  accounts: Account[];
  categories : Category[];
  userId : string;
  selectedFileName: string = 'No file chosen';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contentService: ContentService,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private activatedRoute : ActivatedRoute

  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p =>{
      this.userId = p.get('userId');

    })
    this.addForm = this.formBuilder.group({
      title: '',
      contentType: 'recipe',
      content1: '',
      createdAt: new Date().toISOString(),
      isFree: true,
      categoryId : '',
    });

    this.accountService.findAll().then(
      res =>{
        let account = res as Account[];
        
      }
    );
    this.categoryService.findAll().then(
      res =>{
         this.categories = res as Category[];
      }
    )
  }

  selectFile(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.selectedFileName = this.file.name;
    } else {
      this.selectedFileName = 'No file chosen';
    }
  }

  save() {
    const content: Content = this.addForm.value as Content;
    content.userId = this.userId;
    const formData = new FormData();
    formData.append('sjson', JSON.stringify(content));
    
    if (this.file != null) {
      formData.append('file', this.file);
    }
    console.log(content);
    this.contentService.create(formData).then(
      res => {
        let result: boolean = res['result'];
        if (result) {
          this.router.navigate(['admin/content']);
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
