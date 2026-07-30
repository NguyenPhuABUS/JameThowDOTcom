import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account } from '../../entities/account.entity';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  templateUrl: './admin.component.html',
  host: { 'collision-id': 'AdminComponent' },
  imports : [RouterOutlet, RouterLink]
})
export class AdminComponent implements OnInit {
  account : Account;
  username: string;
  constructor(
    private router: Router,
    private accountService : AccountService
  ) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.accountService.findByUsername(this.username).then(
      res =>{
        this.account = res as Account;
      },
      err =>{
        console.log(err);
      }
    )
  }

  logout() {
    sessionStorage.removeItem('username');
    localStorage.removeItem('accountt');
    this.router.navigate(['']);
  }

  profile() {
    this.router.navigate(['profile']);
  }

}
