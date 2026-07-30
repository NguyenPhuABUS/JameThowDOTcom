import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { Content } from '../../entities/content.entity';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { Account } from '../../entities/account.entity';
import { Feedback } from '../../entities/feedback.entity';
import { Rating } from '../../entities/rating.entity';
import { AccountService } from '../../services/account.service';
import { FeedbackService } from '../../services/feedback.service';
import { RatingService } from '../../services/rating.service';
import { PipesModule } from '../../pipes.module';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule, FormsModule, RatingModule, CommonModule,PipesModule ],
  templateUrl: './details.component.html',
  host: { 'collision-id': 'RecipesDetailsComponent' }
})
export class RecipesDetailsComponent implements OnInit {
  content: Content;
  contents: Content[];
  account: Account;
  feedbackForm: FormGroup;
  feedbacks: Feedback[];
  ratings: Rating[];
  contentId: string | null = null;
  rating: number = 0;
  averageRating: number = 0;
  ratingfeedback: number = 0;
  constructor(
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private ratingService: RatingService
  ) {}

  async ngOnInit(): Promise<void> {
    this.feedbackForm = this.formBuilder.group({
      contentId: '',
      userId: '',
      content: '',
      rating: [0],
      createdAt: new Date().toISOString(),
    });

    this.activatedRoute.paramMap.subscribe(async (params) => {
      this.contentId = params.get('contentId');
      if (this.contentId) {
        await this.loadContentData(this.contentId);
        await this.loadFeedbacks(this.contentId);
        await this.loadContentRelated(this.contentId);
      }
    });

    // Lay userid tu username
    try {
      this.account = await this.accountService.findByUsername(sessionStorage.getItem('username')) as Account;
      this.feedbackForm.patchValue({ userId: this.account.userId });
    } catch (err) {
      console.log(err);
    }
  }

  async loadContentData(contentId: string) {
    try {
      this.content = await this.contentService.recipesDetails(contentId) as Content;
      const ratingResponse = await this.ratingService.getAverageRatingByContentId(contentId);
      this.averageRating = ratingResponse.average;  // Set default value if undefined
    } catch (err) {
      console.log(err);
    }
  }
  async loadContentRelated(contentId: string) {
    try {
      this.contents = await this.contentService.findContentRelated(contentId,sessionStorage.getItem('username')) as Content[];
    } catch (err) {
      console.log(err);
    }
  }
  async loadFeedbacks(contentId: string) {
    try {
      this.feedbacks = await this.feedbackService.findlatetFeedback(contentId, 3) as Feedback[];
    } catch (err) {
      console.log(err);
    }
  }

  async submit() {
    if (sessionStorage.getItem('username') == null) {
      alert('You are not logged in');
      this.router.navigate(['login']).then(() => {
        window.location.reload();
      });
    } else {
      if (!this.contentId) {
        alert('contentId is missing');
        return;
      }
      let feedback: Feedback = this.feedbackForm.value as Feedback;
      feedback.contentId = this.contentId;
      feedback.rating = this.rating;
      let str_json: string = JSON.stringify(feedback);
      let formData = new FormData();
      formData.append('sjson', str_json);

      try {
        const res = await this.feedbackService.create(formData);
        if (!res['Result']) {
          // Create rating
          const ratingData: Rating = {
            ratingId: 0,
            rating1: this.rating,  // Ép kiểu rating1 thành string
            createdAt: new Date().toISOString(),
            userId: this.account.userId,
            contentId: parseInt(this.contentId)
          };
          console.log(ratingData);
          const ratingFormData = new FormData();
          ratingFormData.append('sjson', JSON.stringify(ratingData));
          await this.ratingService.create(ratingFormData);

          alert('Success');
          await this.loadFeedbacks(this.contentId); // Load lại feedbacks ngay sau khi tạo mới
          await this.loadContentData(this.contentId); // Load lại content để cập nhật rating
        } else {
          alert('Failed');
        }
      } catch (err) {
        alert('Failed');
        console.log(err);
      }
    }
  }

  onRate(event: any) {
    this.rating = event.value;
  }
}
