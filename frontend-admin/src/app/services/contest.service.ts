import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";
import { Contest } from "../entities/contest.entity";

@Injectable({
    providedIn: 'root'
})
export class ContestService {

    contests: Contest[];

    constructor(
        private baseUrlService : BaseUrlService,
        private  httpClient : HttpClient
    ) {
        
    }
    async findById(userId: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'contest/findbyId/' + userId));
    }
   
    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'contest/findAll'));
    }
    async create(formdata: FormData) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'contest/create', formdata));
    }
    async updateContest(formdata: FormData) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl   + 'contest/updateContest', formdata));
    }
    async delete(packageId: number) {
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'contest/delete/' + packageId));
    }
}