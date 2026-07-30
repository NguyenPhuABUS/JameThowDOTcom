import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    constructor(
        private baseUrlService : BaseUrlService,
        private  httpClient : HttpClient
    ) {
        
    }
    async findpackage() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'payment/findpackage'));
    }
   
    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'payment/findAll'));
    }
    async createPackage(formdata: FormData) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'payment/createPackage', formdata));
    }
    async updatePackage(formdata: FormData) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl   + 'payment/updatePackage', formdata));
    }
    async delete(packageId: number) {
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'payment/delete/' + packageId));
    }
}