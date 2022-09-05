import { Component, OnInit } from '@angular/core';
import { UsersDataStreamService } from '../users-data-stream-service';
import { GameService } from '../game-service';
import { PlayerStep } from '../facades/playerStep';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlayerBalance } from '../facades/playersBalance';
import { dartsValidator } from '../score-input.validator';

@Component({
    selector: 'app-game-page',
    templateUrl: './game-page.component.html',
    styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

    public multipliers: number[][] = [];

    public step: PlayerStep[] = [];

    public winner: string = '';

    public disable: boolean = true;

    // public players =
    //     [['Sherlock Holmes', 'fqwefwqef', 0],
    //     ['Mrs. Stubbs', 'refrqfrfqrfqe', 1],
    //     ['Jim Moriarty', 'wfrqfqfrqfq', 2],
    //     ['Bom Bomson', 'fqwefwqef', 3]];
    
    // public players =     
    // [['fqwe', 'fqwefwqef', 0],
    // ['fqwe', 'refrqfrfqrfqe', 1],
    // ['fewqfqwf', 'wfrqfqfrqfq', 2]];

    // public players = 
    // [['fcdsfqwe', 'fqwefwqef', 0],
    // ['qwefrff', 'refrqfrfqrfqe', 1]];

    public players = this.usersDataStreamService.players;  

    fb = new FormBuilder;
    
    public manageScores = new FormGroup({
        inputs: new FormArray(
            this.players.map((item) =>
                this.fb.group({
                    name: item[0],
                    throws: this.fb.array([
                        this.fb.group({
                            scores: ['', [Validators.required, dartsValidator]],
                            multiplier: 1
                        }),

                        this.fb.group({
                            scores: ['', [Validators.required, dartsValidator]],
                            multiplier: 1
                        }),

                        this.fb.group({
                            scores: ['', [Validators.required, dartsValidator]],
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

    get Inputs() : FormGroup<{
                                name: FormControl<string | null>;
                                throws: FormArray<FormGroup<{
                                    scores: FormControl<string | null>;
                                        multiplier: FormControl<number | null>;
                                }>>;
                            }>[]
        {
        return this.manageScores.controls.inputs.controls;
    }

    get Scores() : PlayerBalance[] {
        return this.gameService.logScores.reverse();
    }

    get Steps() : string[] {
        return Object.keys(this.gameService.logScores).reverse();
    }

    ngOnInit(): void {
        this.gameService.start(this.players);
        console.log("init");
        this.usersDataStreamService.winner$.subscribe((index) => this.winAlert(index));
        console.log(this.manageScores);
        console.log(this.Inputs);
        // this.test();
        this.manageScores.valueChanges.subscribe(console.log);
        console.log(this.players);
        console.log('players from service');
        console.log(this.usersDataStreamService.players);
    }
    

    
    isValidationErrors(): boolean {
        for (let i = 0; i < this.players.length; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.Inputs[i].controls['throws'].controls[j].controls.scores.errors) {
                    return true;
                }       
            }          
        }
        return false;
    }  

    setMultiply(dart: number, multiply: number, playerNumber: number): void {
        this.Inputs[playerNumber].controls['throws'].controls[dart].patchValue({multiplier: multiply});
    }

    checkSelected(dart: number, multiply: number, playerNumber: number): boolean {
        if (this.Inputs[playerNumber].controls['throws'].controls[dart].controls['multiplier'].value === multiply) {
            return true;   
        }    
        else return false
    }

    checkBullsEye(dart: number, playerNumber: number): boolean{
        if(parseInt(this.Inputs[playerNumber].controls['throws'].controls[dart].controls.scores.value as string) === 50 || 
        parseInt(this.Inputs[playerNumber].controls['throws'].controls[dart].controls.scores.value as string) === 25){
            return true;
        }
        else return false;
    }

    setPlayers(): void {
        this.step = [];
        let errors = 0;
        for (let i = 0; i < this.players.length; i++) {
                let step: PlayerStep = {
                    playerNumber: i,
                    scoreFirstTry: parseInt(this.Inputs[i].controls['throws'].controls[0].controls['scores'].value as string),
                    scoreSecondTry: parseInt(this.Inputs[i].controls['throws'].controls[1].controls['scores'].value as string),               
                    scoreThirdTry: parseInt(this.Inputs[i].controls['throws'].controls[2].controls['scores'].value as string),
                    multiplierFirstTry: this.Inputs[i].controls['throws'].controls[0].controls['multiplier'].value,
                    multiplierSecondTry: this.Inputs[i].controls['throws'].controls[1].controls['multiplier'].value,
                    multiplierThirdTry: this.Inputs[i].controls['throws'].controls[2].controls['multiplier'].value,
                } 
            this.step.push(step);
            for (let j = 0; j < 3; j++) {
                this.setMultiply(j, 1, i);
            }
        }

        for (let i = 0; i < this.players.length; i++) {
            for (let j = 0; j < 3; j++) {
                this.Inputs[i].controls['throws'].controls[j].patchValue({scores: ''});
            }          
        }

        if (errors === 0) {
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
        console.log(this.gameService.logScores);
        this.manageScores.markAsUntouched();
    }

    newGame(): void {
        this.usersDataStreamService.players = [];
        this.gameService.logScores = [];
    }

    winAlert(playerNumber: number): void {
        this.winner = JSON.stringify(this.players[playerNumber][0]);
    }

    checkWinner(): boolean {
        return this.winner !== '';
    }

    
}
