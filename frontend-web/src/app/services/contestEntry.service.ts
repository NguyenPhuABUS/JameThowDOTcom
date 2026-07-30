import { Injectable } from "@angular/core";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";

import { lastValueFrom } from "rxjs";
import { Account } from "../entities/account.entity";
import { Content } from "../entities/content.entity";

@Injectable({
    providedIn: 'root'
})
export class ContestEntryService {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    async findBycontestId(contestId: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'contestEntry/findBycontestId/' + contestId));
    }
    async findBycontentId(contestId: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'contestEntry/findBycontentId/' + contestId));
    }
    async create(formData: FormData) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'contestEntry/create', formData));
    }
}