import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Contest } from '../../entities/contest.entity';
import { ContestService } from '../../services/contest.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule,FormsModule],
  templateUrl: './contest-list.component.html',
  host: { 'collision-id': 'ContestListComponent' }
})
export class ContestListComponent implements OnInit {
  contests: Contest[] = [];
  showEndedContests: string = 'all';

  constructor(
    private contestService: ContestService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadContests();
  }

  async loadContests() {
    try {
      if (this.showEndedContests === 'ended') {
        this.contests = await this.contestService.findEndedContests(10) as Contest[];
      } else {
        this.contests = await this.contestService.findAll(10) as Contest[];
      }
    } catch (err) {
      console.log(err);
    }
  }

  onSelectChange(event: any) {
    this.showEndedContests = event.target.value;
    this.loadContests();
  }
}
