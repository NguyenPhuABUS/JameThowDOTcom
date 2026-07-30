import { Injectable } from "@angular/core";
import { Account } from "../entities/account.entity";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";
import { ContestEntries } from "../entities/contestentries.entity";

@Injectable({
    providedIn: 'root'
})
export class contestEntriesService {

    contestEntries: ContestEntries[];

    constructor(
        private baseUrlService : BaseUrlService,
        private  httpClient : HttpClient
    ) {
        
    }
    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'contestEntry/findAll'));
    }
    
    async findById(userId: string, contestId : string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'contestEntry/findbyid/' + userId + '/' + contestId));
    }
    async findBycontentId(contestId: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'contestEntry/findBycontentId/' + contestId));
    }
}