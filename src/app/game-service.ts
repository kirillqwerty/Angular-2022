import { Injectable, OnInit } from "@angular/core";
import { PlayerStep } from "./facades/playerStep";
import { GameRules } from "./facades/rules";
import { PlayerBalance } from "./facades/playersBalance";

@Injectable({
    providedIn: 'root',
})

export class GameService {
   

    public logScores: PlayerBalance[] = [];
    private currentScores: number[] = [];
    private previousScores: number[] = [];
    private stepNumber: number = 0;

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

        for (let i = 0; i < players.length; i++) {
            this.currentScores.push(goal);
        }      
    
        // this.balance = {
        //     stepNumber: this.stepNumber,
        //     scoresRemain: this.currentScores
        // }
    
        let balance = new PlayerBalance(this.stepNumber, this.currentScores);

        this.logScores.push(balance);

        // console.log(this.stepNumber);
        console.log(this.currentScores);
        console.log(this.logScores);
    }

    calculate(step: PlayerStep[]){
 
        console.log('calculate triggered')
        let goal;
        if (this.currentRules[301] === true) {
            goal = 301;
        } else goal = 501;
        
        console.log("before balance initialization ");
        for (let i = 0; i < this.currentScores.length; i++) {
           
            this.currentScores[i] = this.currentScores[i] - 
            step[i].scoreFirstTry * step[i].multiplierFirstTry - 
            step[i].scoreSecondTry * step[i].multiplierSecondTry - 
            step[i].scoreThirdTry * step[i].multiplierThirdTry;
        }
        this.stepNumber++;


        
        let balance = new PlayerBalance(this.stepNumber, this.currentScores);

        console.log(balance);
        this.logScores.push(balance);
        console.log("IN CALCULATE after push"); 
        console.log(this.logScores);
        // console.log(this.stepNumber);
        // console.log(this.currentScores);
    }
}

