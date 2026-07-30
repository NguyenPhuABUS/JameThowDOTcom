import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../entities/account.entity';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Contest } from '../../../entities/contest.entity';
import { ContestService } from '../../../services/contest.service';
import { NgFor, NgIf } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  standalone: true,
  templateUrl: './contest.component.html',
  host: { 'collision-id': 'ContestComponent' },
  providers: [MessageService, ConfirmationService],
  imports: [RouterOutlet, RouterLink, TableModule, ButtonModule, NgFor, ConfirmDialogModule, ReactiveFormsModule, DialogModule, NgIf, ToastModule]
})
export class ContestComponent implements OnInit {
  accountInfoForm: FormGroup
  contests: Contest[];
  account: Account;
  winnerUserId: string;
  addcontestForm: FormGroup;
  display: boolean = false;
  @ViewChild('dt2') dt2: Table;
  updateContestForm: FormGroup;
  updateContestDialog: boolean = false;
  constructor(
    private contestService: ContestService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.addcontestForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.contestService.findAll().then(
      res => {
        this.contests = res as Contest[];
      },
      err => {
        console.log(err);
      }
    )
  }
  show() {
    this.display = true;
  }
  confirmDelete(contestId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this contest?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contestService.delete(contestId).then(
          res => {
            let result: boolean = res["result"];
            if (result) {
              this.ngOnInit();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Package deleted successfully' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete package' });
            }
          },
          err => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete package' });
          }
        );
      }
    });
  }
  submit() {
    const contest: Contest = this.addcontestForm.value as Contest;
    const formData = new FormData();
    formData.append('sjson', JSON.stringify(contest));
    this.contestService.create(formData).then(
      res => {
        const result: boolean = res['result'];
        const message: string = res['message'];
        if (result) {
          this.display = false;
          this.ngOnInit();
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: message || 'Failed to submit entry' });
        }
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
  showDialog(contest: any) {
    const startDate = new Date(contest.startDate);
    const endDate = new Date(contest.endDate);

    this.updateContestForm = this.formBuilder.group({
      contestId: [contest.contestId],
      title: [contest.title, Validators.required],
      description: [contest.description, [Validators.required]],
      startDate: [startDate, [Validators.required]],
      endDate: [endDate, [Validators.required]],
    });
    this.updateContestDialog = true;
  }
  submitEdit() {
    if (this.updateContestForm.valid) {
      const contest = this.updateContestForm.value;
      const formData = new FormData();
      formData.append('sjson', JSON.stringify(contest));

      this.contestService.updateContest(formData).then(
        res => {
          const result: boolean = res['result'];
          const message: string = res['message'];
          if (result) {
            this.updateContestDialog = false; // Close dialog after successful submission
            this.ngOnInit();// Reload packages
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contest updated successfully' });
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: message || 'Failed to submit entry' });
          }
        },
        err => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update Contest' });
        }
      );
    }
  }
}
