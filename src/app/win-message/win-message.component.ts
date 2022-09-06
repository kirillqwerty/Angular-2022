import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { GameService } from "../game-service";
import { UsersDataStreamService } from "../users-data-stream-service";

@Component({
    selector: "app-win-message",
    templateUrl: "./win-message.component.html",
    styleUrls: ["./win-message.component.css"]
})
export class WinMessageComponent{

    @Input() public winner = ""; 

    constructor(private usersDataStreamService: UsersDataStreamService,
        private gameService: GameService) { }

    public refresh(): void {
        this.usersDataStreamService.selectedPlayers = [];
        this.gameService.logScores = [];
    }
}
