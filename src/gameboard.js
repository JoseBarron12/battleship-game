import { Ship } from "./ship";

const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * max);
}

const nameOfShips = ["destroyer", "submarine", "cruiser", "battleship", "carrier"];

const directions = ["left", "right", "up", "down"];


export class Gameboard {
    constructor() {
        this._gameboard = new Array(10);
        for(let i = 0; i < this._gameboard.length; i++) {
            this._gameboard[i] = new Array(10).fill(false);
        }

        this._fleetOfShips = {};
        this._fleetOfShips["destroyer"] = new Ship(2);
        this._fleetOfShips["submarine"] = new Ship(3);
        this._fleetOfShips["cruiser"] = new Ship(3);
        this._fleetOfShips["battleship"] = new Ship(4);
        this._fleetOfShips["carrier"] = new Ship(5);
        
        this._missedAttacks = 0;

    }

    get gameboard() { return this._gameboard; }
    set gameboard(newBoard) { this._gameboard = newBoard; }
    
    get fleetOfShips() { return this._fleetOfShips; }

    get missedAttacks() { return this._missedAttacks; }
    set missedAttacks(newAmt) { this._missedAttacks = newAmt; }

    placeGameboardPiece(initX, finalX, initY, finalY, shipName, dir) {
        if(initY === finalY) // x-direction placement
        {   
            for(let i = initX; i <= finalX; i++)
            {
                this.gameboard[initY][i] = shipName + '-' + dir;
            }
        }
        else // y-direction placement
        {
            for(let i = initY; i <= finalY; i++)
            {
                this.gameboard[i][initX] = shipName + '-' + dir;
            }
        }
    }
    
    isGameboardEmpty(initX, finalX, initY, finalY)
    {
        if(initY == finalY) // x-direction check
        {   
            for(let x = initX; x <= finalX; x++)
            {
                if(this.gameboard[initY][x] != false)
                {
                    return false;
                }
            }
        }
        else // y-direction check
        {
            for(let y = initY; y <= finalY; y++)
            {
                if(this.gameboard[y][initX] != false)
                {
                    return false;
                }
            }
        }
        return true;
    }

    isGameTileEmpty(x, y) { return this.gameboard[y][x] == false; }

    placeShip(nameOfShip, x, y, direction) {
        if(typeof nameOfShip != "string") return false;
        if(this.fleetOfShips[nameOfShip.toLowerCase()] == undefined) return false;
        
        if(this.fleetOfShips[nameOfShip.toLowerCase()].placed == true) return false;

        if(typeof x != "number" || typeof y != "number") return false
        if(x < 0 || x > 9 || y < 0 || y > 9) return false;
        
        if(typeof direction != "string") return false;
        
        const dir = direction.toLowerCase();
        if(dir != 'up' && dir != 'down' && dir != 'left' && dir != 'right') return false;

        // Starting position is included in length
        const shipLength = this.fleetOfShips[nameOfShip.toLowerCase()].length - 1;
        
        switch(dir) {
            case "up": 
                if(y + shipLength > 9 || !this.isGameboardEmpty(x, x, y, y + shipLength)) return false;
                this.placeGameboardPiece(x, x, y, y + shipLength, nameOfShip.toLowerCase(), direction);
                break;
            case "down":
                if(y - shipLength < 0 || !this.isGameboardEmpty(x, x, y - shipLength, y )) return false;
                this.placeGameboardPiece(x, x, y - shipLength, y, nameOfShip.toLowerCase(), direction);
                break;
            case "left":
                if(x - shipLength < 0 || !this.isGameboardEmpty(x - shipLength, x, y, y)) return false;
                this.placeGameboardPiece(x - shipLength, x,  y, y, nameOfShip.toLowerCase(), direction);
                break;
            case "right":
                if(x + shipLength > 9 || !this.isGameboardEmpty(x, x + shipLength, y, y)) return false
                this.placeGameboardPiece(x, x + shipLength, y, y, nameOfShip.toLowerCase(), direction);
                break;
        }

        this.fleetOfShips[nameOfShip.toLowerCase()].placed = true;

        return true;
    }

    receiveAttack(x, y)  {
        if(typeof x != "number" || typeof y != "number") return false;
        if(x < 0 || x > 9 || y < 0 || y > 9) return false;

        if(this.isGameTileEmpty(x, y)) {
            this.missedAttacks = this.missedAttacks + 1;
        } else {
            const nameOfShip = this.gameboard[y][x].slice(0, this.gameboard[y][x].indexOf('-'));
            this.fleetOfShips[nameOfShip].hit();
        }
        return true;
    }

    areAllShipsPlaced() {
        for(let key in this.fleetOfShips)
        {
            if( !this.fleetOfShips[key].placed) return false;
        }
        return true;
    }

    areAllShipsSunk() {
        for(let key in this.fleetOfShips)
        {
            if( !this.fleetOfShips[key].isSunk()) return false;
        }
        return true;
    }

    clearBoard() {
        for(let i = 0; i < this.gameboard.length; i++ )
        {
            for(let j = 0; j < this.gameboard[0].length; j++ )
            {
                this.gameboard[i][j] = false;
            }
        }
    }

    placeRandomPieces(){
        this.clearBoard();
        
        let arrOfShipsObj = [];
        
        for(let i = 0; i < nameOfShips.length; i++)
        {
            let done = false;
            
            while(!done)
            {
                const x = getRandomNum(0, 10);
                const y = getRandomNum(0, 10);
                const dir = directions[getRandomNum(0, directions.length)];
                const name = nameOfShips[i];

                if(this.placeShip(name, x, y, dir))
                {
                    arrOfShipsObj.push( {
                        shipName: name,
                        coordX: x,
                        coordY: y,
                        direction: dir    
                    })
                    done = true;
                }

            }
        }

        return arrOfShipsObj;
    }



}