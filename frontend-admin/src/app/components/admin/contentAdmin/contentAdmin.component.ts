import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../entities/account.entity';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Contest } from '../../../entities/contest.entity';
import { NgFor } from '@angular/common';
import { ContentService } from '../../../services/content.service';
import { DialogModule } from 'primeng/dialog';
import { Content } from '../../../entities/content.entity';
import { Category } from '../../../entities/category.entity';
import { CategoryService } from '../../../services/category.service';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../../../pipes.module';
@Component({
  standalone: true,
  templateUrl: './contentAdmin.component.html',
  host: { 'collision-id': 'contentAdminComponent' },
  styleUrls: ['./contentAdmin.component.css'],
  imports: [
    RouterOutlet, 
    RouterLink, 
    TableModule, 
    ButtonModule, 
    NgFor, 
    DialogModule, 
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
    FormsModule,
    PipesModule
  ]
})
export class contentAdminComponent implements OnInit {
  selectedFileName: string = 'No file chosen';
  updateForm: FormGroup
  contents: Content[];
  account: Account;
  username: string;
  winnerUserId: string;
  userId: string;
  visible: boolean = false;
  dislogAdd: boolean = false;
  file: File | null = null;
  categories: Category[];
  content: any;
  addForm: FormGroup;
  selectedCategory: string;
  categoryOptions: any[] = [];
  @ViewChild('dt2') dt2: Table;
  constructor(
    private contentService: ContentService,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {

  }
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
      categoryId : '1',
    });
    this.contentService.findByUsername(sessionStorage.getItem('username')).then(
      res => {
        this.contents = res as Content[];
      },
      err => {
        console.log(err);
      }
    )

    this.accountService.findByUsername(sessionStorage.getItem('username')).then(
      res => {
        this.account = res as Account;
      },
      err => {
        console.log(err)
      }
    )
    this.categoryService.findAll().then(
      res => {
        this.categories = res as Category[];
        this.categoryOptions = this.categories.map(category => ({
          label: category.categoryName,
          value: category.categoryName
        }));
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
  showDialog(content: any) {
    this.updateForm = this.formBuilder.group({
      contentId : content.contentId,
      title: content.title,
      contentType: 'recipe',
      content1: content.content1,
      createdAt: new Date().toISOString(),
      imageUrl : content.imageUrl,
      isFree: content.isFree,
      categoryId: content.categoryId,
      userId : content.userId
    });
    this.visible = true;
  }
  showAddDialog() {
    this.dislogAdd = true;
  }
  submit() {
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
  save() {
    const content: Content = this.updateForm.value as Content;
    const formData = new FormData();
    formData.append('sjson', JSON.stringify(content));
    if (this.file != null) {
      formData.append('file', this.file);
    }
    console.log(content);
    this.contentService.update(formData).then(
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
  selectFile(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.selectedFileName = this.file.name;
    } else {
      this.selectedFileName = 'No file chosen';
    }
  }
  onGlobalFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt2.filterGlobal(inputElement.value, 'contains');
  }
}