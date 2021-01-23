//Global variables to read the pattern
let xColumn = []
let oColumn = []

window.onload = () => {

    //get class ket to add event lustener
    const board = document.querySelector('.board')
    const boardKeys = board.querySelector('.board__key')
    const display = document.getElementById('display')
    let winner

    board.dataset.previousPlayer = 'o'

    //Main Functionality 
    boardKeys.addEventListener('click', e => {
        if (e.target.matches('span')) {
            const key = e.target
            // constant to know who turn is it. also consts to carry the user points
            const previousPlayer = board.dataset.previousPlayer

            // compare who turn is it and if pressed space is free
            if (previousPlayer === 'o' && key.textContent === '') {
                key.textContent = 'x'
                
                //Capture the column index to form the pattern
                xColumn.push(key.dataset.column)
                //set turn to X player and count of turns
                board.dataset.previousPlayer = 'x'

                //check if X player wins and inform gamers
                winner = evaluate(xColumn.sort())

                if (winner === true) {
                    display.textContent = display.textContent + 'X Player is the winner !!'
                    newGame(false)
                }

            } else if (key.textContent === '') {
                key.textContent = 'o'

                //capture the column index to form the pattern
                oColumn.push(key.dataset.column)

                //set turn to O player
                board.dataset.previousPlayer = 'o'

                //check if O player wins and inform gamers
                winner = evaluate(oColumn.sort())

                if (winner === true) {
                    display.textContent = display.textContent + 'O Player is the winner !!'
                    newGame(false)
                }
            }
        }

    })

}

//Function to start new game
newGame = (auto) => {
    //get board
    const board = document.querySelector('.board')
    const boardKeys = board.querySelector('.board__key')
    //get all spans to be cleaned
    const key = boardKeys.querySelectorAll('.key')

    //make 'O' as last gamer, so 'X' goes first and clear board
    board.dataset.previousPlayer = 'o'
    //clear display information only if user click on new button
    if (auto) {
        document.getElementById('display').textContent = 'Winner: '
        //clean board
        key.forEach(key => {
            key.textContent = ''
        })
    }
    
    //clear pattern arrays
    xColumn = []
    oColumn = []
}

//Check if the columns are in the correct pattern
patternCheck = (arr) => {
    let correctPattern
    
    if (arr.includes('a1b1c1') ||
        arr.includes('a2b2c2') ||
        arr.includes('a3b3c3') ||
        arr.includes('a1a2a3') ||
        arr.includes('b1b2b3') ||
        arr.includes('c1c2c3') ||
        arr.includes('a1b2c3') ||
        arr.includes('a3b2c1')) {
        correctPattern = true
    } else {
        correctPattern = false
    }

    return correctPattern
}

//Evaluate game for winner
evaluate = (columns) => {
    let winner
    //call arrow function to validate if corret pattern
    const arr = patternCheck(columns.join(''))

    //set winner if correct pattern
    if (arr) {
        winner = true
    } else {
        winner = false
    }

    return winner
}