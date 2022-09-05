import { Component, OnInit } from '@angular/core';
import { UsersDataStreamService } from '../users-data-stream-service';
import { GameService } from '../game-service';
import { HtmlParser } from '@angular/compiler';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.css']
})
export class GameSettingsComponent {

    public is301Toggled: boolean = false;

    public is501Toggled: boolean = false;   

    public isSelected: boolean = false;

    public searchResult: string[][] = [];

    constructor(public readonly usersDataStreamService: UsersDataStreamService, private readonly gameService: GameService) { 
        this.searchResult = this.usersDataStreamService.players;
        this.searchForm.valueChanges.subscribe((searchWord:any) => this.search(searchWord.player));
    }

    searchForm= new FormGroup({
        player: new FormControl(''),
    })

    getPlayers(): number {
        return this.usersDataStreamService.players.length;
    }


    deletePlayer(index: number): void { 
        this.usersDataStreamService.players.splice(index, 1); 
    }

    toggle301(): void {
        this.is301Toggled = true;
        this.is501Toggled = false;
        this.isSelected = true; 
    // this.usersDataStreamService.setGameRules301(rules);
        this.gameService.is301Toggled = true;
    }

    toggle501(): void {

        this.is301Toggled = false;
        this.is501Toggled = true;
        this.isSelected = true;
    // this.usersDataStreamService.setGameRules501(rules);
        this.gameService.is301Toggled = false;
    }

    setPlayers(): void{
    // this.usersDataStreamService.setPlayersList(this.players);
    }

    search(searchWord: string): void {  
        this.searchResult = [];
        if(searchWord !== '') {
            for (let i = 0; i < this.usersDataStreamService.players.length; i++) {
                if (this.usersDataStreamService.players[i][0].toLowerCase().indexOf(searchWord.toLowerCase()) !== -1 ||
                    this.usersDataStreamService.players[i][1].toLowerCase().indexOf(searchWord.toLowerCase()) !== -1) {
                    this.searchResult.push(this.usersDataStreamService.players[i]);
                } else continue;      
            }
        } 
        
        if (this.searchResult.length === 0 && searchWord === '')  {
            this.searchResult = this.usersDataStreamService.players;
        }
    }   
}
