import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
@Component({
  standalone: true,
  templateUrl: './forgot-password.component.html',
  providers: [MessageService],
  imports: [FormsModule, RouterLink, ReactiveFormsModule, NgIf,ToastModule],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe(
        (response: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to send reset password email' });
        }
      );
    }
  }
}
