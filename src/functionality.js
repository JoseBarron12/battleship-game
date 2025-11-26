import { display } from "./display";
import { Gameboard } from "./gameboard";

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
                display.gameboard(document.querySelector(".opponent-board"), true);
            }

        });

    }

    const resetFormBtn = (btn, form) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            
            const fields = form.querySelectorAll("fieldset");

            fields.forEach(field => {
                const selects = field.querySelectorAll("select");

                selects[0].value = "0"; // x-coord
                selects[1].value = "0"; // y-coord
                selects[2].value = "up"; // direction
                    
            })
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



    return {startGameBtn, submitShipBtn, resetFormBtn, shuffleFormBtn, selectInputField}
})();