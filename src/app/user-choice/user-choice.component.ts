import { Component, OnInit } from "@angular/core";
import { UsersDataStreamService } from "../users-data-stream-service";
@Component({
    selector: "app-user-choice",
    templateUrl: "./user-choice.component.html",
    styleUrls: ["./user-choice.component.css"]
})
export class UserChoiceComponent implements OnInit{

    public numberOfPlayers: number[] = [];

    constructor(public usersDataStreamService: UsersDataStreamService) { }

    public ngOnInit(): void {
        this.numberOfPlayers = [1];
    }

    public setUsers(players: string[][]): void{
        console.log(players);
    }

}
