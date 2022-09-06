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

    public errorMessage = "";

    public players = this.usersDataStreamService.selectedPlayers;  

    public fb = new FormBuilder;
    
    public manageScores = new FormGroup({
        inputs: new FormArray(
            this.players.map((item) =>
                this.fb.group({
                    name: item[0],
                    throws: this.fb.array([
                        this.fb.group({
                            scores: [<number | null> null, [Validators.required, dartsValidator]],
                            multiplier: 1
                        }),

                        this.fb.group({
                            scores: [<number | null> null, [Validators.required, dartsValidator]],
                            multiplier: 1
                        }),

                        this.fb.group({
                            scores: [ <number | null> null, [Validators.required, dartsValidator]],
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
                                    scores: FormControl<number | null>;
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
        this.gameService.logScores = [];
        this.gameService.start(this.players);
        console.log("init");
        this.usersDataStreamService.winner$.subscribe((index) => this.winAlert(index));
        // console.log(this.Inputs);
        // this.test();  
        this.manageScores.valueChanges.subscribe(() => {console.log(this.manageScores);});
        // console.log(this.players);
        // console.log("players from service");
        // console.log(this.usersDataStreamService.players);
    }
    
    public setPlayers(): void {
        this.step = [];
        let multiplierOne;
        let multiplierTwo;
        let multiplierThree;
        for (let i = 0; i < this.players.length; i++) {

            if (this.Inputs[i].controls["throws"].controls[0].controls["scores"].value === 25 ||
                this.Inputs[i].controls["throws"].controls[0].controls["scores"].value === 50) {
                    multiplierOne = 1;
                } else {
                    multiplierOne = this.Inputs[i].controls["throws"].controls[0].controls["multiplier"].value;
                }

            if (this.Inputs[i].controls["throws"].controls[1].controls["scores"].value === 25 ||
                this.Inputs[i].controls["throws"].controls[1].controls["scores"].value === 50) {
                    multiplierTwo = 1;
                } else {
                    multiplierTwo = this.Inputs[i].controls["throws"].controls[1].controls["multiplier"].value;
                } 
            if (this.Inputs[i].controls["throws"].controls[2].controls["scores"].value === 25 ||
                this.Inputs[i].controls["throws"].controls[2].controls["scores"].value === 50) {
                    multiplierThree = 1;
                } else {
                    multiplierThree = this.Inputs[i].controls["throws"].controls[2].controls["multiplier"].value;
                }

                const step: PlayerStep = {
                    playerNumber: i,
                    scoreFirstTry: this.Inputs[i].controls["throws"].controls[0].controls["scores"].value,
                    scoreSecondTry: this.Inputs[i].controls["throws"].controls[1].controls["scores"].value,               
                    scoreThirdTry: this.Inputs[i].controls["throws"].controls[2].controls["scores"].value,
                    multiplierFirstTry: multiplierOne,
                    multiplierSecondTry: multiplierTwo,
                    multiplierThirdTry: multiplierThree,
                } 
            this.step.push(step);
            for (let j = 0; j < 3; j++) {
                this.Inputs[i].controls["throws"].controls[j].patchValue({multiplier: 1});
            }
        }

        for (let i = 0; i < this.players.length; i++) {
            for (let j = 0; j < 3; j++) {
                this.Inputs[i].controls["throws"].controls[j].patchValue({scores: null});
            }          
        }

        this.gameService.calculate(this.step);

        this.checkFaults();

        if(this.errorMessage !== "") {
            alert(this.errorMessage);
        }
        
        // console.log(this.errorMessage);

        // console.log("missed 2x");
        // console.log(this.usersDataStreamService.missed2xZonePlayers);

        // console.log("overscored");
        // console.log(this.usersDataStreamService.overscoredPlayers);

        // console.log(this.step);
        // console.log(this.gameService.logScores);
        this.manageScores.markAsUntouched();
    }

    public checkFaults(): void {

        this.errorMessage = "";

        if(this.usersDataStreamService.missed2xZonePlayers.length !== 0){
            if(this.usersDataStreamService.overscoredPlayers.length !== 0){
                // errorMessage = ("Last throw should be in 2x zone.\nOverscored. Retry");
                for (let i = 0; i < this.usersDataStreamService.missed2xZonePlayers.length; i++) {
                    this.errorMessage += (this.usersDataStreamService.missed2xZonePlayers[i] + ", ");
                }
                this.errorMessage += ("last throw should be in 2x zone. ")
                for (let j = 0; j < this.usersDataStreamService.overscoredPlayers.length; j++) {
                    this.errorMessage += (this.usersDataStreamService.overscoredPlayers[j] + ", ");
                }
                this.errorMessage += ("overscored. \n");
            }
            else {
                for (let i = 0; i < this.usersDataStreamService.missed2xZonePlayers.length; i++) {
                    this.errorMessage += (this.usersDataStreamService.missed2xZonePlayers[i] + ", ");
                }
                this.errorMessage += ("last throw should be in 2x zone. ")
            }
        }
        if(this.usersDataStreamService.overscoredPlayers.length !== 0 && this.usersDataStreamService.missed2xZonePlayers.length === 0){
            for (let j = 0; j < this.usersDataStreamService.overscoredPlayers.length; j++) {
                this.errorMessage += (this.usersDataStreamService.overscoredPlayers[j] + ", ");
            }
            this.errorMessage += ("overscored. ");
        }
    }

    public newGame(): void {
        this.usersDataStreamService.selectedPlayers = [];
        this.gameService.logScores = [];
    }

    public winAlert(playerNumber: number): void {
        this.winner = JSON.stringify(this.players[playerNumber][0]);
    }

    public checkWinner(): boolean {
        return this.winner !== "";
    }
    
}
