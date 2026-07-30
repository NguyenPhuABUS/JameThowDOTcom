import { Injectable } from "@angular/core";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FeedbackService  {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    async create(formData: FormData) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'feedback/create', formData));
    }
    async findlatetFeedback(contentId: string,n: number) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'feedback/findlatetFeedback/'+ contentId + '/' + n));
    }
}
