import { Injectable } from "@angular/core";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RatingService  {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    async create(formData: FormData) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'rating/create', formData));
    }
    async getRatingsByContentId(contentId: string, n: number) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'rating/content/'+ contentId + '/' + n));
    }
    async getAverageRatingByContentId(contentId: string) {
        return lastValueFrom(this.httpClient.get<{ average: number }>(this.baseUrlService.BaseUrl + 'rating/average/' + contentId));
    }
    async getAverageRatingByUsername(username: string) {
        return lastValueFrom(this.httpClient.get<{ average: number }>(this.baseUrlService.BaseUrl + 'rating/getAverageRatingByUsername/' + username));
    }
}
