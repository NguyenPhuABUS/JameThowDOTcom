import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../entities/account.entity';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Role } from '../../../entities/role.entity';
import { subscribe } from 'diagnostics_channel';
import { Content } from '../../../entities/content.entity';
import { contestEntriesService } from '../../../services/contestentries.service';
import { ContestEntries } from '../../../entities/contestentries.entity';
@Component({
  standalone: true,
  templateUrl: './profile.component.html',
  host: { 'collision-id': 'ProfileComponent' },
  styleUrls: ['./profile.component.css'],
  imports : [RouterOutlet, RouterLink,TableModule,ButtonModule,CheckboxModule,FormsModule,ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userId : string
  acount : Account;
  contents : Content[];
  contestEntries : ContestEntries
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private route : ActivatedRoute,
    private contestentriesService : contestEntriesService
  ) { }

  ngOnInit() {
   this.route.paramMap.subscribe(p => {
    let userId = p.get("userId");
    let contestId =  p.get("contestId");
    console.log(userId)
    this.accountService.findById(userId).then(
      res => {
        let account: Account = res as Account;
        this.profileForm = this.formBuilder.group({
          username: account.username,
          password: [account.password, [Validators.required]],
          email: [account.email, [Validators.required, Validators.email]],
          fullname: [account.fullname, [Validators.required]],
          avatarUrl: [account.avatarUrl, [Validators.required]],
          status: [account.status ? 'IsActive' : 'Inactive'],
          roles: [{ value: account.roles, disabled: true }],
          contestEntries: [{ value: account.contestEntries}],
        })
      },
      err => {
        alert('Failed');
        console.log(err);
      }
    );
    this.contestentriesService.findById(userId,contestId).then(
      res =>{
        this.contestEntries = res as ContestEntries;
        console.log(res);
      },
      err =>{
        console.log(err)
      }
    )
   })
  }

  
}
