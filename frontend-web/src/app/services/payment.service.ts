import { Injectable } from "@angular/core";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrderService  {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    async updateSubscriptionAndSavePayment(formData: FormData) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'payment/UpdateSubscriptionAndSavePayment', formData));
    }
    async findByUsername(username: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'payment/findByUsername/'+ username));
    }
}
