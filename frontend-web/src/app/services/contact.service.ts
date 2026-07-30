import { Injectable } from "@angular/core";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";

import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    async create(formData: FormData) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'contact/create', formData));
    }
}