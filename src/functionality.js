import { display } from "./display";

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

            console.log(arrOfShips);
        })
        
    }


    return {startGameBtn, submitShipBtn}
})();