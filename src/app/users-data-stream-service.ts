import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class UsersDataStreamService {

    public players: string[][] = [];

    public winner$ = new Subject<number>;

    public is501RulesToggled$ = new Subject<boolean>();

    public addPlayer(player: string[]): void {
        this.players.push(player);
    }

    public setWinner(playerNumber: number): void {
        this.winner$.next(playerNumber);
    }
}