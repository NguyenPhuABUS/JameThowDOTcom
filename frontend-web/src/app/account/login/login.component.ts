import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account } from '../../entities/account.entity';

@Component({
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'LoginComponent' }
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  msg: string;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.msg = '';
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.msg = 'Please correct the errors and try again.';
      return;
    }
    let account: Account = this.loginForm.value as Account;
    this.accountService.login(account).then(
      res => {
        let result: boolean = res['result'];
        if (result) {
          sessionStorage.setItem('username', account.username);
          this.router.navigate(['home']).then(() => {
            window.location.reload();
          });
        } else {
          this.msg = 'Login failed. Please check your username and password.';
        }
      },
      err => {
        this.msg = 'An error occurred during login. Please try again later.';
        console.log(err);
      }
    );
  }

  clear() {
    this.msg = '';
  }

}
