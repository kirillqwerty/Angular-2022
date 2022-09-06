import { Component } from "@angular/core";
import { UsersDataStreamService } from "../users-data-stream-service";
import { GameService } from "../game-service";
import { FormControl, FormGroup } from "@angular/forms";
@Component({
  selector: "app-game-settings",
  templateUrl: "./game-settings.component.html",
  styleUrls: ["./game-settings.component.css"]
})
export class GameSettingsComponent {

    public is301Toggled = false;

    public is501Toggled = false;   

    public isSelected = false;

    public searchResult: string[][] = [];

    public searchForm = new FormGroup({
        player: new FormControl(""),
    })

    constructor(public readonly usersDataStreamService: UsersDataStreamService, private readonly gameService: GameService) { 
        this.searchResult = this.usersDataStreamService.players;
        this.searchForm.valueChanges.subscribe((searchWord: any) => this.search(searchWord.player));
    }

    

    public getPlayers(): number {
        return this.usersDataStreamService.players.length;
    }


    public deletePlayer(index: number): void { 
        this.usersDataStreamService.players.splice(index, 1); 
    }

    public toggle301(): void {
        this.is301Toggled = true;
        this.is501Toggled = false;
        this.isSelected = true; 
    // this.usersDataStreamService.setGameRules301(rules);
        this.gameService.is301Toggled = true;
    }

    public toggle501(): void {

        this.is301Toggled = false;
        this.is501Toggled = true;
        this.isSelected = true;
    // this.usersDataStreamService.setGameRules501(rules);
        this.gameService.is301Toggled = false;
    }

    public setPlayers(): void{
    // this.usersDataStreamService.setPlayersList(this.players);
    }

    public search(searchWord: string): void {  
        this.searchResult = [];
        if(searchWord !== "") {
            for (let i = 0; i < this.usersDataStreamService.players.length; i++) {
                if (this.usersDataStreamService.players[i][0].toLowerCase().indexOf(searchWord.toLowerCase()) !== -1 ||
                    this.usersDataStreamService.players[i][1].toLowerCase().indexOf(searchWord.toLowerCase()) !== -1) {
                    this.searchResult.push(this.usersDataStreamService.players[i]);
                } else continue;      
            }
        } 
        
        if (this.searchResult.length === 0 && searchWord === "") {
            this.searchResult = this.usersDataStreamService.players;
        }
    }   

    public managePlayer(index: number): void {
        if(this.usersDataStreamService.selectedPlayers.indexOf(this.searchResult[index]) === -1){
            if (this.usersDataStreamService.selectedPlayers.length === 4) {
                this.usersDataStreamService.selectedPlayers.shift();
            }
            this.addPlayerToSelected(index);
        } else this.deletePlayerFromSelected(index);
        console.log(this.usersDataStreamService.selectedPlayers);
        console.log(this.searchResult)
    }

    public addPlayerToSelected(index: number): void {
        this.usersDataStreamService.selectedPlayers.push(this.searchResult[index]);
    }

    public deletePlayerFromSelected(index: number): void {
        this.usersDataStreamService.selectedPlayers.splice(this.usersDataStreamService.selectedPlayers.indexOf(this.searchResult[index]), 1);
    }

    public checkIfSelected(index: number): boolean {
        if (this.usersDataStreamService.selectedPlayers.indexOf(this.searchResult[index]) !== -1) {
            // console.log(true);
            return true;    
        } else {
            // console.log(false);
            return false;
        }    
        
    }
}
