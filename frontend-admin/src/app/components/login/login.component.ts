import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account } from '../../entities/account.entity';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgIf } from '@angular/common';
@Component({
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, RouterLink, ReactiveFormsModule,ToastModule,NgIf],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  msg: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.msg = '';
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Please fill in all fields correctly'});
      return;
    }

    let account: Account = this.loginForm.value as Account;
    try {
      const res = await this.accountService.loginadmin(account);
      const result: boolean = res['result'];
      if (result) {
        sessionStorage.setItem('username', account.username);
        const accountData = await this.accountService.findUsername(account.username);
        const s = JSON.stringify(accountData);
        localStorage.setItem('accountt', s);
        await this.router.navigate(['admin']);
        window.location.reload();
      } else {
        this.msg = res['message'] || 'Failed';
        this.messageService.add({severity: 'error', summary: 'Error', detail: this.msg});
      }
    } catch (err) {
      if (err.status === 401) {
        this.msg = 'Invalid username or password';
      } else {
        this.msg = 'Failed';
      }
      this.messageService.add({severity: 'error', summary: 'Error', detail: this.msg});
      console.log(err);
    }
  }

  clear() {
    this.msg = '';
  }
}
