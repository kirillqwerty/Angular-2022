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

    constructor(private usersDataStreamService: UsersDataStreamService,
        private gameService: GameService) { }

    @Input() winner: string = ''; 

    refresh(){
        this.usersDataStreamService.players = [];
        this.gameService.logScores = [];
    }
}
