import { Component, OnInit } from '@angular/core';
import { UsersDataStreamService } from '../users-data-stream-service';
import { GameService } from '../game-service';
import { PlayerStep } from '../facades/playerStep';
import { GameRules } from '../facades/rules';

@Component({
    selector: 'app-game-page',
    templateUrl: './game-page.component.html',
    styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit{

    constructor(private readonly usersDataStreamService: UsersDataStreamService,
      private readonly gameService: GameService) {}

    ngOnInit(): void {
        // this.usersDataStreamService.game501Rules$.subscribe((rules) => this.set501Rules(rules));
        // this.usersDataStreamService.game301Rules$.subscribe((rules) => this.set301Rules(rules));
    
        this.gameService.start(this.players);
        console.log("init");
        this.usersDataStreamService.winner$.subscribe((index) => this.winAlert(index));
      }

    // public players = 
    // [['fqwe', 'fqwefwqef', 0],
    // ['fqwe', 'refrqfrfqrfqe', 1],
    // ['fewqfqwf', 'wfrqfqfrqfq', 2]];

    public players = 
    [['Sherlock holmes', 'fqwefwqef', 0],
    ['Mrs. Stubbs', 'refrqfrfqrfqe', 1],
    ['Jim Moriarty', 'wfrqfqfrqfq', 2],
    ['Bom Bomson', 'fqwefwqef', 3]];

    // public players = 
    // [['fcdsfqwe', 'fqwefwqef', 0],
    // ['qwefrff', 'refrqfrfqrfqe', 1]];

    public multipliers : number[][] = [];

    public step: PlayerStep[] = [];

    public winner: string = '';
    
    public disable: boolean = true;

    setPlayers(){
        this.step = [];
        for (let i = 0; i < this.players.length; i++) {

             let step: PlayerStep = {     
                playerNumber: i,              
                scoreFirstTry: parseInt((<HTMLInputElement>document.getElementById(`score1Try${i}Player`)).value),
                scoreSecondTry: parseInt((<HTMLInputElement>document.getElementById(`score2Try${i}Player`)).value),                    
                scoreThirdTry: parseInt((<HTMLInputElement>document.getElementById(`score3Try${i}Player`)).value),              
                multiplierFirstTry: this.findMultiply(i, 1),
                multiplierSecondTry: this.findMultiply(i, 2),         
                multiplierThirdTry: this.findMultiply(i, 3)
              }
            this.step.push(step);           

            (<HTMLInputElement>document.getElementById(`score1Try${i}Player`)).value = '';
            (<HTMLInputElement>document.getElementById(`score2Try${i}Player`)).value = '';                 
            (<HTMLInputElement>document.getElementById(`score3Try${i}Player`)).value = '';
        }
        // console.log(this.step);
        this.gameService.calculate(this.step);
        this.multipliers = [];       
    }
    
   setMultiply(dart: number, multiply: number, playerNumber: number){
        
        for (let i = 0; i < this.multipliers.length; i++) {
            if(this.multipliers[i][0] === dart && this.multipliers[i][2] === playerNumber){
                this.multipliers.splice(i, 1);
            } 
            else continue;
        }
        this.multipliers.push([dart, multiply, playerNumber]);
        // console.log(this.multipliers);  
    }

   updateMultiply(dart: number, multiply: number, playerNumber: number){   
        for (let i = 0; i < this.multipliers.length; i++) {
            if (JSON.stringify(this.multipliers[i]) === JSON.stringify([dart, multiply, playerNumber])) {
                return true;
            }
            else continue;         
        }
        return false;
    }

    findMultiply(playerNumber: number, dart: number){
        for (let i = 0; i < this.multipliers.length; i++) {
            if (this.multipliers[i][0] === dart && this.multipliers[i][2] === playerNumber) {
                return this.multipliers[i][1];
            }
        }
        return 0;
    }
  
    newGame(){
        this.usersDataStreamService.players = [];
        this.gameService.logScores = [];
    }

    getScores() {
        return this.gameService.logScores.reverse();
    }

    getSteps()  {
        return Object.keys(this.gameService.logScores).reverse();
    }

    checkCorrectInput(){
        for (let i = 0; i < this.players.length; i++) {
            if((<HTMLInputElement>document.getElementById(`score1Try${i}Player`)).value === ""||
            (<HTMLInputElement>document.getElementById(`score2Try${i}Player`)).value === "" ||                   
            (<HTMLInputElement>document.getElementById(`score3Try${i}Player`)).value === ""){
                this.disable = true;
            } 
            else continue;                
        }
        
    }

    winAlert(playerNumber: number){
        this.winner = JSON.stringify(this.players[playerNumber][0]);
    }

    checkWinner() {
        if (this.winner !== ''){
            return true;
        }
        else return false;
    }

    
    
}
