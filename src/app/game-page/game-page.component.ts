import { AfterContentChecked, Component, OnInit } from '@angular/core';
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
        let errors = 0;
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

        for (let i = 0; i < this.step.length; i++) {
            if (isNaN(this.step[i].scoreFirstTry) ||
                isNaN(this.step[i].scoreSecondTry) ||
                isNaN(this.step[i].scoreThirdTry)) {
                errors++;
                    // alert('Enter all scores');
            } else if ((this.step[i].multiplierFirstTry === 0 && (this.step[i].scoreFirstTry !== 50 && this.step[i].scoreFirstTry !== 25)) ||
                        (this.step[i].multiplierSecondTry === 0 && (this.step[i].scoreSecondTry !== 50 && this.step[i].scoreSecondTry !== 25)) || 
                        (this.step[i].multiplierThirdTry === 0 && (this.step[i].scoreThirdTry !== 50 && this.step[i].scoreThirdTry !== 25))) {
                errors++;
                    // alert('Select multipliers');
            } else if ((this.step[i].scoreFirstTry > 20 && (this.step[i].scoreFirstTry !== 50 && this.step[i].scoreFirstTry !== 25)) ||
                        (this.step[i].scoreSecondTry > 20 && (this.step[i].scoreSecondTry !== 50 && this.step[i].scoreSecondTry !== 25)) ||
                        (this.step[i].scoreThirdTry > 20 && (this.step[i].scoreThirdTry !== 50  && this.step[i].scoreThirdTry !== 25))) {
                errors++;        
            } else if ((this.step[i].multiplierFirstTry !== 0 && (this.step[i].scoreFirstTry === 50 && this.step[i].scoreFirstTry === 25)) ||
                        (this.step[i].multiplierSecondTry !== 0 && (this.step[i].scoreSecondTry === 50 && this.step[i].scoreSecondTry === 25)) ||
                        (this.step[i].multiplierThirdTry !== 0 && (this.step[i].scoreThirdTry === 50  && this.step[i].scoreThirdTry === 25))){
                errors++;            
            } else if (this.step[i].scoreFirstTry < 0 ||
                        this.step[i].scoreSecondTry < 0 ||
                        this.step[i].scoreThirdTry < 0){
                errors++;            
            }      
        }

        this.multipliers = [];

        if(errors === 0){
            this.gameService.calculate(this.step); 
        }
        else {
            alert("Incorrect input");
            for (let i = 0; i < this.players.length; i++) {
                this.step.pop();
            }
        }
        console.log(this.step);

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
        return 1    ;
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
            if((<HTMLInputElement>document.getElementById(`score1Try${i}Player`))?.value === ''||
            (<HTMLInputElement>document.getElementById(`score2Try${i}Player`))?.value === '' ||                   
            (<HTMLInputElement>document.getElementById(`score3Try${i}Player`))?.value === ''){
                this.disable = true;
                return true;
            } 
            else continue;                
        }
        this.disable = false;
        return false;
    }

    // test(){
    //     for (let i = 0; i < this.players.length; i++) {
    //         console.log((<HTMLInputElement>document.getElementById(`score1Try${i}Player`))?.value +
    //         (<HTMLInputElement>document.getElementById(`score2Try${i}Player`))?.value +                   
    //         (<HTMLInputElement>document.getElementById(`score3Try${i}Player`))?.value )            
    //     }
    // }

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
