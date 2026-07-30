import { Injectable } from "@angular/core";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";

import { lastValueFrom } from "rxjs";
import { Account } from "../entities/account.entity";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    async create(account: Account) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'account/create', account));
    }
    async login(account: Account) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'account/login', account));
    }
    async update(formData: FormData) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'account/update', formData));
    }
    async changePassword(formData: FormData) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'account/changePassword', formData));
    }
    async findById(id: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/find/' + id));
    }
    async findByUsername(username: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findByUsername/' + username));
    }
}