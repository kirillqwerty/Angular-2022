import { Injectable } from "@angular/core";
import { CanActivate, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UsersDataStreamService } from "./users-data-stream-service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class CanActivateGameGuard implements CanActivate {
    public service: UsersDataStreamService;
    public router: Router;
    constructor(service: UsersDataStreamService, router: Router){
        this.service = service;
        this.router = router;
    }
    public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.service.players.length === 0) {
            this.router.navigate([""]);
            return false;    
        } else return true;
    }
  
}
