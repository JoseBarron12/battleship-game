import { Gameboard } from "./gameboard";

export class Player{
    constructor(playerNum, name) {
        if(typeof playerNum != "number") throw new TypeError("Expected number for playerNumber");
        if(typeof name != "string" && typeof name != "undefined") throw new TypeError("Expected string for playerName")
        
        this._num = playerNum;
        this._name = (name != undefined) ? name : "computer";
        this._gameboard = new Gameboard();
    }

    get number() { return this._num; }
    get name() { return this._name; }
    get gameboard() { return this._gameboard; }
}