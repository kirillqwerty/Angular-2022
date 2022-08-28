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
export class GameSettingsComponent implements OnInit{

  constructor(private readonly storageService: StorageService, 
    private readonly usersDataStreamService: UsersDataStreamService, 
    private readonly gameService: GameService) { }

  ngOnInit(): void {
      this.usersDataStreamService.addPlayers$.subscribe((players) => this.players = players);
  }
  public players: string[][] = [];
  public is301Toggled: boolean = false;
  public is501Toggled: boolean = false;
  public isSelected: boolean = false;
  // public players = JSON.parse("[" + this.storageService.getAll() + "]");

  getPlayers() {
    console.log(this.players);
    return this.players;
  }

  // addPlayer(player: string[]) {
  //   this.players.push(player)
  // }

  deletePlayer(index: number){ 
    // console.log('players from delete ');
    // this.storageService.deleteItem(this.players[index][2]);
    // this.players.splice(index, 1); 
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
    // this.usersDataStreamService.setPlayersList(this.players);
  }

}
