// query selecter to select all cells for X and O and put them in the array
let cells = document.querySelectorAll('.row > div');
//query selector to view result
let result = document.querySelector('.res');
// if someone wants to reset the game in between
let restart = document.querySelector('.reset');

//eventlistner added to the reset class so that it can be manipulated
restart.addEventListener('click',resetAll);


//eventlistner is something always running and detecting the events on the screen by some input device
for(let i=0;i<cells.length;i++)
{
    cells[i].addEventListener('click',myfunction);
}


let move = false;
let res = false;

// this function will execute when a click is happend on the division
function myfunction()
{
    if(res)
    {
        resetAll();
        res = false;
        return;
    }
    if(event.target.textContent == '')
        {
            if(move == false)
                {
                    event.target.textContent = 'X';
                    move = true;
                }
            else
                {
                    event.target.textContent = 'O';
                    move = false;
                }
        }

// check if the draw happened
    if(allfilled())
    {
        result.textContent = 'DRAW!';
        res = true;
    }

// check if someone won 
    if(cells[0].textContent != '' )
    {
        if(cells[0].textContent == cells[1].textContent && cells[1].textContent ==  cells[2].textContent)
        {
            result.textContent = cells[0].textContent + ' WON!';
            res = true;
        }
        if(cells[0].textContent == cells[3].textContent && cells[3].textContent == cells[6].textContent)
        {
            result.textContent = cells[0].textContent + ' WON!';
            res = true;
        }
        if(cells[0].textContent == cells[4].textContent && cells[4].textContent == cells[8].textContent)
        {
            result.textContent = cells[0].textContent + ' WON!';
            res = true;
        }
    }
    if(cells[1].textContent != '')
    {
        if(cells[1].textContent == cells[4].textContent && cells[4].textContent == cells[7].textContent)
        {
            result.textContent = cells[1].textContent + ' WON!';
            res = true;
        }
    }
    if(cells[2].textContent != '')
    {
        if(cells[2].textContent == cells[4].textContent && cells[4].textContent == cells[6].textContent)
        {
            result.textContent = cells[2].textContent + ' WON!';
            res = true;
        }
        if(cells[2].textContent == cells[5].textContent && cells[5].textContent == cells[8].textContent)
        {
            result.textContent = cells[2].textContent + ' WON!';
            res = true;
        }

    }
    if(cells[3].textContent != '')
    {
        if(cells[3].textContent == cells[4].textContent && cells[4].textContent == cells[5].textContent)
        {
            result.textContent = cells[3].textContent + ' WON!';
            res = true;
        }
    }
    if(cells[6].textContent != '' && cells[6].textContent == cells[7].textContent && cells[7].textContent == cells[8].textContent)
    {
        result.textContent = cells[6].textContent + ' WON!';
        res = true;
    }
}

// method to reset everything after accomplishment of a game
function resetAll()
{
    for(let i=0;i<cells.length;i++)
    {
        cells[i].textContent = '';
    }
    result.textContent = '';
    move = false;
}

//method to check if every box is filled
function allfilled()
{
    let filled = true;
    for(let i=0;i<cells.length;i++)
    {
        if(cells[i].textContent == '')
            filled = false;
    }
    return filled;
}
