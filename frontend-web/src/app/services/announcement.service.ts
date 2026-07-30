import { Injectable } from "@angular/core";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";

import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AnnouncementService  {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    async GetLatestAnnouncements() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'admin/announcement/GetLatestAnnouncements'));
    }
}