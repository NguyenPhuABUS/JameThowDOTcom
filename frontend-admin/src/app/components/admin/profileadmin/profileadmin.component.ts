import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../entities/account.entity';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
@Component({
  standalone: true,
  templateUrl: './profileadmin.component.html',
  host: { 'collision-id': 'ProfileAdminComponent' },
  styleUrls: ['./profileadmin.component.css'],
  imports : [RouterOutlet, RouterLink,TableModule,ButtonModule,CheckboxModule,FormsModule,ReactiveFormsModule,DialogModule]
})
export class ProfileAdminComponent implements OnInit {
  EditProfileAdminForm: FormGroup;
  file: File;
  avatarUrl: string;
  account: Account;
  displayChangePasswordDialog: boolean = false;
  changePasswordForm: FormGroup
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      let userId = p.get('userId');
      this.accountService.findById(userId).then(
        res => {
          let account = res as Account;
          this.avatarUrl = account.avatarUrl;
          this.EditProfileAdminForm = this.formBuilder.group({
            userId: [account.userId],
            username: [account.username, [Validators.required, Validators.minLength(3)]],
            fullName: [account.fullname, [Validators.required]],
            email: [account.email, [Validators.required, Validators.email]],
            password: account.password,
            status: account.status = true
          });
        },
        err => {
          console.log(err);
        }
      );
    });
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
  selectFile(evt: any) {
    this.file = evt.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result;
        const previewImage = document.getElementById('preview') as HTMLImageElement;
        if (previewImage) {
          previewImage.style.display = 'block';
        }
      };
      reader.readAsDataURL(this.file);
    }
  }
  showChangePasswordDialog(){
    this.displayChangePasswordDialog = true;
  }
  save() {
    if (this.EditProfileAdminForm.invalid) {
      return;
    }
    let account: Account = this.EditProfileAdminForm.value as Account;
    let str_json: string = JSON.stringify(account);
    let formData = new FormData();
    if (this.file != null) {
      formData.append('file', this.file);
    }
    formData.append('sjson', str_json);
    this.accountService.update(formData).then(
      res => {
        let result: boolean = res['result'];
        if (result) {
          alert('Success');
          sessionStorage.removeItem('username');
          localStorage.removeItem('accountt');
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
  }
  saveChangePassword() {
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
                    localStorage.removeItem('accountt');
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
