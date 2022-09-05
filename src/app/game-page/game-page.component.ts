import { Component, OnInit } from "@angular/core";
import { UsersDataStreamService } from "../users-data-stream-service";
import { GameService } from "../game-service";
import { PlayerStep } from "../facades/playerStep";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PlayerBalance } from "../facades/playersBalance";
import { dartsValidator } from "../score-input.validator";

@Component({
    selector: "app-game-page",
    templateUrl: "./game-page.component.html",
    styleUrls: ["./game-page.component.css"]
})
export class GamePageComponent implements OnInit {

    public multipliers: number[][] = [];

    public step: PlayerStep[] = [];

    public winner = "";

    public disable = true;

    public players =
        [["Sherlock Holmes", "fqwefwqef"],
        ["Mrs. Stubbs", "refrqfrfqrfqe"],
        ["Jim Moriarty", "wfrqfqfrqfq"],
        ["Bom Bomson", "fqwefwqef"]];
    
    // public players =     
    // [['fqwe', 'fqwefwqef', 0],
    // ['fqwe', 'refrqfrfqrfqe', 1],
    // ['fewqfqwf', 'wfrqfqfrqfq', 2]];

    // public players = 
    // [['fcdsfqwe', 'fqwefwqef', 0],
    // ['qwefrff', 'refrqfrfqrfqe', 1]];

    // public players = this.usersDataStreamService.players;  

    public fb = new FormBuilder;
    
    public manageScores = new FormGroup({
        inputs: new FormArray(
            this.players.map((item) =>
                this.fb.group({
                    name: item[0],
                    throws: this.fb.array([
                        this.fb.group({
                            scores: ["", [Validators.required, dartsValidator]],
                            multiplier: 1
                        }),

                        this.fb.group({
                            scores: ["", [Validators.required, dartsValidator]],
                            multiplier: 1
                        }),

                        this.fb.group({
                            scores: ["", [Validators.required, dartsValidator]],
                            multiplier: 1
                        })
                    ])
                })
            )
        )
    })    

    

    constructor(private readonly usersDataStreamService: UsersDataStreamService,
        private readonly gameService: GameService) {
        // this.test();
    }

    public get Inputs(): FormGroup<{
                                name: FormControl<string | null>;
                                throws: FormArray<FormGroup<{
                                    scores: FormControl<string | null>;
                                        multiplier: FormControl<number | null>;
                                }>>;
                            }>[]
        {
        return this.manageScores.controls.inputs.controls;
    }

    public get Scores(): PlayerBalance[] {
        return this.gameService.logScores.reverse();
    }

    public get Steps(): string[] {
        return Object.keys(this.gameService.logScores).reverse();
    }

    public ngOnInit(): void {
        this.gameService.start(this.players);
        console.log("init");
        this.usersDataStreamService.winner$.subscribe((index) => this.winAlert(index));
        console.log(this.manageScores);
        console.log(this.Inputs);
        // this.test();
        this.manageScores.valueChanges.subscribe(console.log);
        console.log(this.players);
        console.log("players from service");
        console.log(this.usersDataStreamService.players);
    }
    

    
    public isValidationErrors(): boolean {
        for (let i = 0; i < this.players.length; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.Inputs[i].controls["throws"].controls[j].controls.scores.errors) {
                    return true;
                }       
            }          
        }
        return false;
    }  

    public setMultiply(dart: number, multiply: number, playerNumber: number): void {
        this.Inputs[playerNumber].controls["throws"].controls[dart].patchValue({multiplier: multiply});
    }

    public checkSelected(dart: number, multiply: number, playerNumber: number): boolean {
        if (this.Inputs[playerNumber].controls["throws"].controls[dart].controls["multiplier"].value === multiply) {
            return true;   
        }    
        else return false
    }

    public checkBullsEye(dart: number, playerNumber: number): boolean{
        if(parseInt(this.Inputs[playerNumber].controls["throws"].controls[dart].controls.scores.value as string) === 50 || 
        parseInt(this.Inputs[playerNumber].controls["throws"].controls[dart].controls.scores.value as string) === 25){
            return true;
        }
        else return false;
    }

    public setPlayers(): void {
        this.step = [];
        let multiplierOne;
        let multiplierTwo;
        let multiplierThree;
        for (let i = 0; i < this.players.length; i++) {

            if (parseInt(this.Inputs[i].controls["throws"].controls[0].controls["scores"].value as string) === 25 ||
                parseInt(this.Inputs[i].controls["throws"].controls[0].controls["scores"].value as string) === 50) {
                    multiplierOne = 1;
                } else {
                    multiplierOne = this.Inputs[i].controls["throws"].controls[0].controls["multiplier"].value;
                }

            if (parseInt(this.Inputs[i].controls["throws"].controls[1].controls["scores"].value as string) === 25 ||
                parseInt(this.Inputs[i].controls["throws"].controls[1].controls["scores"].value as string) === 50) {
                    multiplierTwo = 1;
                } else {
                    multiplierTwo = this.Inputs[i].controls["throws"].controls[1].controls["multiplier"].value;
                } 
            if (parseInt(this.Inputs[i].controls["throws"].controls[2].controls["scores"].value as string) === 25 ||
                parseInt(this.Inputs[i].controls["throws"].controls[2].controls["scores"].value as string) === 50) {
                    multiplierThree = 1;
                } else {
                    multiplierThree = this.Inputs[i].controls["throws"].controls[2].controls["multiplier"].value;
                }

                const step: PlayerStep = {
                    playerNumber: i,
                    scoreFirstTry: parseInt(this.Inputs[i].controls["throws"].controls[0].controls["scores"].value as string),
                    scoreSecondTry: parseInt(this.Inputs[i].controls["throws"].controls[1].controls["scores"].value as string),               
                    scoreThirdTry: parseInt(this.Inputs[i].controls["throws"].controls[2].controls["scores"].value as string),
                    multiplierFirstTry: multiplierOne,
                    multiplierSecondTry: multiplierTwo,
                    multiplierThirdTry: multiplierThree,
                } 
            this.step.push(step);
            for (let j = 0; j < 3; j++) {
                this.setMultiply(j, 1, i);
            }
        }

        for (let i = 0; i < this.players.length; i++) {
            for (let j = 0; j < 3; j++) {
                this.Inputs[i].controls["throws"].controls[j].patchValue({scores: ""});
            }          
        }

        // switch (this.gameService.calculate(this.step)) {
        //     case "win":
        //         break;
            // case "retry":
            //     alert("retry");
            //     break;
            // case "overscored":
            //     alert("overscored");
            //     break;
        // }

        this.gameService.calculate(this.step);
        console.log(this.step);
        console.log(this.gameService.logScores);
        this.manageScores.markAsUntouched();
    }

    public newGame(): void {
        this.usersDataStreamService.players = [];
        this.gameService.logScores = [];
    }

    public winAlert(playerNumber: number): void {
        this.winner = JSON.stringify(this.players[playerNumber][0]);
    }

    public checkWinner(): boolean {
        return this.winner !== "";
    }

    
}
