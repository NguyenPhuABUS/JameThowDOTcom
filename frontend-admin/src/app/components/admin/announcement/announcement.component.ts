import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../entities/account.entity';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Contest } from '../../../entities/contest.entity';
import { NgFor } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ContentService } from '../../../services/content.service';
import { AnnouncementService } from '../../../services/announcement.service';
import { Announcement } from '../../../entities/announcement.entity';
import { CalendarModule } from 'primeng/calendar';
@Component({
  standalone: true,
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css'],
  host: { 'collision-id': 'AnnouncementComponent' },
  imports : [RouterOutlet, RouterLink,TableModule,ButtonModule,NgFor,DialogModule,ReactiveFormsModule,FormsModule,CalendarModule]
})
export class AnnouncementComponent implements OnInit {
  accountInfoForm : FormGroup
  announcements : Announcement[];
  announcement: any;
  winnerUserId: string;
  updateForm : FormGroup;
  visible: boolean = false;
  selectedDate: Date;
  searchForm : FormGroup
  constructor(
    private contentService : ContentService,
    private accountService : AccountService,
    private annoucementService : AnnouncementService,
    private formBuilder : FormBuilder,
    private route : ActivatedRoute
  ){

  }
  ngOnInit(){
   
    this.annoucementService.findAll().then(
      res => {
        this.announcements = res as Announcement[];
      },
      err =>{
        console.log(err);
      }
    )

  }
  confirmDelete(announcementId: number) {
    if (confirm("Are you sure you want to delete this content?")) {  
       this.annoucementService.delete(announcementId).then(
          res =>{
            let result : boolean = res["result"];
            if(result){
              this.ngOnInit();

            }else{
              alert("False")
            }
          },
          err =>{
            console.log(err)
          }
       )
    }
}
  reloadPage() {
    location.reload();
  }
  showDialog(announcement: any) {
    this.updateForm = this.formBuilder.group({
    announcementId : announcement.announcementId,
     content : announcement.content,
     createAt : new Date().toISOString(),
    });
    this.visible = true;
  }
  save() {
    const announcement: Announcement = this.updateForm.value as Announcement;
    const formData = new FormData();
    formData.append('sjson', JSON.stringify(announcement));
    this.annoucementService.update(formData).then(
      res => {
        let result: boolean = res['result'];
        if (result) {
        this.reloadPage();
        } else {
          alert('Failed');
        }
      },
      err => {

        console.log(err);
      }
    );
  }
  onDateChange(evt: any) {
    if (!evt || !evt.target || !evt.target.value) {
      console.log('Invalid event or value');
      return;
    }
    
    let date = evt.target.value;
    console.log('Selected date:', date);
    this.annoucementService.findByDate(date).then(
      (res: Announcement[]) => {
        this.announcements = res;
      },
      (err: any) => {
        console.error('Error fetching announcements:', err);
      }
    );
  }
  
}
