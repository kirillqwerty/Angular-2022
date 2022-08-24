export class PlayerBalance{
    stepNumber: number;
    scoresRemain: number[];

    constructor(stepNumber:number, scoresRemain: number[])
    {
        this.stepNumber = stepNumber;
        this.scoresRemain = scoresRemain;
    }
}