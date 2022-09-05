import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../facades/player';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UsersDataStreamService } from '../users-data-stream-service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{

    public disableButton: boolean = true;

    public wrongInput: boolean = false;

    public addUserForm = this.fb.group({
        nick: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
        email:['']
    })

    constructor(private usersDataStreamService: UsersDataStreamService, 
    private router: Router,
    private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.addUserForm.valueChanges.subscribe(console.log);
    }

    
    addUser(): void {
        if(this.checkCorrectEmail()) {
            if (this.checkUniqueUserNick()) {
                if(this.checkUniqueUserEmail()){
                    this.usersDataStreamService.addPlayer([this.addUserForm.controls.nick.value as string, this.addUserForm.controls.email.value as string]);
                    this.router.navigate(['/choice']);
                }
                else alert("User with this email already exist")            
            }
            else alert("User with this nickname already exist");
            
        }   
        else {
            alert("incorrect inputs");
            this.router.navigate(['']);
        } 
    }

    checkUniqueUserNick(): boolean {
        if (this.usersDataStreamService.players.length !== 0) {
            for (let i = 0; i < this.usersDataStreamService.players.length; i++) {
                if(this.usersDataStreamService.players[i][0] === this.addUserForm.controls.nick.value){
                    return false;
                } 
            }
        }           
        return true;
    }

    checkUniqueUserEmail(): boolean {
        if (this.usersDataStreamService.players.length !== 0) {
            for (let i = 0; i < this.usersDataStreamService.players.length; i++) {
                if(this.usersDataStreamService.players[i][1] === this.addUserForm.controls.email.value || this.addUserForm.controls.email.value !== '' ){
                    return false;
                } 
            }
        }           
        return true;
    }

    checkCorrectEmail(): boolean {
        if(/.+@.+\..+/i.test(this.addUserForm.controls.email.value as string) === true || this.addUserForm.controls.email.value as string === ''){
            return true;
        }
        else return false;
    }

    // checkEmptyInputs(){
    //     if (this.addUserForm.contro === "") {
    //         return true;
    //     }
    //     return false;
    // }

}
