import { Injectable } from "@angular/core";
import { PlayerStep } from "./facades/playerStep";
import { PlayerBalance } from "./facades/playersBalance";
import { UsersDataStreamService } from "./users-data-stream-service";

@Injectable({
    providedIn: 'root',
})

export class GameService {
   
    constructor(public usersDataStreamService: UsersDataStreamService){}

    public logScores: PlayerBalance[] = [];

    private stepNumber: number = 0;

    public is301Toggled: boolean = false;


    start(players: any[][]){
        // console.log(this.currentRules);
        console.log('start triggered');
        let goal;
        if (this.is301Toggled === true) {
            goal = 301;
        } else goal = 501;

        let startingPoints : number[] = [];

        for (let i = 0; i < players.length; i++) {
            startingPoints.push(goal);
        }      
        
        console.log(startingPoints);

        let balance = {
            stepNumber: this.stepNumber,
            scoresRemain: startingPoints,          
        }


        this.logScores.push(balance);
        // console.log(this.stepNumber);
        console.log(this.logScores);
    }

    calculate(step: PlayerStep[]){

        let scoresClone = [];

        let scores = new Array(...this.logScores);

        for (let i = 0; i < scores.length; i++) {
            scoresClone[i] = scores[i].scoresRemain.slice();      
        }
        for (let i = 0; i < scoresClone[this.stepNumber].length; i++) {
            scoresClone[this.stepNumber][i] = scoresClone[this.stepNumber][i] -
            step[i].scoreFirstTry * step[i].multiplierFirstTry - 
            step[i].scoreSecondTry * step[i].multiplierSecondTry - 
            step[i].scoreThirdTry * step[i].multiplierThirdTry;

            if(scoresClone[this.stepNumber][i] === 0){
                if (step[i].multiplierFirstTry === 2 || 
                    step[i].multiplierSecondTry === 2 || 
                    step[i].multiplierThirdTry === 2 ||
                    step[i].scoreFirstTry === 50 ||
                    step[i].scoreFirstTry === 25 ||
                    step[i].scoreSecondTry === 50 ||
                    step[i].scoreSecondTry === 25 ||
                    step[i].scoreThirdTry === 50 ||
                    step[i].scoreThirdTry === 25)  {                 
                        this.winAlert(i);
                        return 'win';
                } else {
                    return 'retry'
                }

            } else if(scoresClone[this.stepNumber][i] < 0) {
                return "overscored"
            }
        }
     
        for (let i = 0; i < scoresClone.length - 1; i++) {
            scoresClone.shift();
        }
        this.stepNumber++;

        let balance = {
            stepNumber: this.stepNumber,
            scoresRemain: scoresClone[0],
        }   
        this.logScores.push(balance)
        return true;
    }

    winAlert(winnerNumber: number){
        this.usersDataStreamService.setWinner(winnerNumber);
    }
}

