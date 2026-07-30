import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../entities/account.entity';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Contest } from '../../../entities/contest.entity';
import { ContestService } from '../../../services/contest.service';
import { NgFor } from '@angular/common';
import { contestEntriesService } from '../../../services/contestentries.service';
import { ContestEntries } from '../../../entities/contestentries.entity';
@Component({
  standalone: true,
  templateUrl: './contestEntries.component.html',
  host: { 'collision-id': 'contestEntriesComponent' },
  imports : [RouterOutlet, RouterLink,TableModule,ButtonModule,NgFor]
})
export class contestEntriesComponent implements OnInit {
  accountInfoForm : FormGroup
  contestEntries : ContestEntries[];
  account : Account;
  winnerUserId: string;
  constructor(
   private contestEntriesService : contestEntriesService
  ){

  }
  ngOnInit(){
    this.contestEntriesService.findAll().then(
      res => {
        this.contestEntries = res as ContestEntries[];
      },
      err =>{
        console.log(err);
      }
    )
  }
}
