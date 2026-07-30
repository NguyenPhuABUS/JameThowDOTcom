import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Account } from "../entities/account.entity";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private router: Router
    ){}
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        if(localStorage.getItem('accountt') == null){
            this.router.navigate(['login']);
            return false;
        }else{
            let roles = next.data['roles'];
            let account: Account = JSON.parse(localStorage.getItem('accountt'));
            let rolesOfLink = roles.split(',');
            let isAccess: boolean = account.roles.some(r => rolesOfLink.includes(r));
            if(isAccess){
                return true;
            }else{
                this.router.navigate(['login'])
                return false;
            }
            return true;
        }
        
    }

}
export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean => {
    return inject(AuthService).canActivate(next, state);
}