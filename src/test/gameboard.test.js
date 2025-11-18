import { Gameboard } from "../gameboard";
import { Ship } from "../ship";

describe('initialized gameboard array', () => {
    const gameboardTest = new Gameboard();
    
    test('gameboard array row length is 10', () => {
        expect(gameboardTest.gameboard.length).toBe(10);
    });
    test('gameboard array column length is 10', () => {
        expect(gameboardTest.gameboard[9].length).toBe(10);
    });
    test('gameboard array filled with false', () => {
        const gameBoard = new Array(10);
        for(let i = 0; i < gameBoard.length; i++) {
            gameBoard[i] = new Array(10).fill(false);
        }

        expect(gameboardTest.gameboard).toEqual(gameBoard);
    });
});

describe('initialized gameboard pieces object', () => {
    const gameboardTest = new Gameboard();
    
    test('gameboard pieces object is battleship fleet ', () => {
        const fleet = {
            destroyer: new Ship(2),
            submarine: new Ship(3),
            cruiser: new Ship(3),
            battleship: new Ship(4),
            carrier: new Ship(5)
        }
        expect(gameboardTest.fleetOfShips).toEqual(fleet);
    });

    test('gameboard pieces ships not placed initially', () => {
        expect(gameboardTest.fleetOfShips["destroyer"].placed).toBeFalsy();
        expect(gameboardTest.fleetOfShips["submarine"].placed).toBeFalsy();
        expect(gameboardTest.fleetOfShips["cruiser"].placed).toBeFalsy();
        expect(gameboardTest.fleetOfShips["battleship"].placed).toBeFalsy();
        expect(gameboardTest.fleetOfShips["carrier"].placed).toBeFalsy();
    });
});

describe('placeShip() method' , () => {
    const gameboardTestShip = new Gameboard();

    test('calling function with unrecognized ship name', () => {
        expect(gameboardTestShip.placeShip("random name")).toBeFalsy();
    });

    test('calling function with recognized lowercase ship name', () => {
        expect(gameboardTestShip.placeShip("destroyer", 4, 6, "left")).toBeTruthy();
        expect(gameboardTestShip.placeShip("carrier", 4, 7 , "left")).toBeTruthy();
    });

    test('calling function with recognized uppercase ship name', () => {
        expect(gameboardTestShip.placeShip("BattleShip", 4, 8, "left")).toBeTruthy();
        expect(gameboardTestShip.placeShip("SubMarIne", 4, 2, "left")).toBeTruthy();
        expect(gameboardTestShip.placeShip("CRUISER", 4, 3, "left")).toBeTruthy();
    });

    test('placing a legal ship changes ship to placed', () => {
        expect(gameboardTestShip.fleetOfShips["destroyer"].placed).toBeTruthy();
        expect(gameboardTestShip.fleetOfShips["cruiser"].placed).toBeTruthy();
    });

    const gameboardTest = new Gameboard();
    
    test('calling function with out of bounds x coordinate', () => {
        expect(gameboardTest.placeShip("destroyer", -1, 6)).toBeFalsy();
        expect(gameboardTest.placeShip("destroyer", 10, 6)).toBeFalsy();
    });

    test('calling function with out of bounds y coordinate', () => {
        expect(gameboardTest.placeShip("destroyer", 9, -6)).toBeFalsy();
        expect(gameboardTest.placeShip("destroyer", 0, 11)).toBeFalsy();
    });

    test('calling function with non-number coordinate', () => {
        expect(gameboardTest.placeShip("destroyer", "9", 6)).toBeFalsy();
        expect(gameboardTest.placeShip("destroyer", 0, "number")).toBeFalsy();
    });

    test('calling function with out of bounds y coordinate', () => {
        expect(gameboardTest.placeShip("destroyer", 9, -6)).toBeFalsy();
        expect(gameboardTest.placeShip("destroyer", 0, 11)).toBeFalsy();
    });

    test('calling function with unrecognized direction', () => {
        expect(gameboardTest.placeShip("destroyer", 9, 0, 78)).toBeFalsy();
        expect(gameboardTest.placeShip("destroyer", 3, 6, "yup")).toBeFalsy();
    });

    test('calling function with recognized lowercase direction', () => {
        expect(gameboardTest.placeShip("destroyer", 9, 0, "left")).toBeTruthy();
    });

    test('calling function with recognized lowercase direction', () => {
        expect(gameboardTest.placeShip("cruiser", 3, 6, "DowN")).toBeTruthy();
    });
    
    test('placing a legal ship changes ship to placed', () => {
        expect(gameboardTest.fleetOfShips["destroyer"].placed).toBeTruthy();
        expect(gameboardTest.fleetOfShips["submarine"].placed).toBeFalsy();
        expect(gameboardTest.fleetOfShips["cruiser"].placed).toBeTruthy();
        expect(gameboardTest.fleetOfShips["battleship"].placed).toBeFalsy();
        expect(gameboardTest.fleetOfShips["carrier"].placed).toBeFalsy();
    });

    test('calling function with illegal y coordinate move', () => {
        expect(gameboardTest.placeShip("destroyer", 9, 9, "UP")).toBeFalsy();
        expect(gameboardTest.placeShip("destroyer", 0, 0, "DowN")).toBeFalsy();
    });

    test('calling function with illegal x coordinate move', () => {
        expect(gameboardTest.placeShip("destroyer", 0, 0, "left")).toBeFalsy();
        expect(gameboardTest.placeShip("destroyer", 9, 6, "right")).toBeFalsy();
    });

    test('calling function with already placed piece', () => {
        expect(gameboardTest.placeShip("destroyer", 9, 0, "left")).toBeFalsy();
        expect(gameboardTest.placeShip("cruisER", 3, 6, "DowN")).toBeFalsy();
    });

    test('placing piece on already placed gameboard tile', () => {
        expect(gameboardTest.placeShip("battleship", 9, 0, "left")).toBeFalsy();
        expect(gameboardTest.placeShip("carrier", 0, 6, "right")).toBeFalsy();
    });

});


describe("receiveAttack()method", () => {
    const gameboardTest = new Gameboard();
    
    test("calling function with non-number input return false", () => {
        expect(gameboardTest.receiveAttack("yuh", null)).toBeFalsy();
        expect(gameboardTest.receiveAttack("yuh", 2)).toBeFalsy();
        expect(gameboardTest.receiveAttack(2, null)).toBeFalsy();
    });

    test("calling function with out of bounds coordinates return false", () => {
        expect(gameboardTest.receiveAttack(10, -10)).toBeFalsy();
        expect(gameboardTest.receiveAttack(4, 10)).toBeFalsy();
        expect(gameboardTest.receiveAttack(9, 23)).toBeFalsy();
    });

    test("missed attack parameter update when attack misses", () => {
        expect(gameboardTest.missedAttacks).toBe(0);
        expect(gameboardTest.receiveAttack(9, 9)).toBeTruthy();
        expect(gameboardTest.missedAttacks).toBe(1);
    });

    test("missed attack parameter remains the same when attack hits", () => {
        gameboardTest.placeShip("destroyer", 9, 0, "left");
        expect(gameboardTest.receiveAttack(9, 0)).toBeTruthy();
        expect(gameboardTest.missedAttacks).toBe(1);
    });

    test("hits parameter of ship update when attack hits", () => {
        expect(gameboardTest.fleetOfShips["destroyer"].hits).toBe(1);
        expect(gameboardTest.receiveAttack(8, 0)).toBeTruthy();
        expect(gameboardTest.fleetOfShips["destroyer"].hits).toBe(2);
    });
    
    test("sunk method of ship update when attack hits", () => {
        expect(gameboardTest.fleetOfShips["destroyer"].isSunk()).toBeTruthy();
    });
});

describe("areAllShipsSunk() method", () => {
    const gameboardTest = new Gameboard();
    
    test("no ships placed on board method is false", () => {
        expect(gameboardTest.areAllShipsSunk()).toBeFalsy();
    });
    
    test("ships placed on board but not sunk method is false", () => {
        expect(gameboardTest.placeShip("destroyer", 9, 0, "left")).toBeTruthy();
        expect(gameboardTest.placeShip("submarine", 1, 0, "right")).toBeTruthy();
        expect(gameboardTest.placeShip("cruiser", 9, 9, "down")).toBeTruthy();
        expect(gameboardTest.placeShip("battleship", 2, 4, "up")).toBeTruthy();
        expect(gameboardTest.placeShip("carrier", 4, 7, "right")).toBeTruthy();

        expect(gameboardTest.areAllShipsPlaced()).toBeTruthy();

        expect(gameboardTest.areAllShipsSunk()).toBeFalsy();
    }); 
    
    test("all ships placed on board sunk method is true", () => {
       // Destroyer succesful hits
        gameboardTest.receiveAttack(9, 0);
        gameboardTest.receiveAttack(8, 0);
        gameboardTest.receiveAttack(7, 0); 
        
        // Submarine successful hits
        gameboardTest.receiveAttack(1, 0);
        gameboardTest.receiveAttack(2, 0);
        gameboardTest.receiveAttack(3, 0);
        
        // Cruiser succesful hits
        gameboardTest.receiveAttack(9, 9);
        gameboardTest.receiveAttack(9, 8);
        gameboardTest.receiveAttack(9, 7);

        // Battleship succesful hits
        gameboardTest.receiveAttack(2, 4);
        gameboardTest.receiveAttack(2, 5);
        gameboardTest.receiveAttack(2, 6);
        gameboardTest.receiveAttack(2, 7);

        // Carrier succesful hits
        gameboardTest.receiveAttack(4, 7);
        gameboardTest.receiveAttack(5, 7);
        gameboardTest.receiveAttack(6, 7);
        gameboardTest.receiveAttack(7, 7);
        gameboardTest.receiveAttack(8, 7);
        
        expect(gameboardTest.areAllShipsSunk()).toBeTruthy();
    });


});




