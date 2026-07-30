import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BaseUrlService {

    public BaseUrl: string = 'http://localhost:5077/api/';

}