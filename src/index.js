import { display } from "./display"
import "./styles.css"

display.gameboard(document.querySelector(".game-board"));
display.initialScreen(document.querySelector(".opponent-board"));
//display.gameboard(document.querySelector(".opponent-board"), true)

display.gamePieces(document.querySelector(".hit-pieces"),true);
display.gamePieces(document.querySelector(".miss-pieces"), false);

const hitPieces = document.querySelector(".hit-pieces");
console.log(hitPieces.children.length);

const missPieces = document.querySelector(".miss-pieces");
console.log(missPieces.children.length);