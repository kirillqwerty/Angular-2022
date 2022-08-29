import { Component, OnInit } from '@angular/core';
import { UsersDataStreamService } from '../users-data-stream-service';
import { GameRules } from '../facades/rules';
import { GameService } from '../game-service';
import { HtmlParser } from '@angular/compiler';
@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.css']
})
export class GameSettingsComponent implements OnInit{

    constructor(public readonly usersDataStreamService: UsersDataStreamService, 
    private readonly gameService: GameService) { }

    ngOnInit(): void {
        let input = document.querySelector('input');
        input?.addEventListener('keyup', this.search);
    }
    public is301Toggled: boolean = false;
    public is501Toggled: boolean = false;   
    public isSelected: boolean = false;
    public searchCriteria: string = '';
    public searchResult: string[] = [];

    getPlayers() {
        console.log(this.usersDataStreamService.players);
        return this.usersDataStreamService.players.length;
    }


    deletePlayer(index: number){ 
        this.usersDataStreamService.players.splice(index, 1);
        console.log() 
    }

    toggle301(){

        this.is301Toggled = true;
        this.is501Toggled = false;
        this.isSelected = true; 
    // this.usersDataStreamService.setGameRules301(rules);
        this.gameService.is301Toggled = true;
    }

    toggle501(){

        this.is301Toggled = false;
        this.is501Toggled = true;
        this.isSelected = true;
    // this.usersDataStreamService.setGameRules501(rules);
        this.gameService.is301Toggled = false;
    }

    setPlayers() : void{
    // this.usersDataStreamService.setPlayersList(this.players);
    }

    search() {
        this.searchCriteria = JSON.stringify((<HTMLInputElement>document.getElementById('search')).value);     
        let cloneArr = new Array(...this.usersDataStreamService.players);
        for (let i = 0; i < cloneArr.length; i++) {
            if (cloneArr[i][0].includes(this.searchCriteria) === true) {
                console.log('asdasdasd');
            }
        }         
    }   

}
