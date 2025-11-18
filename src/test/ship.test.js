import { Ship } from "../ship";

test('initializing ship object with non-number input', () => {
    expect(() => new Ship("length").toThrow("Expected number for length"));
});

test('initializing ship object with length of zero', () => {
    expect(() => new Ship(0).toThrow("Expected length greater than or equal to one"));
});

test('initializing ship object with negative length ', () => {
    expect(() => new Ship(-1).toThrow("Expected length greater than or equal to one"));
});

describe('ship object with length of three', () => {
    const shipTestObj = new Ship(3);

    test('length getter', () => {
        expect(shipTestObj.length).toEqual(3);
    });

    test('hit getter', () => {
        expect(shipTestObj.hits).toEqual(0);
    });

    test('checking if sunk without hitting ship ', () => {
        expect(shipTestObj.isSunk()).toBeFalsy();
    });

    test('hit getter after hitting twice', () => {
        shipTestObj.hit();
        shipTestObj.hit();
        expect(shipTestObj.hits).toEqual(2);
    });
    
    test('checking if sunk with hitting ship twice', () => {
        expect(shipTestObj.isSunk()).toBeFalsy();
    });

    test('checking if sunk with hitting ship thrice', () => {
        shipTestObj.hit();
        expect(shipTestObj.isSunk()).toBeTruthy();
    });
});



