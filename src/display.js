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
                    }
                    else
                    {
                        column.classList.add(`${j - 1}-${i - 1}`);
                    }

                }
            }

        }
    }

    return {gameboard}
})();