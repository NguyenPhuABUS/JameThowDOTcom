import { Injectable } from "@angular/core";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Package } from "../entities/package.entity";

@Injectable({
    providedIn: 'root'
})
export class PackageService  {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    async findAll(): Promise<Package[]> {
        return lastValueFrom(this.httpClient.get<Package[]>(this.baseUrlService.BaseUrl + 'package/findAll'));
    }
}
