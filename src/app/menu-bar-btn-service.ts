import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MenuBarBtnService{
    public stepBackIsToggled$ = new Subject<boolean>();
    public resetIsToggled$ = new Subject<boolean>();

    public stepBackIsToggled(isToggled: boolean){
        this.stepBackIsToggled$.next(isToggled);
    }

    public resetIsToggled(isToggled: boolean){
        this.resetIsToggled$.next(isToggled);
    }
}