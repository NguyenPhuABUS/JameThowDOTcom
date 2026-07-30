import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account } from '../../entities/account.entity';
import { Role } from '../../entities/role.entity';

@Component({
  standalone: true,
  templateUrl: './register.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'RegisterComponent' }
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}')
      ]],
      status: true
    });
  }

  save() {
    if (this.registerForm.valid) {
      let account: Account = this.registerForm.value as Account;
      this.accountService.create(account).then(
        res => {
          console.log(res);
          let result: boolean = res['result'];
          if (result) {
            this.router.navigate(['login']);
          } else {
            alert('Failed Tren');
          }
        },
        err => {
          alert('Failed Duoi');
          console.log(err);
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get fullName() {
    return this.registerForm.get('fullName');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
