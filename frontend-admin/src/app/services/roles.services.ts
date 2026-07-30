import { Injectable } from "@angular/core";
import { Account } from "../entities/account.entity";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";
import { Role } from "../entities/role.entity";

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    role: Role[];

    constructor(
        private baseUrlService : BaseUrlService,
        private  httpClient : HttpClient
    ) {
        
    }
    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'account/findAll'));
    }
}