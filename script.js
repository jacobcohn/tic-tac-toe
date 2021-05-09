const gameBoard = (() => {
    const gameArray = ['', '', '', '', '', '', '', '', ''];

    const updateGameArray = (position, team) => {
        gameArray.splice(position, 1, team);
    };

    let move = 0;

    const gameFinished = () => {
        move++;
        if (
            (gameArray[0] == gameArray[1] && gameArray[0] == gameArray[2] && gameArray[0] !== '')
            || (gameArray[3] == gameArray[4] && gameArray[3] == gameArray[5] && gameArray[3] !== '')
            || (gameArray[6] == gameArray[7] && gameArray[6] == gameArray[8] && gameArray[6] !== '')
            || (gameArray[0] == gameArray[3] && gameArray[0] == gameArray[6] && gameArray[0] !== '')
            || (gameArray[1] == gameArray[4] && gameArray[1] == gameArray[7] && gameArray[1] !== '')
            || (gameArray[2] == gameArray[5] && gameArray[2] == gameArray[8] && gameArray[2] !== '')
            || (gameArray[0] == gameArray[5] && gameArray[0] == gameArray[8] && gameArray[0] !== '')
            || (gameArray[2] == gameArray[4] && gameArray[2] == gameArray[6] && gameArray[2] !== '')
        ) {return 'win'}
        if (move > 8) {return 'tie'}
    };

    const gameElementPs = Array.from(document.querySelectorAll('.gameElementP'));
    const gameElementDivs = Array.from(document.querySelectorAll('.gameElementDiv'));

    const displayGameArray = () => {
        gameElementPs.forEach(item => {
            item.innerHTML = gameArray[gameElementPs.findIndex(element => element == item)];
        })
    }

    const addMove = (position, team) => {
        updateGameArray(position, team);
        displayGameArray();
        gameFinished(team);
    };

    const resetGame = () => {
        for (let i = 0; i < 9; i++) {
            gameArray[i] = '';
        }
        move = 0;
        gameElementDivs.forEach(item => {
            if (item.classList.contains('taken')) {
                item.classList.toggle('taken');
            }
        })
    };

    return Object.assign({}, {addMove}, {resetGame});
})();

const players = (name, team) => {
    const prototype = gameBoard;

    return Object.assign({}, prototype, {name}, {team});
};

const player1 = players('Jacob', 'X');
const player2 = players('AJ', 'O');
let currentPlayerVariable = 0;
const currentPlayer = () => {
    if (currentPlayerVariable % 2 == 0) {
        return player1;
    } else return player2;
};

const gameElementDivs = Array.from(document.querySelectorAll('.gameElementDiv'));

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