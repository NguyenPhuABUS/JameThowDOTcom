import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FloatLabelModule } from "primeng/floatlabel"
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../entities/account.entity';

@Component({
    standalone: true,
    imports: [RouterOutlet, RouterLink, FloatLabelModule, FormsModule, ReactiveFormsModule],
    templateUrl: './changePassword.component.html',
    host: { 'collision-id': 'ChangePasswordComponent' }
})
export class ChangePasswordComponent implements OnInit {

    changePasswordForm: FormGroup;

    constructor(
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(p => {
            let userId = p.get('userId');
            this.accountService.findById(userId).then(
                res => {
                    let account = res as Account;
                    this.changePasswordForm = this.formBuilder.group({
                        userId: [account.userId],
                        currentPassword: ['', [Validators.required, Validators.minLength(8)]],
                        newPassword: ['', [
                            Validators.required,
                            Validators.minLength(8),
                            Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}')
                        ]]
                    });
                },
                err => {
                    console.log(err);
                }
            );
        });
    }

    save() {
        if (this.changePasswordForm.invalid) {
            return;
        }
        this.activatedRoute.paramMap.subscribe(p => {
            let userId = p.get('userId');
            let currentPassword: string = this.changePasswordForm.value.currentPassword;
            let newPassword: string = this.changePasswordForm.value.newPassword;
            let formData = new FormData();
            formData.append('userId', userId);
            formData.append('currentPassword', currentPassword);
            formData.append('newPassword', newPassword);
            this.accountService.changePassword(formData).then(
                res => {
                    let result: boolean = res['result'];
                    if (result) {
                        alert('Success');
                        sessionStorage.removeItem('username');
                        this.router.navigate(['login']).then(() => {
                            window.location.reload();
                        });
                    } else {
                        alert('Failed');
                    }
                },
                err => {
                    alert('Failed');
                    console.log(err);
                }
            );
        });
    }
}
