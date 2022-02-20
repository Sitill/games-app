import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "./services/user.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const loggedIn = this.userService.userIsLoggedIn();
    if (!loggedIn){
      this.router.navigateByUrl('/account');
    }
    return true;
  }

}
