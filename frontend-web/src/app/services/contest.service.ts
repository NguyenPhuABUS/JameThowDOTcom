import { Injectable } from "@angular/core";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";

import { lastValueFrom } from "rxjs";
import { Account } from "../entities/account.entity";
import { Content } from "../entities/content.entity";

@Injectable({
    providedIn: 'root'
})
export class ContestService {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    async findAll(n: number) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'contest/findAll/' + n));
    }
    async findbyId(contestId: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'contest/findbyId/' + contestId));
    }
    async findEndedContests(n: number) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'contest/findEndedContests/' + n));
    }
}