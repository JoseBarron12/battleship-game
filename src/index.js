import { display } from "./display"
import { Gameboard } from "./gameboard";
import "./styles.css"

display.gameboard(document.querySelector(".game-board"));
display.initialScreen(document.querySelector(".opponent-board"));

display.gamePieces(document.querySelector(".hit-pieces"),true);
display.gamePieces(document.querySelector(".miss-pieces"), false);


const playerGameBoard = new Gameboard();

console.log(playerGameBoard);

const opponentGameBoard = new Gameboard();
opponentGameBoard.placeRandomPieces();

console.log(opponentGameBoard);

export{playerGameBoard, opponentGameBoard}
