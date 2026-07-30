import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Account } from './entities/account.entity';
import { AccountService } from './services/account.service';
import { AnnouncementService } from './services/announcement.service';
import { Announcement } from './entities/announcement.entity';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './layout.component.html',
  imports: [RouterLink, RouterOutlet, CommonModule]
})
export class layoutComponent implements OnInit {
  username: string | null;
  account: Account;
  announcements: Announcement[];
  showAnnouncements: boolean = false;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private announcementService: AnnouncementService
  ) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.accountService.findByUsername(this.username).then(
      res => {
        this.account = res as Account;
      },
      err => {
        console.log(err);
      }
    );
    this.loadAnnouncements();
  }
  loadAnnouncements() {
    this.announcementService.GetLatestAnnouncements().then(
      res => {
        this.announcements = res as Announcement[];
      },
      err => {
        console.log(err);
      }
    );
  }
  toggleAnnouncements() {
    this.showAnnouncements = !this.showAnnouncements;
  }
  logout() {
    sessionStorage.removeItem('username');
    localStorage.removeItem('accountt');
    this.router.navigate(['home']).then(() => {
      window.location.reload();
    });
  }

  isLoggedIn(): boolean {
    return this.username !== null;
  }
  NotLoggedIn(): boolean {
    return this.username == null;
  }
}