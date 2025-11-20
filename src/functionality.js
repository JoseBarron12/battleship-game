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
                console.log(shipObj.dir);
                const dir = (shipObj.dir == "up") ? "down" :
                            (shipObj.dir == "down") ? "up" : shipObj.dir;
                
                const label = form.querySelector(`[class*="${shipObj.shipName}-fieldset"]`)
                console.log(`[class*="${shipObj.shipName}"]`);
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


    return {startGameBtn, submitShipBtn}
})();