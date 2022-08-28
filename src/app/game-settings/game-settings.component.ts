import { Component, OnInit } from '@angular/core';
import { UsersDataStreamService } from '../users-data-stream-service';
import { GameRules } from '../facades/rules';
import { GameService } from '../game-service';
@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.css']
})
export class GameSettingsComponent implements OnInit{

  constructor(public readonly usersDataStreamService: UsersDataStreamService, 
    private readonly gameService: GameService) { }

  ngOnInit(): void {
      
  }
  public is301Toggled: boolean = false;
  public is501Toggled: boolean = false;
  public isSelected: boolean = false;


  getPlayers() {
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

}
