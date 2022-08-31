import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../facades/player';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { UsersDataStreamService } from '../users-data-stream-service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent{

    constructor(private usersDataStreamService: UsersDataStreamService,
        private router: Router) { }

    public disableButton: boolean = true;

    public wrongInput: boolean = false;

    playerForm: any = {
      nickName: '',
      eMail: '',
    }

    regUser!: FormGroup;

    addUser(){
        if(this.checkCorrectEmail()) {
            if (this.checkUniqueUser()) {
                this.usersDataStreamService.addPlayer([this.playerForm.nickName, this.playerForm.eMail]);
                this.router.navigate(['/choice']);
            }
            else alert("user already exist");
            
        }   
        else {
            alert("incorrect inputs");
            this.router.navigate(['']);
        } 
    }

    checkUniqueUser(){
        if (this.usersDataStreamService.players.length !== 0) {
            for (let i = 0; i < this.usersDataStreamService.players.length; i++) {
                if(this.usersDataStreamService.players[i][0] === this.playerForm.nickName ||
                     this.usersDataStreamService.players[i][1] === this.playerForm.email){
                    return false;
                } 
            }
        }           
        return true;
    }

    checkCorrectEmail(){
        if(/.+@.+\..+/i.test(this.playerForm.eMail) === true || this.playerForm.eMail === ''){
            return true;
        }
        else return false;
    }

    checkEmptyInputs(){
        if (this.playerForm.nickName === "") {
            return true;
        }

        return false;
    }

}
