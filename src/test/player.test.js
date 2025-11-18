import { Gameboard } from "../gameboard";
import { Player } from "../player";

test("initializing player object with non-number input for player", () => {
    expect(() => new Player("yuh")).toThrow("Expected number for playerNumber")
});

test("initializing player object with non-string input for playerName", () => {
    expect(() => new Player(2, 4)).toThrow("Expected string for playerName");
});

test("initializing player object with non-string input for playerName", () => {
    expect(() => new Player(2, 4)).toThrow("Expected string for playerName");
});

test("number getter ", () => {
    expect(new Player(2, "george").number).toBe(2);
});

test("name getter with string input", () => {
    expect(new Player(2, "george").name).toBe("george");
});

test("name getter with non-string input", () => {
    expect(new Player(2).name).toBe("computer");
});

test("gameboard getter is gameboard class object", () => {
    expect(new Player(2).gameboard).toEqual( new Gameboard());
});





