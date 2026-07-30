import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { Content } from '../../entities/content.entity';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../entities/category.entity';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    standalone: true,
    imports: [RouterOutlet, RouterLink, ReactiveFormsModule, FormsModule, TableModule, PaginatorModule, RatingModule, DialogModule, ToastModule],
    templateUrl: './recipePosted.component.html',
    providers: [DialogService, MessageService],
    host: { 'collision-id': 'RecipesDetailsComponent' }
})
export class RecipePostedComponent implements OnInit {
    categories: Category[] = [];
    contents: Content[] = [];
    editcontentForm: FormGroup;
    file: File;
    imageUrl: string;
    displayDialog: boolean = false;
    selectedContent: any;
    contentForm: FormGroup;
    contentAddForm: FormGroup;
    displayAddContent: boolean = false;
    userId: string | null = null;

    constructor(
        private categoryService: CategoryService,
        private contentService: ContentService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private messageService: MessageService
    ) {
        this.contentForm = this.formBuilder.group({
            contentId: [''],
            title: [''],
            categoryId: [''],
            content1: [''],
            isFree: [false],
            contentType: [''],
            updatedAt: [''],
            userId: ['']
        });
        this.contentAddForm = this.formBuilder.group({
            title: [''],
            categoryId: [''],
            content1: [''],
            isFree: [false],
            contentType: [''],
            createdAt: [''],
        });
    }

    async ngOnInit(): Promise<void> {
        try {
            this.categories = await this.categoryService.findAll() as Category[];
        } catch (err) {
            this.showMessage('error', 'Error', 'Failed to load categories');
            console.log(err);
        }

        this.contentService.recipesUser(sessionStorage.getItem('username')).then(
            res => {
                this.contents = res as Content[];
            },
            err => {
                console.log(err);
            }
        );
        await this.loadContentData(sessionStorage.getItem('username'));
        this.activatedRoute.paramMap.subscribe((params) => {
            this.userId = params.get('userId');
        });
        
    }

    async loadContentData(username: string) {
        try {
            this.contents = await this.contentService.recipesUser(username) as Content[];
        } catch (err) {
            console.log(err);
        }
    }

    viewContentDetails(content: any) {
        this.selectedContent = content;
        this.contentForm.patchValue({
            contentId: content.contentId,
            title: content.title,
            content1: content.content1,
            isFree: content.isFree,
            contentType: content.contentType,
            categoryId: content.categoryId,
            updatedAt: new Date().toISOString(),
            userId: content.userId
        });
        console.log(this.selectedContent);
        this.displayDialog = true;
    }

    viewAddContent() {
        this.contentAddForm.patchValue({
            title: '',
            content1: '',
            isFree: true,
            contentType: 'recipes',
            categoryId: '1',
            createdAt: new Date().toISOString(),
        })
        this.displayAddContent = true;
    }

    save() {
        let content: Content = this.contentForm.value as Content;
        let str_json: string = JSON.stringify(content);
        let formData = new FormData();
        if (this.file != null) {
            formData.append('file', this.file);
        }
        formData.append('sjson', str_json);
        console.log(str_json);
        console.log(this.file);
        this.contentService.update(formData).then(
            res => {
                let result: boolean = res['result'];
                if (result) {
                    this.displayDialog = false;
                    this.loadContentData(sessionStorage.getItem('username'));
                    this.showMessage('success', 'Success', 'Content updated successfully');
                } else {
                    this.showMessage('error', 'Error', 'Failed to update content');
                }
            },
            err => {
                this.showMessage('error', 'Error', 'Failed to update content');
                console.log(err);
            }
        );
    }

    submit() {
        if (!this.userId) {
            this.showMessage('error', 'Error', 'User ID is missing');
            return;
        }
        let content: Content = this.contentAddForm.value as Content;
        content.userId = this.userId;
        let str_json: string = JSON.stringify(content);
        let formData = new FormData();
        if (this.file != null) {
            formData.append('file', this.file);
        }
        formData.append('sjson', str_json);
        // Log formData for debugging
        formData.forEach((value, key) => {
            console.log(key, value);
        });
        console.log(content);
        this.contentService.create(formData).then(
            res => {
                let result: boolean = res['Result'];
                if (!result) {
                    this.displayAddContent = false;
                    this.loadContentData(sessionStorage.getItem('username'));
                    this.showMessage('success', 'Success', 'Content created successfully');
                } else {
                    this.showMessage('error', 'Error', 'Failed to create content');
                }
            },
            err => {
                this.showMessage('error', 'Error', 'Failed to create content');
                console.log(err);
            }
        );
    }

    onFileChange(evt: any) {
        this.file = evt.target.files[0];
        if (this.file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.imageUrl = e.target.result;
                const previewImage = document.getElementById('preview') as HTMLImageElement;
                if (previewImage) {
                    previewImage.style.display = 'block';
                }
            };
            reader.readAsDataURL(this.file);
        }
    }

    searchByKeyword(evt: any) {
        let keyword = evt.target.value;
        if (!keyword) {
            this.loadContentData(sessionStorage.getItem('username'));
        } else {
            this.contentService.findByKeywordUsername(keyword, sessionStorage.getItem('username')).then(
                res => {
                    this.contents = res as Content[];
                },
                err => {
                    console.log(err);
                }
            );
        }
    }

    delete(id: number) {
        let result = confirm('Are you sure?');
        if (result) {
            this.contentService.delete(id).then(
                res => {
                    let result: boolean = res['result'];
                    if (result) {
                        this.loadContentData(sessionStorage.getItem('username'));
                        this.showMessage('success', 'Success', 'Content deleted successfully');
                    } else {
                        this.showMessage('error', 'Error', 'Failed to delete content');
                    }
                },
                err => {
                    this.showMessage('error', 'Error', 'Failed to delete content');
                    console.log(err);
                }
            );
        }
    }

    showMessage(severity: string, summary: string, detail: string) {
        this.messageService.add({ severity, summary, detail });
    }
}
