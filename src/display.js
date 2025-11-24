import { functionality } from "./functionality";
import { Gameboard } from "./gameboard";
import carrierImg from "./images/carrier-piece.svg"
import battleshipImg from "./images/battleship-piece.svg"
import submarineImg from "./images/submarine-piece.svg"
import destroyerImg from "./images/destroyer-piece.svg"

const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * max);
}

const battleshipPieces = {
    carrier: carrierImg,
    battleship: battleshipImg,
    submarine: submarineImg,
    cruiser: submarineImg,
    destroyer: destroyerImg
}

const createSVG = ({ className, viewBox, pathD, titleText }) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("viewBox", viewBox);
  if (className) svg.classList.add(...className.split(" "));

  // Add <title> for accessibility
  if (titleText) {
    const title = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "title",
    );
    title.textContent = titleText;
    svg.appendChild(title);
  }

  // Add <path>
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathD);
  svg.appendChild(path);

  return svg;
};






export const display = (function() {
    const initialScreen = (parent) => {
        const screen = document.createElement("div");
        screen.classList.add("welcome-screen");
        parent.appendChild(screen);
        
        const header = document.createElement("h1");
        header.classList.add("welcome-header");
        header.textContent = "Welcome to Battleship"
        screen.appendChild(header);

        const btn = document.createElement("button");
        btn.classList.add("start-game-btn");
        btn.textContent = "Start New Game";
        screen.appendChild(btn);

        functionality.startGameBtn(btn, parent);

        const help = document.createElement("p");
        help.classList.add("help-desc");
        help.textContent = "How to play?"
        screen.appendChild(help);
    }

    const selectScreen = (parent) => {
        const screen = document.createElement("div");
        screen.classList.add("select-screen");
        parent.appendChild(screen);

        const header = document.createElement("h2");
        header.classList.add("welcome-header");
        header.textContent = "Make Your Selections"
        screen.appendChild(header); 

        const form = document.createElement("form");
        form.classList.add("input-ships");
        screen.appendChild(form);

        const shipNames = ["carrier", "battleship", "submarine", "cruiser", "destroyer"];


        for(let i = 0; i < 5; i++)
        {
            const field = document.createElement("fieldset");
            field.classList.add(`${shipNames[i]}-fieldset`);
            form.appendChild(field);

            const legend = document.createElement('legend');
            legend.textContent = "[Select Coordinates] " + shipNames[i].charAt(0).toUpperCase() + shipNames[i].slice(1) + ":";
            field.append(legend);

            const labelX =  document.createElement('label');
            labelX.setAttribute("for", `${shipNames[i]}-x`);
            labelX.textContent = "X:"
            field.append(labelX);

            const selectX =  document.createElement("select");
            selectX.setAttribute("id", `${shipNames[i]}-x`);

            for(let j = 0; j < 10; j++)
            {
                const option = document.createElement("option");
                option.textContent = j + 1;
                option.setAttribute("value",`${j}`);
                selectX.appendChild(option);
            }
            
            field.appendChild(selectX);

            const labelY =  document.createElement('label');
            labelY.setAttribute("for", `${shipNames[i]}-y`);
            labelY.textContent = "Y:"
            field.append(labelY);

            const selectY =  document.createElement("select");
            selectY.setAttribute("id", `${shipNames[i]}-y`);

            const letters = "ABCDEFGHIJ";

            for(let j = 0; j < 10; j++)
            {
                const option = document.createElement("option");
                option.textContent = letters[j];
                option.setAttribute("value",`${j}`);
                selectY.appendChild(option);
            }
            field.appendChild(selectY);

            const labelDir =  document.createElement('label');
            labelDir.setAttribute("for", `${shipNames[i]}-dir`);
            labelDir.textContent = "Direction:"
            field.append(labelDir);

            const directions = ["up", "down", "left", "right"];

            const selectDir=  document.createElement("select");
            selectDir.setAttribute("id", `${shipNames[i]}-dir`);


            for(let j = 0; j < 4; j++)
            {
                const option = document.createElement("option");
                option.textContent = directions[j].charAt(0).toUpperCase() + directions[j].slice(1);
                option.setAttribute("value",`${directions[j]}`);
                selectDir.appendChild(option);
            }

            field.appendChild(selectDir);

        }

        const submitBtn = document.createElement("button");
        submitBtn.classList.add("submit-btn");
        submitBtn.textContent = "Begin Battle"
        form.appendChild(submitBtn);

        functionality.submitShipBtn(submitBtn, form);
    }

    const gameboard = (parent, isOpponent) => {
        let board = parent;
        if(isOpponent)
        {
            parent.replaceChildren();
            board = document.createElement("div");
            board.classList.add("board");
            parent.appendChild(board);
        }
        
        const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

        for(let i = 0; i < 11; i++)
        {
            const row = document.createElement("div");
            row.classList.add("row");
            board.appendChild(row);
            
            if(i == 0) 
            {
                const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                num.forEach((n) => {
                    const column = document.createElement("div");
                    column.classList.add("column");
                    column.classList.add("name");
                    
                    if(n != 0) column.textContent = n;
                        
                    row.appendChild(column);
                    
                });
            }
            else
            {
                for(let j = 0; j < 11; j++)
                {
                    const column = document.createElement("div");
                    column.classList.add("column");
                    row.appendChild(column);

                    if(j == 0) 
                    {
                        column.textContent = `${letters[i - 1]}`;
                        column.classList.add("name")
                    }
                    else
                    {
                        column.classList.add(`tile-${j - 1}-${i - 1}`);

                        const circle = document.createElement("div");
                        circle.classList.add("circle");
                        column.appendChild(circle);
                    }

                }
            }

        }
    };

    const gamePieces = (parent, isHit) => {
        const numOfPieces = (isHit) ? 17 : 83;


        for(let i = 0; i < numOfPieces; i++)
        {
            const piece = document.createElement("div");
            const className = (isHit) ? "hit-piece" : "miss-piece";
            
            piece.classList.add(className);
            parent.appendChild(piece);

            const xOffset = getRandomNum(50, parent.getBoundingClientRect().width - 45);
            const yOffset =  getRandomNum(50, parent.getBoundingClientRect().height - 45);

            piece.style.top = `${yOffset}px`;
            piece.style.left = `${xOffset}px`

        }
    };

    const gameboardSelection = (parent, gameBoardClassObj) => {
        
        const pieces = parent.querySelectorAll(".hit-piece");
        pieces.forEach(piece => {
            piece.remove();
        })
        
        const gameBoard = gameBoardClassObj.gameboard;

        for(let r = 0; r < gameBoard.length; r++)
        {
            for(let c = 0; c < gameBoard[r].length; c++)
            {
                if(gameBoard[r][c] != false)
                {
                    const tile = document.querySelector(`.tile-${c}-${r}`);
                    
                    const name = gameBoard[r][c].slice(0, gameBoard[r][c].indexOf('-'));
                    const dir = gameBoard[r][c].slice(gameBoard[r][c].indexOf('-') + 1);

                    if(document.querySelector(`.${name}-piece.game-piece`) == null)
                    {
                        const img = document.querySelector("img");
                        img.setAttribute("class", `${name}-piece game-piece`)
                        img.src = battleshipPieces[name];
                        img.style.top = "0px";
                        tile.appendChild(img);

                        if(dir == "left" || dir == "right")
                        {
                            img.classList.add("game-piece-rotate");
                        }

                    }
                    
                }
            }
        }

    }

    return {gameboard, gamePieces, initialScreen, selectScreen, gameboardSelection}
})();