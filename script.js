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
        ) {
            roundFinishedVariable = 'win'
        } else if (move > 8) {
            roundFinishedVariable = 'tie'
        }
    };

    const reset = () => {
        move = 0;
        roundFinishedVariable = undefined;
    };

    return Object.assign({}, {checkRound}, {reset}, {roundFinished});
})();

const gameDisplay = (() => {
    const gameArray = gameBoard.gameArray;

    const gameElementPs = Array.from(document.querySelectorAll('.gameElementP'));
    const gameElementDivs = Array.from(document.querySelectorAll('.gameElementDiv'));
    const turnTitle = document.querySelector('#turnTitle');
    const roundBtn = document.querySelector('#roundBtn');
    const gameBtn = document.querySelector('#gameBtn');

    const playerXScoreElement = document.querySelector('#playerXScoreElement');
    const playerOScoreElement = document.querySelector('#playerOScoreElement');
    let xScore = 0;
    let oScore = 0;


    let currentPlayerVariable = 0;
    const currentPlayer = () => {
        if (currentPlayerVariable % 2 == 0) {
            return playerX;
        } else return playerO;
    };
    const nextPlayer = () => {
        if (currentPlayer() == playerX) {
            return playerO;
        } else return playerX;
    };

    gameElementDivs.forEach(item => {
        item.addEventListener('click', e => {
            if (gameLogic.roundFinished() == undefined) {
                if (e.target.classList.contains('taken')) {
                    return;
                } else {
                    currentPlayer().addMove(e.target.getAttribute('value'), currentPlayer().team);
                    e.target.classList.toggle('taken');
                    // turnTitle.innerHTML = 'Player ' + nextPlayer().team + '\'s Turn';
                    currentPlayerVariable++;
                }
            } else {
                gameController.reset();
            }
        })
    })

    const displayGameArray = () => {
        gameElementPs.forEach(item => {
            item.innerHTML = gameArray[gameElementPs.findIndex(element => element == item)];
        })
        playerXScoreElement.innerHTML = xScore;
        playerOScoreElement.innerHTML = oScore;
    }

    const updateScore = (result) => {
        if (result == 'win') {
            if (currentPlayer() == playerX) {
                xScore++;
                displayGameArray();
            } else {
                oScore++;
                displayGameArray();
            }
        } else return;
    };

    const changeRoundBtn = () => {
        roundBtn.innerHTML = 'Next Round';
    };
    const changeTurnTitle = () => {
        if (gameLogic.roundFinished() == undefined) {
            turnTitle.innerHTML = 'Player ' + nextPlayer().team + '\'s Turn';
        } else if (gameLogic.roundFinished() == 'win') {
            turnTitle.innerHTML = 'Player ' + currentPlayer().team + ' Won!';
        } else {
            turnTitle.innerHTML = 'Tie Game!';
        }
    };

    roundBtn.addEventListener('click', () => {
        gameController.reset();
    })
    gameBtn.addEventListener('click', () => {
        xScore = 0;
        oScore = 0;
        gameController.reset();
    })

    const reset = () => {
        gameElementDivs.forEach(item => {
            if (item.classList.contains('taken')) {
                item.classList.toggle('taken');
            }
        })
        roundBtn.innerHTML = 'Reset Round';
        displayGameArray();
    };

    return Object.assign({}, {displayGameArray}, {updateScore}, {changeRoundBtn}, {changeTurnTitle}, {reset});
})();

const gameController = (() => {
    const addMove = (position, team) => {
        gameBoard.updateGameArray(position, team);
        gameDisplay.displayGameArray();
        gameLogic.checkRound(team);
        gameDisplay.changeTurnTitle();
        if (gameLogic.roundFinished() !== undefined) {
            endRound();
        }
    };

    const endRound = () => {
        gameDisplay.updateScore(gameLogic.roundFinished());
        gameDisplay.changeRoundBtn();
    };

    const reset = () => {
        gameBoard.reset();
        gameLogic.reset();
        gameDisplay.reset();
    };

    return Object.assign({}, {addMove}, {endRound}, {reset});
})();

const players = (team) => {
    const prototype = gameController;

    return Object.assign({}, prototype, {team});
};

const playerX = players('X');
const playerO = players('O');