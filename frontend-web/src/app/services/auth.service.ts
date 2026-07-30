import { Injectable } from '@angular/core';
import { BaseUrlService } from './base_url.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    //   async forgotPassword(email: string) {
    //     return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'account/forgot-password', { email }));
    //   }
    //   async resetPassword(token: string, newPassword: string) {
    //     return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'account/forgot-password', { token, newPassword }));
    //   }
    //   resetPassword(token: string, newPassword: string): Observable<any> {
    //     return this.httpClient.post(this.baseUrlService.BaseUrl + 'account/reset-password', { token, newPassword });
    //   }
    forgotPassword(email: string): Observable<any> {
        return this.httpClient.post(`${this.baseUrlService.BaseUrl}account/forgot-password`, { email });
    }

    resetPassword(token: string, newPassword: string): Observable<any> {
        return this.httpClient.post(`${this.baseUrlService.BaseUrl}account/reset-password`, { token, newPassword });
    }
}
