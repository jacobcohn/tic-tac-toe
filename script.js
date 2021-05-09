const gameBoard = (() => {
    const gameArray = ['', '', '', '', '', '', '', '', ''];
    
    const updateGameArray = (team, position) => {
        gameArray.splice(position, 1, team);
    };

    const gameWon = (team) => {
        if (
            (gameArray[0] == gameArray[1] && gameArray[0] == gameArray[2] && gameArray[0] !== '')
            || (gameArray[3] == gameArray[4] && gameArray[3] == gameArray[5] && gameArray[3] !== '')
            || (gameArray[6] == gameArray[7] && gameArray[6] == gameArray[8] && gameArray[6] !== '')
            || (gameArray[0] == gameArray[3] && gameArray[0] == gameArray[6] && gameArray[0] !== '')
            || (gameArray[1] == gameArray[4] && gameArray[1] == gameArray[7] && gameArray[1] !== '')
            || (gameArray[2] == gameArray[5] && gameArray[2] == gameArray[8] && gameArray[2] !== '')
            || (gameArray[0] == gameArray[5] && gameArray[0] == gameArray[8] && gameArray[0] !== '')
            || (gameArray[2] == gameArray[4] && gameArray[2] == gameArray[6] && gameArray[2] !== '')
        ) {return team}
    };

    const resetGameArray = () => {
        for (let i = 0; i < 9; i++) {
            gameArray[i] = '';
        }
    };

    return Object.assign({}, {updateGameArray}, {gameWon}, {resetGameArray});
})();

const displayController = (() => {
    
})();

const players = (name) => {

    return Object.assign({}, name, playerNumber );
};