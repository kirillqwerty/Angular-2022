import { Component, Input, OnInit, Output } from '@angular/core';
import { MenuBarBtnService } from '../menu-bar-btn-service';
@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor(private readonly menuBarBtnService: MenuBarBtnService) { }

  @Input() squaresNumber: number;

  // isToggled: boolean;

  ngOnInit(): void {  
  }

  stepBackToggle(): void {
    // this.isToggled = true;
    this.menuBarBtnService.stepBackIsToggled(true);
  }

  resetToggle(): void{
    this.menuBarBtnService.resetIsToggled(true);
  }
}
