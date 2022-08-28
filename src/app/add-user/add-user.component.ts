import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../facades/player';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../storage-serivce';
import { UsersDataStreamService } from '../users-data-stream-service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{


    
  //нам не нужен здесь массив игрков, можем передавать по одному!!!!!
    constructor(private storageService: StorageService, 
      private usersDataStreamService: UsersDataStreamService) { }

    ngOnInit(): void {
      this.storageService.clear();
    }

    public disableButton: boolean = true;

    public wrongInput: boolean = false;

    playerForm: any = {
      nickName: '',
      eMail: '',
    }

    addUser(){
        // console.log([this.playerForm.nickName, this.playerForm.eMail, sessionStorage.length]);
        // if (this.storageService.checkData([this.playerForm.nickName, this.playerForm.eMail, sessionStorage.length]) === true) {
        //     this.storageService.set([this.playerForm.nickName, this.playerForm.eMail]);    
        // } else {
        //     this.wrongInput = false;
        //     alert("wrong user");
        // }
        // this.storageService.set([this.playerForm.nickName, this.playerForm.eMail]); 
        // console.log(sessionStorage);

        this.usersDataStreamService.addPlayer([this.playerForm.nickName, this.playerForm.eMail]);
    }

    checkInputs(){
        if ((<HTMLInputElement>document.getElementById('nickname')).value === "" || 
          (<HTMLInputElement>document.getElementById('email')).value === "") {
            this.disableButton = true;
        }

        else this.disableButton = false;
    }

}
