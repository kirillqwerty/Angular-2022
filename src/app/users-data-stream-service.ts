import { Injectable } from "@angular/core";
import { Player } from "./facades/player";
import { Subject } from "rxjs";
import { GameRules } from "./facades/rules";

@Injectable({
    providedIn: 'root',
})
export class UsersDataStreamService {

    public players$ = new Subject<string[]>;

    public game501Rules$ = new Subject<GameRules>();
    public game301Rules$ = new Subject<GameRules>();

    public changePlayersList(players: string[]) {
        this.players$.next(players);
    }

    // public setGameRules501(rules: GameRules) {
    //     this.game501Rules$.next(rules);
    // }

    // public setGameRules301(rules: GameRules) {
    //     this.game301Rules$.next(rules);
    // }
}