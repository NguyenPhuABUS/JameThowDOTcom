import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";
import { Content } from "../entities/content.entity";

@Injectable({
    providedIn: 'root'
})
export class ContentService {

    contents: Content[];

    constructor(
        private baseUrlService : BaseUrlService,
        private  httpClient : HttpClient
    ) {
        
    }
    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findAll'));
    }
    
    async findByUsername(username : string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findByUsername/' + username));
    }
    async create(formdata: FormData) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'content/create', formdata));
    }
    async delete(contentId: number) {
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'content/delete/' + contentId));
    }
    async update(formdata: FormData) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl   + 'content/update', formdata));
    }
    async findByKeyword(keyword: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findByKeyword/' + keyword));
    }
    async recipesDetails(contentId: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/recipesDetails/' + contentId));
    }
    async findByCategory(categoryName: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findByCategory/' + categoryName));
    }
}