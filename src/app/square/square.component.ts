import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { bufferToggle } from 'rxjs';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { MenuBarBtnService } from '../menu-bar-btn-service';
import { SquareDataService } from '../square-data.service';
import { Square } from '../squareClass';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css'],
  providers: [SquareDataService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquareComponent implements OnInit{


  clicked: boolean = false;

  items: Square[][] = [];
  constructor(private squareDataService: SquareDataService, 
    private sdr: ChangeDetectorRef, 
    private readonly menuBarBtnService: MenuBarBtnService) {}
  
  ngOnInit(){
    this.items = this.squareDataService.squares;
    this.menuBarBtnService.stepBackIsToggled$.subscribe(() => this.stepBack());
    this.menuBarBtnService.resetIsToggled$.subscribe(() => this.reset());
  }

  isClicked(){
    this.clicked = !this.clicked;
  }

  showSteps(square: Square){
    this.squareDataService.squareClick(this.items, 9, square);
    this.squareDataService.pushToSquareStack(square);
    this.sdr.detectChanges;
    console.log(this.items);
  }    

  stepBack(){
    this.squareDataService.stepBack(this.items, 9);
  }
  
  reset(){
    this.squareDataService.reset(this.items, 9);
  }

  showLeftSquares():number{
    return this.squareDataService.squaresLeft(this.items, 9);
  }

}
