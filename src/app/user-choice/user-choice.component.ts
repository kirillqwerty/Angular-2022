import { Component, OnInit } from '@angular/core';
import { Player } from '../facades/player';
import { UsersDataStreamService } from '../users-data-stream-service';
@Component({
  selector: 'app-user-choice',
  templateUrl: './user-choice.component.html',
  styleUrls: ['./user-choice.component.css']
})
export class UserChoiceComponent implements OnInit{

  constructor(public usersDataStreamService: UsersDataStreamService) { }

  public numberOfPlayers: number[] = [];

  ngOnInit(): void {
    this.numberOfPlayers = [1];
  }

  setUsers(players: string[][]) {
    console.log(players);
  }

}
