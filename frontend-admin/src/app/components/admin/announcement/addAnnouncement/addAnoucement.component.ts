import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { NgFor } from '@angular/common';
import { json } from 'stream/consumers';
import { Announcement } from '../../../../entities/announcement.entity';
import { AnnouncementService } from '../../../../services/announcement.service';

@Component({
  standalone: true,
  templateUrl: './addAnnouncement.component.html',
  host: { 'collision-id': 'addAnnouncementComponent' },
  styleUrls: ['./addAnnouncement.component.css'],
  imports: [RouterOutlet, RouterLink, TableModule, ButtonModule, NgFor, ReactiveFormsModule]
})
export class addAnnouncementComponent implements OnInit {
  addAnouncementForm: FormGroup;
  file: File | null = null;
  username: string;
  userId: string;
  selectedFileName: string = 'No file chosen';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private announcementService: AnnouncementService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      this.userId = p.get('userId');

    })
    this.addAnouncementForm = this.formBuilder.group({
      content: '',
      createdAt: new Date().toISOString(),
    });
  }

  selectFile(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.selectedFileName = this.file.name;
    } else {
      this.selectedFileName = 'No file chosen';
    }
  }

  save() {
    let announcemets: Announcement = this.addAnouncementForm.value as Announcement;
    let str_json: string = JSON.stringify(announcemets);
    let formData = new FormData();
    formData.append('sjson', str_json);
    this.announcementService.create(formData).then(
      res => {
        let result: boolean = res['result'];
        if (result) {
          this.router.navigate(['/admin/announcement']);
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
