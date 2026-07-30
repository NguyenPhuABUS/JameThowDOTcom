import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";
import { Announcement } from "../entities/announcement.entity";

@Injectable({
    providedIn: 'root'
})
export class AnnouncementService {

    announcements: Announcement[];

    constructor(
        private baseUrlService : BaseUrlService,
        private  httpClient : HttpClient
    ) {
        
    }
    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'admin/announcement/findAll'));
    }
    
    async create(formdata: FormData) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'admin/announcement/create', formdata));
    }
    async delete(contentId: number) {
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'admin/announcement/delete/' + contentId));
    }
    async update(formdata: FormData) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl   + 'admin/announcement/update', formdata));
    }
    async findByDate(date : string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl   + 'admin/announcement/findByDate/' + date));
    }
        
}