import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../entities/category.entity';
import { ContentService } from '../services/content.service';
import { Content } from '../entities/content.entity';
import { DataViewModule } from 'primeng/dataview';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { RatingModule } from 'primeng/rating';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectItem } from 'primeng/api';
@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, DataViewModule, CalendarModule, FormsModule, RatingModule, FloatLabelModule, PaginatorModule,SelectButtonModule],
  templateUrl: './recipes.component.html',
  host: { 'collision-id': 'RecipesComponent' }
})
export class RecipesComponent implements OnInit {
  categories: Category[] = [];
  allContents: any[] = []; // Load tất cả dữ liệu ở đây
  contents: any[] = []; // Dữ liệu hiển thị sau khi phân trang
  contentTypes: string[] = ['Tip', 'Recipes'];
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 9; // Set page size as needed
  startDate: Date | null = null;
  endDate: Date | null = null;
  booleanOptions: SelectItem[] = [
    { label: 'Free', value: true },
    { label: 'Not Free', value: false }
  ];
  isFreeFilterValue: boolean = true;
  constructor(
    private categoryService: CategoryService,
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.categories = await this.categoryService.findAll() as Category[];
    } catch (err) {
      alert('Failed to load categories');
      console.log(err);
    }

    this.loadInitialContents();
  }

  private async loadInitialContents() {
    const username = sessionStorage.getItem('username');
    if (username == null) {
      try {
        const result = await this.contentService.findAllfree();
        this.allContents = result as any[];
      } catch (err) {
        console.log('Failed to load all free contents', err);
      }
    } else {
      try {
        const result = await this.contentService.findContentByRole(username);
        this.allContents = result as any[];
      } catch (err) {
        console.log('Failed to load all contents by username', err);
      }
    }
    this.totalPages = Math.ceil(this.allContents.length / this.pageSize);
    this.updatePageContents();

    this.activatedRoute.paramMap.subscribe(p => {
      let categoryId = p.get('categoryId');
      if (categoryId) {
        if (username == null) {
          this.filterByCategoryFree(parseInt(categoryId));
        } else {
          this.filterByCategoryNotFree(username, parseInt(categoryId));
        }
      }
    });
  }

  private updatePageContents() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.contents = this.allContents.slice(start, end);
  }

  private async filterByCategoryFree(categoryId: number) {
    try {
      const result = await this.contentService.findByCategoryIdfree(categoryId.toString());
      this.allContents = result as any[];
      this.totalPages = Math.ceil(this.allContents.length / this.pageSize);
      this.updatePageContents();
    } catch (err) {
      console.log('Failed to load free contents by category', err);
    }
  }

  private async filterByCategoryNotFree(username: string, categoryId: number) {
    try {
      const result = await this.contentService.findByCategoryIdNotFree(username, categoryId.toString());
      this.allContents = result as any[];
      this.totalPages = Math.ceil(this.allContents.length / this.pageSize);
      this.updatePageContents();
    } catch (err) {
      console.log('Failed to load contents by category not free', err);
    }
  }

  async searchByKeyword(evt: any) {
    const keyword = evt.target.value.toLowerCase();
    if (keyword === '') {
      this.loadInitialContents();
    } else {
      const username = sessionStorage.getItem('username');
      if (username == null) {
        try {
          const result = await this.contentService.findByKeywordFree(keyword);
          this.allContents = result as any[];
        } catch (err) {
          console.log('Failed to load free contents by keyword', err);
        }
      } else {
        try {
          const result = await this.contentService.findByKeywordNotFree(username, keyword);
          this.allContents = result as any[];
        } catch (err) {
          console.log('Failed to load contents by keyword not free', err);
        }
      }
      this.totalPages = Math.ceil(this.allContents.length / this.pageSize);
      this.updatePageContents();
    }
  }

  private async filterByDate() {
    const username = sessionStorage.getItem('username');
    try {
      const result = await this.contentService.findByDate(this.startDate!, this.endDate!, username);
      this.allContents = result as any[];
      this.totalPages = Math.ceil(this.allContents.length / this.pageSize);
      this.updatePageContents();
    } catch (err) {
      console.log('Failed to load contents by date', err);
    }
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.updatePageContents();
  }

  async onDateChange() {
    if (this.startDate && this.endDate) {
      this.currentPage = 1; // Reset to first page
      await this.filterByDate();
    }
  }

  async resetFilters() {
    this.startDate = null;
    this.endDate = null;
    this.currentPage = 1;
    this.loadInitialContents();
    this.router.navigate(['recipes']);
  }

  async filterByContentType(contentType: string) {
    const username = sessionStorage.getItem('username');
    try {
      const result = await this.contentService.findByContentType(contentType, username);
      this.allContents = result as any[];
      this.totalPages = Math.ceil(this.allContents.length / this.pageSize);
      this.updatePageContents();
    } catch (err) {
      console.log('Failed to load contents by content type', err);
    }
  }
  filterByIsFree(event: any) {
    const username = sessionStorage.getItem('username');
    if (this.isFreeFilterValue) {
      this.contentService.findAllfree().then(
        result => {
          this.allContents = result as any[];
          this.totalPages = Math.ceil(this.allContents.length / this.pageSize);
          this.updatePageContents();
        },
        err => {
          console.log('Failed to load free contents', err);
        }
      );
    } else {
      this.contentService.findAllNotFree(username).then(
        result => {
          this.allContents = result as any[];
          this.totalPages = Math.ceil(this.allContents.length / this.pageSize);
          this.updatePageContents();
        },
        err => {
          console.log('Failed to load not free contents', err);
        }
      );
    }
  }
}
