import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentService } from '../../services/content.service';
import { ContestService } from '../../services/contest.service';
import { Content } from '../../entities/content.entity';
import { Contest } from '../../entities/contest.entity';
import { AccountService } from '../../services/account.service';
import { Account } from '../../entities/account.entity';
import { ContestEntryService } from '../../services/contestEntry.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
@Component({
    standalone: true,
    templateUrl: './contest-details.component.html',
    imports: [RouterOutlet, RouterLink, ReactiveFormsModule, FormsModule, ToastModule,DialogModule],
    providers: [MessageService]
})
export class ContestDetailsComponent implements OnInit {
    contest: Contest | null = null;
    contents: Content[] = [];
    contestEntries: any[] = [];
    contestEntryForm: FormGroup;
    contestId: string | null = null;
    account: Account | null = null;
    displayDialog: boolean = false;
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private contentService: ContentService,
        private contestEntryService: ContestEntryService,
        private contestService: ContestService,
        private accountService: AccountService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.contestEntryForm = this.formBuilder.group({
            contentId: '',
            submissionDate: new Date().toISOString()
        });

        this.activatedRoute.paramMap.subscribe((params) => {
            this.contestId = params.get('contestId');
            if (this.contestId) {
                this.loadContestDetails(this.contestId);
                this.loadUserContents();
                this.loadContestEntries(this.contestId);
            }
        });

        const username = sessionStorage.getItem('username');
        if (username) {
            this.loadAccount(username);
        }
    }

    async loadAccount(username: string) {
        try {
            this.account = await this.accountService.findByUsername(username) as Account;
        } catch (err) {
            console.log(err);
        }
    }

    async loadContestDetails(contestId: string) {
        try {
            this.contest = await this.contestService.findbyId(contestId) as Contest;
        } catch (err) {
            console.log(err);
        }
    }

    async loadUserContents() {
        try {
            const username = sessionStorage.getItem('username');
            if (username) {
                this.contents = await this.contentService.recipesUser(username) as Content[];
            }
        } catch (err) {
            console.log(err);
        }
    }

    async loadContestEntries(contestId: string) {
        try {
            this.contestEntries = await this.contestEntryService.findBycontentId(contestId) as any[];
        } catch (err) {
            console.log(err);
        }
    }
    showDialog() {
        const username = sessionStorage.getItem('username');
        if (!username) {
            alert('You are not logged in');
            this.router.navigate(['/login']);
            return;
        }

        this.loadUserContents().then(() => {
            if (this.contents.length === 0) {
                alert('You have not created any content yet');
            } else {
                this.displayDialog = true;
            }
        }).catch(err => {
            console.log(err);
            alert('Failed to load user contents');
        });
    }
    async submit() {
        if (!this.contestId) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contest ID is missing' });
            return;
        }

        const entryData = {
            contestId: this.contestId,
            userId: this.account?.userId.toString(),
            contentId: this.contestEntryForm.value.contentId,
            submissionDate: this.contestEntryForm.value.submissionDate
        };
        
        const str_json = JSON.stringify(entryData);
        const formData = new FormData();
        formData.append('sjson', str_json);

        try {
            const res: any = await this.contestEntryService.create(formData);
            if (res.result) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Entry submitted successfully' });
                await this.loadContestEntries(this.contestId); // Reload contest entries
            } else {
                this.messageService.add({ severity: 'warn', summary: 'Warning', detail: res.message || 'Failed to submit entry' });
            }
        } catch (err) {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to submit entry' });
        }
    }
}
