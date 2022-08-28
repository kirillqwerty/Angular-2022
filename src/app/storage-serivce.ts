import { Injectable, OnInit } from "@angular/core";
import { Player } from "./facades/player";
@Injectable()
export class StorageService {
    constructor(){}

    public regNumber: number = 0;

    set(data: string[]){
        data.push(JSON.stringify(this.regNumber));        
        console.log(data);
        // sessionStorage.setItem(JSON.stringify(this.regNumber), JSON.stringify(data));
        sessionStorage.setItem(JSON.stringify(this.regNumber++), JSON.stringify(data));
    }

    get(key: string) : boolean{        
        return JSON.parse(sessionStorage.getItem(key) || '{}');
    }

    // checkData(data: string[]){

    //     if (sessionStorage.length === 0) {
    //         return true;
    //     }
    //     for (let i = 0; i < sessionStorage.length; i++) {
    //         for (let j = 0; j < sessionStorage.getItem(JSON.stringify(i))!.length - 1; j++) {
    //             let tmp =  sessionStorage.getItem(JSON.stringify(i));
    //             if(tmp![j] === data[j]){
    //                 return false;
    //             }
    //         }          
    //     }
    //     return true;
    // }

    getAll(){
        
        let values = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            values.push(sessionStorage[i]);
        }

        console.log('keys');

        for(let key in localStorage) {
            if (!localStorage.hasOwnProperty(key)) {
              continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
            }
            console.log(`${key}: ${localStorage.getItem(key)}`);
          }
          

        return values;
    }

    deleteItem(index: number){
        console.log(sessionStorage);
        sessionStorage.removeItem(JSON.stringify(index));
        // console.log(sessionStorage.key((index)));
        console.log(JSON.stringify(index));
        console.log(sessionStorage);
    }

    clear(){
        sessionStorage.clear();
    }
}