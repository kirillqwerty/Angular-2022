import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class UsersDataStreamService {

    // public players: string[][] = [];

    public players =
        [["Sherlock Holmes", "fqwefwqef"],
        ["Mrs. Stubbs", "refrqfrfqrfqe"],
        ["Jim Moriarty", "wfrqfqfrqfq"],
        ["Bom Bomson", "fqwefwqef"]];
    
    // public selectedPlayers: string[][] = [];

    public selectedPlayers = [["Sherlock Holmes", "fqwefwqef"],
    ["Mrs. Stubbs", "refrqfrfqrfqe"],
    ["Jim Moriarty", "wfrqfqfrqfq"],
    ["Bom Bomson", "fqwefwqef"]];
    
    public overscoredPlayers: string[] = [];

    public missed2xZonePlayers: string[] = [];

    public winner$ = new Subject<number>;

    public is501RulesToggled$ = new Subject<boolean>();

    public addPlayer(player: string[]): void {
        this.players.push(player);
    }

    public setWinner(playerNumber: number): void {
        this.winner$.next(playerNumber);
    }
}