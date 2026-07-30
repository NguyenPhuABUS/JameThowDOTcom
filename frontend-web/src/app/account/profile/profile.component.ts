import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FloatLabelModule } from "primeng/floatlabel"
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../entities/account.entity';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, FloatLabelModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  host: { 'collision-id': 'ProfileComponent' }
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  file: File;
  avatarUrl: string;
  account: Account;

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
          this.avatarUrl = account.avatarUrl;
          this.profileForm = this.formBuilder.group({
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

  save() {
    if (this.profileForm.invalid) {
      return;
    }
    let account: Account = this.profileForm.value as Account;
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
}
