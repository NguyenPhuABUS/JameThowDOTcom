import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  providers: [MessageService],
  imports: [FormsModule, RouterLink, ReactiveFormsModule, NgIf,ToastModule],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.token = this.route.snapshot.queryParams['token'];
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.newPassword;
      this.authService.resetPassword(this.token, newPassword).subscribe(
        (response: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
          this.router.navigate(['/login']);
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to reset password' });
        }
      );
    }
  }
}
