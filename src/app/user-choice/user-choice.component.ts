import { Component, OnInit } from '@angular/core';
import { Player } from '../facades/player';
import { StorageService } from '../storage-serivce';
@Component({
  selector: 'app-user-choice',
  templateUrl: './user-choice.component.html',
  styleUrls: ['./user-choice.component.css']
})
export class UserChoiceComponent{

  constructor(private readonly storageService: StorageService) { }

  getNumberOfPlayers(){
    return sessionStorage.length;
  }
}
