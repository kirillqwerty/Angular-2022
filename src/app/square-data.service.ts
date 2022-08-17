import { Square } from './squareClass';

export class SquareDataService{

  public squares: Square[][] = [];

  public stepCounter: number = 0;
  
  public possibleSteps: number = 0;

  public log: Square[] = [];

  public returnedSquare: Square;

  constructor(){

    const SIZE: number = 9;

    for (let i = 0; i < SIZE; i++) {
      this.squares[i] = new Array(SIZE);
      
      for (let j = 0; j < SIZE; j++) {
          this.squares[i][j] = new Square(i, j);
      }
    }
  }

  showData(data:Square){
    console.log(data);
  }
  
  squaresLeft(data:Square[][], SIZE: number):number{
    let counter: number = 0;
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if(data[i][j].isDone === false){
          counter++;
        }
      }    
    }
    return counter;
  }

  stepBack(data:Square[][], SIZE: number){
    if (this.stepCounter > 1) {

      for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
          if(data[i][j].isCurrent === true) {
            data[i][j].isCurrent = false;
            data[i][j].isUnplayable = false;
            data[i][j].isPlayable = true;
            data[i][j].isDone = false;
            data[i][j].step = 0;
          }       
        }    
      }
      this.log.pop();
      this.stepCounter -= 2;
      this.log[this.log.length - 1].isDone = false;
      this.log[this.log.length - 1].isCurrent = true;
      this.log[this.log.length - 1].isPlayable = false;
      this.log[this.log.length - 1].isUnplayable = true;
      this.log[this.log.length - 1].step--;
      this.squareClick(data, 9, this.log[this.log.length - 1]);
    }
  }

  reset(data:Square[][], SIZE: number){
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        data[i][j].isDone = false;
        data[i][j].isCurrent = false;
        data[i][j].step = 0;
        data[i][j].isUnplayable = false;
        data[i][j].isPlayable = false;
        }                
      }
    
    this.stepCounter = 0;
  }

  pushToSquareStack(square: Square){
    this.log.push(square);
  }

  winMessage(){
    alert('you won')
  }

  loseMessage(){
    alert('you lose')
  }

  squareClick(data:Square[][], SIZE: number, square: Square):void{

    this.possibleSteps = 0;

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        data[i][j].isPlayable = false;
        data[i][j].isCurrent = false;
        data[i][j].isUnplayable = false;
      }    
    }

    if(square.isDone === false){
        square.step = ++this.stepCounter;
        square.isCurrent = true;
        square.isDone = true;
    } 

    console.log('x' + square.coordinateX, 'y' + square.coordinateY);
      if (square.coordinateX - 1 >= 0 && square.coordinateY - 2 >= 0
        && data[square.coordinateX - 1][square.coordinateY - 2].isDone === false){
        this.possibleSteps++;
        data[square.coordinateX - 1][square.coordinateY - 2].isPlayable = true;
    }if (square.coordinateX + 1 < SIZE  && square.coordinateY - 2 >= 0
      && data[square.coordinateX + 1][square.coordinateY - 2].isDone === false){
        this.possibleSteps++;
        data[square.coordinateX + 1][square.coordinateY - 2].isPlayable = true;
    }if (square.coordinateX - 2 >= 0 && square.coordinateY - 1 >= 0
      && data[square.coordinateX - 2][square.coordinateY - 1].isDone === false){
        this.possibleSteps++;
        data[square.coordinateX - 2][square.coordinateY - 1].isPlayable = true;
    }if (square.coordinateX + 2 < SIZE && square.coordinateY - 1 >= 0
      && data[square.coordinateX + 2][square.coordinateY - 1].isDone === false){
        this.possibleSteps++;
        data[square.coordinateX + 2][square.coordinateY - 1].isPlayable = true;
    }if (square.coordinateX - 2 >= 0 && square.coordinateY + 1 < SIZE
      && data[square.coordinateX - 2][square.coordinateY + 1].isDone === false){
        this.possibleSteps++;
        data[square.coordinateX - 2][square.coordinateY + 1].isPlayable = true;
    }if (square.coordinateX + 2 < SIZE && square.coordinateY + 1 < SIZE
      && data[square.coordinateX + 2][square.coordinateY + 1].isDone === false){
        this.possibleSteps++;
        data[square.coordinateX + 2][square.coordinateY + 1].isPlayable = true;
    }if (square.coordinateX - 1 >= 0 && square.coordinateY + 2 < SIZE
      && data[square.coordinateX - 1][square.coordinateY + 2].isDone === false){
        this.possibleSteps++;
        data[square.coordinateX - 1][square.coordinateY + 2].isPlayable = true;
    }if (square.coordinateX + 1 < SIZE && square.coordinateY + 2 < SIZE
      && data[square.coordinateX + 1][square.coordinateY + 2].isDone === false){
        this.possibleSteps++;
        data[square.coordinateX + 1][square.coordinateY + 2].isPlayable = true;
    }
    

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {

        if(data[i][j].isPlayable === false){
          data[i][j].isUnplayable = true;
        }  
      }    
    }

    if(this.stepCounter === SIZE*SIZE){
      this.winMessage();
    }

    if(this.possibleSteps === 0){
      this.loseMessage();
    }
  }
}