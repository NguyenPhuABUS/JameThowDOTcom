import { Injectable } from "@angular/core";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";

import { lastValueFrom } from "rxjs";
import { Account } from "../entities/account.entity";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'category/findAll'));
    }
}