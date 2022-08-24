import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage-serivce';
import { UsersDataStreamService } from '../users-data-stream-service';
import { GameRules } from '../facades/rules';
import { GameService } from '../game-service';
@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.css']
})
export class GameSettingsComponent {

  constructor(private readonly storageService: StorageService, 
    private readonly usersDataStreamService: UsersDataStreamService, 
    private readonly gameService: GameService) { }

  public is301Toggled: boolean = false;
  public is501Toggled: boolean = false;
  public isSelected: boolean = false;
  public players = JSON.parse("[" + this.storageService.getAll() + "]");

  getPlayers() {
    return this.players;
  }

  deletePlayer(index: number){ 
    this.storageService.deleteItem(this.players[index][2]);
    this.players.splice(index, 1); 
  }

  toggle301(){

    let rules: GameRules = {
      501: false,
      301: true
    }

    this.is301Toggled = true;
    this.is501Toggled = false;
    this.isSelected = true; 
    // this.usersDataStreamService.setGameRules301(rules);
    this.gameService.set301Rules(rules);
  }

  toggle501(){

    let rules: GameRules = {
      501: true,
      301: false
    }

    this.is301Toggled = false;
    this.is501Toggled = true;
    this.isSelected = true;
    // this.usersDataStreamService.setGameRules501(rules);
    this.gameService.set501Rules(rules);
  }

  setPlayers() : void{
    this.usersDataStreamService.changePlayersList(this.players);
  }

}
