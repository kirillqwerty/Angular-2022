export class Square{
    isDone: boolean;
    isCurrent: boolean;
    step: number;
    isUnplayable: boolean;
    isPlayable: boolean;
    coordinateX: number;
    coordinateY: number;
    isStepBacked: boolean;

    constructor(X:number, Y:number){
        this.isDone = false;
        this.isCurrent = false;
        this.step = 0;
        this.isUnplayable = false;
        this.isPlayable = false;
        this.coordinateX = X;
        this.coordinateY = Y;
        this.isStepBacked = false;
    }
}