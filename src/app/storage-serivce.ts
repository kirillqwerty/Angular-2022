import { Injectable, OnInit } from "@angular/core";
import { Player } from "./facades/player";
@Injectable()
export class StorageService {
    constructor(){}

    set(data: string[]): void{
        sessionStorage.setItem(JSON.stringify(sessionStorage.length), JSON.stringify(data));
    }

    get(key: string) {        
        return JSON.parse(sessionStorage.getItem(key) || '{}');
    }

    getAll(){
        
        let values = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            values.push(sessionStorage[i]);
        }

        return values;
    }

    deleteItem(index: number){
        sessionStorage.removeItem(JSON.stringify(index));
    }

    clear(){
        sessionStorage.clear();
    }
}