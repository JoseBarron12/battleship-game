import { functionality } from "./functionality";

const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * max);
}

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
    }

    const gameboard = (parent, isOpponent) => {

        let board = parent;
        if(isOpponent)
        {
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
                        column.classList.add(`${j - 1}-${i - 1}`);

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
    }
    return {gameboard, gamePieces, initialScreen, selectScreen}
})();