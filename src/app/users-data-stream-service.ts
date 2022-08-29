import { Injectable } from "@angular/core";
import { Player } from "./facades/player";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UsersDataStreamService {

    public players: string[][] = [];

    // public players$ = new Subject<string[]>;

    public winner$ = new Subject<number>;

    public is501RulesToggled$ = new Subject<boolean>();
    // public game301Rules$ = new Subject<GameRules>();

    // public addPlayers$ = new Subject<string[][]>;

    public addPlayer(player: string[]){
        this.players.push(player);
        // this.addPlayers$.next(this.players);
    }

    // public setPlayersList(players: string[]) {
    //     this.players$.next(players);
    // }

    public setWinner(playerNumber: number) {
        this.winner$.next(playerNumber);
    }

    

    // public setGameRules501(rules: GameRules) {
    //     this.game501Rules$.next(rules);
    // }

    // public setGameRules301(rules: GameRules) {
    //     this.game301Rules$.next(rules);
    // }
}