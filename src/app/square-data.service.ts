import { Square } from './squareClass';

export class SquareDataService{

  public squares: Square[][] = [];

  public stepCounter: number = 0;
  
  public possibleSteps: number = 0;

  public log: Square[] = [];

  public returnedSquare: Square;

  public SIZE: number = 9;

  constructor(){


    for (let i = 0; i < this.SIZE; i++) {
      this.squares[i] = new Array(this.SIZE);
      
      for (let j = 0; j < this.SIZE; j++) {
          this.squares[i][j] = new Square(i, j);
      }
    }
  }

  showData(data:Square){
    console.log(data);
  }
  
  squaresLeft():number{
    let counter: number = 0;
    for (let i = 0; i < this.SIZE; i++) {
      for (let j = 0; j < this.SIZE; j++) {
        if(this.squares[i][j].isDone === false){
          counter++;
        }
      }    
    }
    return counter;
  }

  stepBack(){
    if (this.stepCounter > 1) {

      for (let i = 0; i < this.SIZE; i++) {
        for (let j = 0; j < this.SIZE; j++) {
          if(this.squares[i][j].isCurrent === true) {
            this.squares[i][j].isCurrent = false;
            this.squares[i][j].isUnplayable = false;
            this.squares[i][j].isPlayable = true;
            this.squares[i][j].isDone = false;
            this.squares[i][j].step = 0;
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
      this.squareClick(this.log[this.log.length - 1]);
    }
  }

  reset(){
    for (let i = 0; i < this.SIZE; i++) {
      for (let j = 0; j < this.SIZE; j++) {
        this.squares[i][j].isDone = false;
        this.squares[i][j].isCurrent = false;
        this.squares[i][j].step = 0;
        this.squares[i][j].isUnplayable = false;
        this.squares[i][j].isPlayable = false;
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

  squareClick(square: Square):void{

    this.possibleSteps = 0;

    for (let i = 0; i < this.SIZE; i++) {
      for (let j = 0; j < this.SIZE; j++) {
        this.squares[i][j].isPlayable = false;
        this.squares[i][j].isCurrent = false;
        this.squares[i][j].isUnplayable = false;
      }    
    }

    if(square.isDone === false){
        square.step = ++this.stepCounter;
        square.isCurrent = true;
        square.isDone = true;
    } 

    console.log('x' + square.coordinateX, 'y' + square.coordinateY);
      if (square.coordinateX - 1 >= 0 && square.coordinateY - 2 >= 0
        && this.squares[square.coordinateX - 1][square.coordinateY - 2].isDone === false){
        this.possibleSteps++;
        this.squares[square.coordinateX - 1][square.coordinateY - 2].isPlayable = true;
    }if (square.coordinateX + 1 < this.SIZE  && square.coordinateY - 2 >= 0
      && this.squares[square.coordinateX + 1][square.coordinateY - 2].isDone === false){
        this.possibleSteps++;
        this.squares[square.coordinateX + 1][square.coordinateY - 2].isPlayable = true;
    }if (square.coordinateX - 2 >= 0 && square.coordinateY - 1 >= 0
      && this.squares[square.coordinateX - 2][square.coordinateY - 1].isDone === false){
        this.possibleSteps++;
        this.squares[square.coordinateX - 2][square.coordinateY - 1].isPlayable = true;
    }if (square.coordinateX + 2 < this.SIZE && square.coordinateY - 1 >= 0
      && this.squares[square.coordinateX + 2][square.coordinateY - 1].isDone === false){
        this.possibleSteps++;
        this.squares[square.coordinateX + 2][square.coordinateY - 1].isPlayable = true;
    }if (square.coordinateX - 2 >= 0 && square.coordinateY + 1 < this.SIZE
      && this.squares[square.coordinateX - 2][square.coordinateY + 1].isDone === false){
        this.possibleSteps++;
        this.squares[square.coordinateX - 2][square.coordinateY + 1].isPlayable = true;
    }if (square.coordinateX + 2 < this.SIZE && square.coordinateY + 1 < this.SIZE
      && this.squares[square.coordinateX + 2][square.coordinateY + 1].isDone === false){
        this.possibleSteps++;
        this.squares[square.coordinateX + 2][square.coordinateY + 1].isPlayable = true;
    }if (square.coordinateX - 1 >= 0 && square.coordinateY + 2 < this.SIZE
      && this.squares[square.coordinateX - 1][square.coordinateY + 2].isDone === false){
        this.possibleSteps++;
        this.squares[square.coordinateX - 1][square.coordinateY + 2].isPlayable = true;
    }if (square.coordinateX + 1 < this.SIZE && square.coordinateY + 2 < this.SIZE
      && this.squares[square.coordinateX + 1][square.coordinateY + 2].isDone === false){
        this.possibleSteps++;
        this.squares[square.coordinateX + 1][square.coordinateY + 2].isPlayable = true;
    }
    

    for (let i = 0; i < this.SIZE; i++) {
      for (let j = 0; j < this.SIZE; j++) {

        if(this.squares[i][j].isPlayable === false){
          this.squares[i][j].isUnplayable = true;
        }  
      }    
    }

    if(this.stepCounter === this.SIZE*this.SIZE){
      setTimeout(this.winMessage, 0);
    }

    if(this.possibleSteps === 0 && this.stepCounter !== this.SIZE*this.SIZE){
      setTimeout(this.loseMessage, 0);
    }
  }
}