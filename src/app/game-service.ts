import { Injectable } from "@angular/core";
import { PlayerStep } from "./facades/playerStep";
import { PlayerBalance } from "./facades/playersBalance";
import { UsersDataStreamService } from "./users-data-stream-service";

@Injectable({
    providedIn: "root",
})

export class GameService {

    public logScores: PlayerBalance[] = [];

    public stepNumber = 0;

    public is301Toggled = false;
   
    constructor(public usersDataStreamService: UsersDataStreamService){}

    public start(players: string[][]): void {
        // console.log(this.currentRules);
        console.log("start triggered");
        let goal;
        if (this.is301Toggled === true) {
            goal = 301;
        } else goal = 50;

        const startingPoints: number[] = [];

        for (let i = 0; i < players.length; i++) {
            startingPoints.push(goal);
        }      
        
        console.log(startingPoints);

        const balance = {
            stepNumber: this.stepNumber,
            scoresRemain: startingPoints,          
        }


        this.logScores.push(balance);
        // console.log(this.stepNumber);
        console.log(this.logScores);
    }

    public calculate(step: PlayerStep[]): string {

        const scoresClone = [];

        const scores = new Array(...this.logScores);

        let is2xMiss = false;
        let isOverscored = false;
        
        for (let i = 0; i < scores.length; i++) {
            scoresClone[i] = scores[i].scoresRemain.slice();      
        }
        for (let i = 0; i < scoresClone[this.stepNumber].length; i++) {
            scoresClone[this.stepNumber][i] = scoresClone[this.stepNumber][i] -
            (step[i].scoreFirstTry as number) * (step[i].multiplierFirstTry as number)- 
            (step[i].scoreSecondTry as number) * (step[i].multiplierSecondTry as number) - 
            (step[i].scoreThirdTry as number) * (step[i].multiplierThirdTry as number);
            
            if(scoresClone[this.stepNumber][i] === 0){
                if (step[i].multiplierFirstTry === 2 || 
                    step[i].multiplierSecondTry === 2 || 
                    step[i].multiplierThirdTry === 2 ||
                    step[i].scoreFirstTry === 50 ||
                    step[i].scoreFirstTry === 25 ||
                    step[i].scoreSecondTry === 50 ||
                    step[i].scoreSecondTry === 25 ||
                    step[i].scoreThirdTry === 50 ||
                    step[i].scoreThirdTry === 25) {                 
                        this.winAlert(i);
                        return "Win";
                } else {
                    scoresClone[this.stepNumber][i] = scoresClone[this.stepNumber][i] +
                    (step[i].scoreFirstTry as number) * (step[i].multiplierFirstTry as number) +  
                    (step[i].scoreSecondTry as number) * (step[i].multiplierSecondTry as number) + 
                    (step[i].scoreThirdTry as number) * (step[i].multiplierThirdTry as number);                   
                    // alert(`Player №${i+1}, last throw should be in 2x zone. Retry`);
                    is2xMiss = true;
                }

            } else if(scoresClone[this.stepNumber][i] < 0 || scoresClone[this.stepNumber][i] === 1) {
                    scoresClone[this.stepNumber][i] = scoresClone[this.stepNumber][i] +
                    (step[i].scoreFirstTry as number) * (step[i].multiplierFirstTry as number) +  
                    (step[i].scoreSecondTry as number) * (step[i].multiplierSecondTry as number) + 
                    (step[i].scoreThirdTry as number) * (step[i].multiplierThirdTry as number);
                    // alert(`Player №${i+1}, overscored. Retry`);
                    isOverscored = true;    
                }
        }
        
        if(is2xMiss){
            if(isOverscored){
                alert("Last throw should be in 2x zone.\nOverscored. Retry");
            }
            else alert("Last throw should be in 2x zone. Retry")
        }
        if(isOverscored && !is2xMiss){
            alert("Overscored. Retry");
        }

        console.log(scoresClone);

        this.stepNumber++;

        const balance = {
            stepNumber: this.stepNumber,
            scoresRemain: scoresClone[scoresClone.length - 1],
        }   
        this.logScores.push(balance);
        return "next step";
    }

    public winAlert(winnerNumber: number): void {
        this.usersDataStreamService.setWinner(winnerNumber);
    }
}


