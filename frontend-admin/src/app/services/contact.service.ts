import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";
import { Category } from "../entities/category.entity";
import { Contact } from "../entities/contact.entity";

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    contact: Contact[];
    constructor(
        private baseUrlService : BaseUrlService,
        private  httpClient : HttpClient
    ) {
        
    }
    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'admin/contact/findAll'));
    }
    async delete(contactId: number) {
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'admin/contact/delete/' + contactId));
    }
    async update(formdata: FormData) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl   + 'category/update', formdata));
    }
    async create(category: Category) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'category/create', category));
    }
}