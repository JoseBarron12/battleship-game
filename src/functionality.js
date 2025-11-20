import { display } from "./display";

export const functionality = (function() {
    const startGameBtn = (btn, parent) => {
        btn.addEventListener("click", () => {
            // Replace welcome screen with select screen
            parent.replaceChildren(); 
            display.selectScreen(parent);
        });
    }

    return {startGameBtn}
})();