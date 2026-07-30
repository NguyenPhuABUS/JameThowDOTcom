import { Injectable } from "@angular/core";
import { Account } from "../entities/account.entity";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    accounts: Account[];

    constructor(
        private baseUrlService : BaseUrlService,
        private  httpClient : HttpClient
    ) {
        
    }

    async login(account: Account) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'account/login', account));
    }
    async loginadmin(account: Account) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'account/loginadmin', account));
    }
    async findUsername(username: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findUsername/' + username));
    }
    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findAll'));
    }
    async update(formData: FormData) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'account/update', formData));
    }
    async create(account: Account) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'account/create', account));
    }
    async findByUsername(username: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findByUsername/' + username));
    }
    async findById(userId: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/find/' + userId));
    }
    async updateUsernameStatus(username: string, newStatus: boolean) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'account/update/'+ username,newStatus));
    }
    async findByKeyword(keyword: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findByKeyword/' + keyword));
    }
    async findByroleId(roleId: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findByroleId/' + roleId));
    }
    async findrole() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findrole'));
    }
    async changePassword(formData: FormData) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'account/changePassword', formData));
    }
}