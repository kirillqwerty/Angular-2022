import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-win-message',
  templateUrl: './win-message.component.html',
  styleUrls: ['./win-message.component.css']
})
export class WinMessageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() winner: string = ''; 

}
