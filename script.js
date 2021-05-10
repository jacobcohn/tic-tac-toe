const gameBoard = (() => {
    const gameArray = ['', '', '', '', '', '', '', '', ''];

    const updateGameArray = (position, team) => {
        gameArray.splice(position, 1, team);
    };

    const reset = () => {
        for (let i = 0; i < 9; i++) {
            gameArray[i] = '';
        }
    };

    return Object.assign({}, {updateGameArray}, {reset}, {gameArray});
})();

const gameLogic = (() => {
    const gameArray = gameBoard.gameArray;

    let move = 0;
    let roundFinishedVariable;
    const roundFinished = () => {
        return roundFinishedVariable;
    };
    const checkRound = () => {
        move++;
        if (
            (gameArray[0] == gameArray[1] && gameArray[0] == gameArray[2] && gameArray[0] !== '')
            || (gameArray[3] == gameArray[4] && gameArray[3] == gameArray[5] && gameArray[3] !== '')
            || (gameArray[6] == gameArray[7] && gameArray[6] == gameArray[8] && gameArray[6] !== '')
            || (gameArray[0] == gameArray[3] && gameArray[0] == gameArray[6] && gameArray[0] !== '')
            || (gameArray[1] == gameArray[4] && gameArray[1] == gameArray[7] && gameArray[1] !== '')
            || (gameArray[2] == gameArray[5] && gameArray[2] == gameArray[8] && gameArray[2] !== '')
            || (gameArray[0] == gameArray[4] && gameArray[0] == gameArray[8] && gameArray[0] !== '')
            || (gameArray[2] == gameArray[4] && gameArray[2] == gameArray[6] && gameArray[2] !== '')
        ) {roundFinishedVariable = 'win'} else if (move > 8) {roundFinishedVariable = 'tie'}
    };

    const reset = () => {
        move = 0;
    };

    return Object.assign({}, {checkRound}, {reset}, {roundFinished});
})();

const gameDisplay = (() => {
    const gameArray = gameBoard.gameArray;

    const gameElementPs = Array.from(document.querySelectorAll('.gameElementP'));
    const gameElementDivs = Array.from(document.querySelectorAll('.gameElementDiv'));

    const displayGameArray = () => {
        gameElementPs.forEach(item => {
            item.innerHTML = gameArray[gameElementPs.findIndex(element => element == item)];
        })
    }

    let currentPlayerVariable = 0;
    const currentPlayer = () => {
        if (currentPlayerVariable % 2 == 0) {
            return player1;
        } else return player2;
    };

    gameElementDivs.forEach(item => {
        item.addEventListener('click', e => {
            if (e.target.classList.contains('taken')) {
                return;
            } else {
                currentPlayer().addMove(e.target.getAttribute('value'), currentPlayer().team);
                e.target.classList.toggle('taken');
                currentPlayerVariable++;
            }
        })
    })

    const reset = () => {
        gameElementDivs.forEach(item => {
            if (item.classList.contains('taken')) {
                item.classList.toggle('taken');
            }
        })
        displayGameArray();
    };

    return Object.assign({}, {displayGameArray}, {reset});
})();

const gameController = (() => {
    const addMove = (position, team) => {
        gameBoard.updateGameArray(position, team);
        gameDisplay.displayGameArray();
        gameLogic.checkRound(team);
        if (gameLogic.roundFinished() !== undefined) {
            endRound();
        }
    };

    const endRound = () => {
        
    };

    const reset = () => {
        gameBoard.reset();
        gameLogic.reset();
        gameDisplay.reset();
    };

    return Object.assign({}, {addMove}, {reset});
})();

const players = (team) => {
    const prototype = gameController;

    return Object.assign({}, prototype, {team});
};

const player1 = players('X');
const player2 = players('O');