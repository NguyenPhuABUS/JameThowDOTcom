import { Injectable } from "@angular/core";
import { BaseUrlService } from "./base_url.service";
import { HttpClient, HttpParams } from "@angular/common/http";

import { lastValueFrom } from "rxjs";
import { Account } from "../entities/account.entity";
import { Content } from "../entities/content.entity";
import { PaginatedList } from "../entities/PaginatedList.entity";

@Injectable({
    providedIn: 'root'
})
export class ContentService {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    async findByCategoryIdfree(categoryId: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findByCategoryIdfree/' + categoryId));
    }
    async findAllfree() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findAllfree'));
    }
    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findAll'));
    }
    async findByKeywordFree(keyword: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findByKeywordFree/' + keyword));
    }
    async findLatetFree(n: number) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findLatetFree/' + n));
    }
    async findContentByRole(username: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findContentByRole/' + username));
    }
    async findAllNotFree(username: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findAllNotFree/' + username));
    }
    async findByIsFree(isFree: boolean) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + `content/findByIsFree/${isFree}`));
    }
    
    async findByCategoryIdNotFree(username: string, categoryId: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findByCategoryIdNotFree/' + username + '/' + categoryId));
    }
    async findByKeywordNotFree(username: string, keyword: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findByKeywordNotFree/' + username + '/' + keyword));
    }
    async findLatetNotFree(username: string, n: number) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findLatetNotFree/' + username + '/' + n));
    }
    async create(formData: FormData) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'content/create', formData));
    }
    async recipesDetails(contentId: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/recipesDetails/' + contentId));
    }
    async recipesUser(username: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/recipesUser/' + username));
    }
    async getContentsByUserId(userId: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/getContentsByUserId/' + userId));
    }
    async update(formData: FormData) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'content/update', formData));
    }
    // thu nghiem phan trang 
    async getPagedContents(username: string | null, categoryId: number | null, keyword: string, isFree: boolean | null, page: number, pageSize: number, startDate: Date | null, endDate: Date | null) {
        let params = new HttpParams()
            .set('username', username ?? '')
            .set('categoryId', categoryId !== null ? categoryId.toString() : '')
            .set('keyword', keyword)
            .set('isFree', isFree !== null ? isFree.toString() : '')
            .set('page', page.toString())
            .set('pageSize', pageSize.toString())
            .set('startDate', startDate ? startDate.toISOString() : '')
            .set('endDate', endDate ? endDate.toISOString() : '')
        return lastValueFrom(this.httpClient.get<PaginatedList<Content>>(this.baseUrlService.BaseUrl + 'content/paged', { params }));
    }
    async findByKeywordUsername(username: string, keyword: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findByKeywordUsername/' + username + '/' + keyword));
    }
    async delete(id: number) {
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'content/delete/' + id));
    }

    async findByDate(startDate: Date, endDate: Date, username: string | null = null) {
        let params = new HttpParams()
            .set('startDate', startDate.toISOString())
            .set('endDate', endDate.toISOString())
            .set('username', username ?? '');
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findByDate', { params }));
    }
    async findByContentType(contentType: string, username: string | null = null) {
        let params = new HttpParams()
            .set('contentType', contentType ?? '')
            .set('username', username ?? '');
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findByContentType', { params }));
    }
    async findContentRelated(id : string, username: string | null = null) {
        let params = new HttpParams()
            .set('contentId', id ?? '')
            .set('username', username ?? '');
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'content/findContentRelated', { params }));
    }
}