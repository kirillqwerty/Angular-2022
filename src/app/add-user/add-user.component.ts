import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../facades/player';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../storage-serivce';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent{

  //нам не нужен здесь массив игрков, можем передавать по одному!!!!!
  constructor(private storageService: StorageService) { }

  playerForm: any = {
    nickName: '',
    eMail: '',
  }

  addUser(){
    this.storageService.set([this.playerForm.nickName, this.playerForm.eMail, sessionStorage.length]);
    console.log(sessionStorage);
  }

}
