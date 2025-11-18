export class Ship {
    constructor(length)
    {
        if(typeof length != "number") throw new TypeError("Expected number for length");
        if(length < 1) throw new error("Expected length greater than or equal to one");
        this._length = length;
        this._hits = 0;
        this._sunk = false;
        this._placed = false;
    }

    get length() { return this._length; }
   
    get hits() { return this._hits; }
    set hits(newHits) { this._hits = newHits;}

    get placed() { return this._placed; }
    set placed(newFlag) { this._placed = newFlag; }

    hit() { this.hits = this.hits + 1; }
    isSunk() { return this.length == this.hits }

}