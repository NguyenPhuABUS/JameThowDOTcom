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
import { OrderService } from '../../services/payment.service';
import { Payment } from '../../entities/payment.entity';

@Component({
    standalone: true,
    imports: [RouterOutlet, RouterLink, ReactiveFormsModule, FormsModule, TableModule, PaginatorModule, RatingModule, DialogModule, ToastModule],
    templateUrl: './history.component.html',
    providers: [DialogService, MessageService],
    host: { 'collision-id': 'HistoryComponent' }
})
export class HistoryComponent implements OnInit {
    payments: Payment[];
    constructor(
        private orderService: OrderService
    ) {
        
    }

    async ngOnInit(): Promise<void> {
        try {
            this.payments = await this.orderService.findByUsername(sessionStorage.getItem('username')) as Payment[];
        } catch (err) {
            console.log(err);
        }
    }

}
