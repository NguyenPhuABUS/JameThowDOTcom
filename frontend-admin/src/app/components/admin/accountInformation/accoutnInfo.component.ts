import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../entities/account.entity';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Role } from '../../../entities/role.entity';

@Component({
  standalone: true,
  templateUrl: './accountInfo.component.html',
  host: { 'collision-id': 'AdminComponent' },
  styleUrls: ['./accountInfo.component.css'],
  imports: [RouterOutlet, RouterLink, TableModule, ButtonModule, CheckboxModule, FormsModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService]
})
export class accountInfoComponent implements OnInit, AfterViewInit {
  accountInfoForm: FormGroup;
  accounts: Account[];
  account: Account;
  status: boolean;
  username: string;
  roles: Role[];
  selectedRoleId: string;
  @ViewChild('dt2') dt2: Table;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngAfterViewInit(): void { }

  ngOnInit() {
    this.loadRoles();

    this.accountService.findAll().then(
      res => {
        this.accounts = res as Account[];
      },
      err => {
        console.log(err);
      }
    );
    this.accountService.findrole().then(
      res => {
        this.roles = res as Role[];
      },
      err => {
        console.log(err);
      }
    );
  }

  onStatusChange(username: string, status: boolean) {
    this.accountService.updateUsernameStatus(username, status).then(
      res => {
        if (res) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update Success' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed' });
        }
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed' });
        console.log(err);
      }
    );
  }

  search(evt: any) {
    let keyword = evt.target.value;
    if (keyword == '') {
      this.accountService.findAll().then(
        res => {
          this.accounts = res as Account[];
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.accountService.findByKeyword(keyword).then(
        res => {
          this.accounts = res as Account[];
          console.log('Search results:', this.accounts);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  searchRole(evt: any) {
    this.route.paramMap.subscribe(p => {
      let roleId = p.get('roleId');
      if (roleId) {
        this.accountService.findByroleId(roleId).then(
          res => {
            this.accounts = res as Account[];
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      } else {
        console.log('roleId is not defined in route parameters');
      }
    });
  }

  loadRoles(): void {
    this.accountService.findrole().then(
      res => {
        this.roles = res as Role[];
      },
      err => {
        console.log(err);
      }
    );
  }

  onRoleChange(): void {
    if (this.selectedRoleId) {
      this.accountService.findByroleId(this.selectedRoleId).then(
        res => {
          this.accounts = res as Account[];
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  onGlobalFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt2.filterGlobal(inputElement.value, 'contains');
  }
}
