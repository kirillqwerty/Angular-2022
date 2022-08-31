import { Component, OnInit } from '@angular/core';
import { UsersDataStreamService } from '../users-data-stream-service';
import { GameService } from '../game-service';
import { PlayerStep } from '../facades/playerStep';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';

@Component({
    selector: 'app-game-page',
    templateUrl: './game-page.component.html',
    styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit{

    constructor(private readonly usersDataStreamService: UsersDataStreamService,
        private readonly gameService: GameService,
        ) {
        this._createForm();
    }

    scoreInputForm: FormGroup [] = [];

    private _createForm(){
        for (let i = 0; i < this.players.length; i++) {
            let inputsGroup = new FormGroup({
                score1try: new FormControl,
                score2try: new FormControl,
                score3try: new FormControl       
            })
            this.scoreInputForm.push(inputsGroup);
        }
    }

        test(){
        console.log(this.scoreInputForm);
    }

    testValue(){
        console.log( this.scoreInputForm[0].controls['score1try'].value);
    }

    ngOnInit(): void {
        this.gameService.start(this.players);
        console.log("init");
        this.usersDataStreamService.winner$.subscribe((index) => this.winAlert(index));

        for (let i = 0; i < this.players.length; i++) {
            for (let j = 0; j <= 3; j++) {
                this.setMultiply(j, 1, i);
            }        
        }
    }

    // public players = 
    // [['fqwe', 'fqwefwqef', 0],
    // ['fqwe', 'refrqfrfqrfqe', 1],
    // ['fewqfqwf', 'wfrqfqfrqfq', 2]];

    public players = 
    [['Sherlock Holmes', 'fqwefwqef', 0],
    ['Mrs. Stubbs', 'refrqfrfqrfqe', 1],
    ['Jim Moriarty', 'wfrqfqfrqfq', 2],
    ['Bom Bomson', 'fqwefwqef', 3]];

    // public players = 
    // [['fcdsfqwe', 'fqwefwqef', 0],
    // ['qwefrff', 'refrqfrfqrfqe', 1]];

    // public players = this.usersDataStreamService.players;

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
                scoreFirstTry: this.scoreInputForm[i].controls['score1try'].value,
                scoreSecondTry: this.scoreInputForm[i].controls['score2try'].value,                 
                scoreThirdTry: this.scoreInputForm[i].controls['score3try'].value,             
                multiplierFirstTry: this.findMultiply(i, 1),
                multiplierSecondTry: this.findMultiply(i, 2),         
                multiplierThirdTry: this.findMultiply(i, 3)
            }
            
            this.step.push(step);    
            for (let j = 0; j <= 3; j++) {
                this.setMultiply(j, 1, i);
            }        

            this.scoreInputForm[i].reset();
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

        if(errors === 0){
            switch (this.gameService.calculate(this.step)) {
                case 'win':
                    break;
                case 'retry':
                    alert('retry');
                    break;
                case 'overscored':
                    alert('overscored');
                    break; 
            }
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
        return 1;
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

    winAlert(playerNumber: number){
        this.winner = JSON.stringify(this.players[playerNumber][0]);
    }

    checkWinner() {
        return this.winner !== '';
    }  
}
