import { display } from "./display"
import { Gameboard } from "./gameboard";
import "./styles.css"

display.gameboard(document.querySelector(".game-board"));
display.initialScreen(document.querySelector(".opponent-board"));

display.gamePieces(document.querySelector(".hit-pieces"),true);
display.gamePieces(document.querySelector(".miss-pieces"), false);

const playerGameBoard = new Gameboard();

const oppGameBoard = new Gameboard();
oppGameBoard.placeRandomPieces();

console.log(oppGameBoard);

export{playerGameBoard, oppGameBoard}
