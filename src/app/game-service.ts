import { Injectable, OnInit } from "@angular/core";
import { PlayerStep } from "./facades/playerStep";
import { GameRules } from "./facades/rules";
import { PlayerBalance } from "./facades/playersBalance";

@Injectable({
    providedIn: 'root',
})

export class GameService {
   

    public logScores: PlayerBalance[] = [];
    //currentScore объявить в функции
    
    // private currentScores: number[] = [];
    private previousScores: number[] = [];
    private stepNumber: number = 0;

    private numOfPlayers: number = 0;

    public currentRules: GameRules = {
        301: false,
        501: false
    }

    set501Rules(rules: GameRules){
        this.currentRules = rules;
    }  

    set301Rules(rules: GameRules){
        this.currentRules = rules;
    }

    start(players: any[][]){
        // console.log(this.currentRules);
        console.log('start triggered');
        let goal;
        if (this.currentRules[301] === true) {
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
        }
        for (let i = 0; i < scoresClone.length - 1; i++) {
            scoresClone.shift();
        }
        this.stepNumber++;

        console.log("this is logScores");
        console.log(this.logScores);
        
        console.log("this is scoreClone");
        console.log(scoresClone);
        
        let balance = {
            stepNumber: this.stepNumber,
            scoresRemain: scoresClone[0],
        }
        this.logScores.push(balance)

        console.log("this is updated logScores");
        console.log(this.logScores);
    }
}

