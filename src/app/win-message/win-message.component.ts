import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { GameService } from '../game-service';
import { UsersDataStreamService } from '../users-data-stream-service';

@Component({
    selector: 'app-win-message',
    templateUrl: './win-message.component.html',
    styleUrls: ['./win-message.component.css']
})
export class WinMessageComponent{

    @Input() winner: string = ''; 

    constructor(private usersDataStreamService: UsersDataStreamService,
        private gameService: GameService) { }

    refresh(): void {
        this.usersDataStreamService.players = [];
        this.gameService.logScores = [];
    }
}
