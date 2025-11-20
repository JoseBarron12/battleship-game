const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * max);
}

export const display = (function() {
    const gameboard = (parent) => {

        const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

        for(let i = 0; i < 11; i++)
        {
            const row = document.createElement("div");
            row.classList.add("row");
            parent.appendChild(row);
            
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

    return {gameboard, gamePieces}
})();