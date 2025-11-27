import { oppGameBoard, playerGameBoard } from ".";
import { display } from "./display";
import { Gameboard } from "./gameboard";

const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * max);
}

const getShipInput = (form) => {
    const fields = form.querySelectorAll("fieldset");
            
    const arrOfShips = [];
            
    fields.forEach(field => {
        const selects = field.querySelectorAll("select");
                
        const shipLabel = field.querySelector("label").getAttribute("for");
        const shipType = shipLabel.slice(0,shipLabel.indexOf("-"));

        const shipObj = {
            shipName: shipType
        };
                
        selects.forEach(select => {
            const id = select.getAttribute("id");
            const input = select.value;
            const shipPlay = id.slice(id.indexOf("-") + 1);
            shipObj[shipPlay] = input;

        });
            arrOfShips.push(shipObj);
        });
    return arrOfShips;
}

const getFormShipInputToBoard = (arrOfShips, gameboard, form) => {
    arrOfShips.forEach(shipObj => {     
        const dir = (shipObj.dir == "up") ? "down" :
                            (shipObj.dir == "down") ? "up" : shipObj.dir;
                
        const label = form.querySelector(`[class*="${shipObj.shipName}-fieldset"]`)
                
        if(! gameboard.placeShip(shipObj.shipName, Number(shipObj.x), Number(shipObj.y), dir))
        {
            label.classList.remove("valid");
            label.classList.add("invalid");
        }
        else
        {
            label.classList.remove("invalid");
            label.classList.add("valid");
        }
    });
}

const delay = t => new Promise(resolve => setTimeout(resolve, t));


export const functionality = (function() {
    const startGameBtn = (btn, parent) => {
        btn.addEventListener("click", () => {
            // Replace welcome screen with select screen
            parent.replaceChildren(); 
            display.selectScreen(parent);
        });
    }

    const submitShipBtn = (btn, form) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
  
            let validInput = true;

            const arrOfShips = getShipInput(form);
            const gameboard = new Gameboard();

            arrOfShips.forEach(shipObj => {
                
                const dir = (shipObj.dir == "up") ? "down" :
                            (shipObj.dir == "down") ? "up" : shipObj.dir;
                
                const label = form.querySelector(`[class*="${shipObj.shipName}-fieldset"]`)
                
                if(! gameboard.placeShip(shipObj.shipName, Number(shipObj.x), Number(shipObj.y), dir))
                {
                    label.classList.remove("valid");
                    label.classList.add("invalid");
                    validInput = false;
                }
                else
                {
                    label.classList.remove("invalid");
                    label.classList.add("valid");
                }
            });
            
            display.gameboardSelection(document.querySelector(".game-board"),gameboard);
            
            if(validInput)
            {
                playerGameBoard.gameboard = gameboard.gameboard;
                display.gameboard(document.querySelector(".opponent-board"), true);
            }

        });

    }

    const resetFormBtn = (btn, form) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            
            display.gameboardSelection(document.querySelector(".game-board"));

            const fields = form.querySelectorAll("fieldset");

            fields.forEach(field => {
                field.classList.remove("valid");
                field.classList.add("invalid");
                
                const selects = field.querySelectorAll("select");

                selects[0].value = "0"; // x-coord
                selects[1].value = "0"; // y-coord
                selects[2].value = "up"; // direction
                    
            });

        })
    }

    const shuffleFormBtn = (btn, form) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const arrOfShips = new Gameboard().placeRandomPieces();
            const gameboard = new Gameboard();

            arrOfShips.forEach(shipObj => {
                
                const dir = shipObj.direction;
                
                const label = form.querySelector(`[class*="${shipObj.shipName}-fieldset"]`)
                
                const selects = label.querySelectorAll("select");

                selects[0].value = shipObj.coordX; // x-coord
                selects[1].value = shipObj.coordY; // y-coord
                selects[2].value = (dir == "up") ? "down" :
                            (dir == "down") ? "up" : dir;; // direction


                if(!gameboard.placeShip(shipObj.shipName, Number(shipObj.coordX), Number(shipObj.coordY), dir))
                {
                    label.classList.remove("valid");
                    label.classList.add("invalid");
                }
                else
                {
                    label.classList.remove("invalid");
                    label.classList.add("valid");
                }
            });

            display.gameboardSelection(document.querySelector(".game-board"),gameboard);

        })
    }

    const selectInputField = (input, form) => {
        input.addEventListener("input", () => {
  
            const arrOfShips = getShipInput(form);
            const gameboard = new Gameboard();

            getFormShipInputToBoard(arrOfShips, gameboard, form);
            
            display.gameboardSelection(document.querySelector(".game-board"),gameboard);
        })
    }   

    const opponentGameBoard = (board) => {
        const rows = board.querySelectorAll(".row");

        for(let i = 1; i < rows.length; i++)
        {
            const columns = rows[i].querySelectorAll(".column");

            for(let j = 1; j < columns.length; j++)
            {
                
                functionality.tileBtn(columns[j], i - 1, j - 1);
            }
        }
    }

    const tileBtn = (tile, x, y) => {
        const displayCoords =  async () => {
            const currentMiss = oppGameBoard.missedAttacks;
            
            oppGameBoard.receiveAttack(x, y);
            
            const newMiss = oppGameBoard.missedAttacks;
            const isHit = (currentMiss == newMiss) ? true : false;
            
            tile.removeEventListener("click", displayCoords);
            
            display.gamePlay(x, y, false, isHit);
            display.gamePiece(tile, isHit);

            if(oppGameBoard.areAllShipsSunk())
            {
                display.initialScreen(document.querySelector(".opponent-board"),true, "Player");
                return;
            }


            display.gamePauseScreen();
        
            delay(1000).then(() => {
                opponentPlay();

            }).then(() => {
                delay(1000).then(() => {
                    document.querySelector(".pause-screen").remove();
                    if(playerGameBoard.areAllShipsSunk())
                    {
                        display.initialScreen(document.querySelector(".opponent-board"),true, "Computer");
                        return;
                    }
                    
                });
            });   
            
        }
        tile.addEventListener("click", displayCoords);
    }

    const opponentPlay = () => {
        const x = getRandomNum(0,10);
        const y = getRandomNum(0,10);

        const currentMiss = playerGameBoard.missedAttacks;

        playerGameBoard.receiveAttack(y, x);
            
        const newMiss = playerGameBoard.missedAttacks;

        const isHit = (currentMiss == newMiss) ? true : false;

        display.gamePlay(x, y, true, isHit);

        const playerBoard = document.querySelector(".game-board");
        const tile = playerBoard.querySelector(`.tile-${y}-${x}`);

        display.gamePiece(tile, isHit);

    }





    return {startGameBtn, submitShipBtn, resetFormBtn, shuffleFormBtn, selectInputField, opponentGameBoard, tileBtn, opponentPlay}
})();