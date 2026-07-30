import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";
import { Feedback } from "../entities/feedback.entity";

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {

    feedback: Feedback[];

    constructor(
        private baseUrlService : BaseUrlService,
        private  httpClient : HttpClient
    ) {
        
    }
    async findById(contentId: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'feedback/findById/' + contentId));
    }
    
}