document.addEventListener("DOMContentLoaded", () => {
    let UI = {
        board: document.querySelectorAll(".grid-item"),
        message: document.getElementById("message"),
        boardBox: document.getElementById("board"),
        messageBox: document.querySelector(".message"),
        scores: document.querySelectorAll(".score"),
        turns: document.querySelectorAll(".turns"),
        choices: document.querySelectorAll(".choice"),
        choicesBox: document.querySelector(".choices"),
        back: document.querySelector(".back"),
        playerTwoTurn: document.getElementById("player-two-turn"),
        reset: document.getElementById("reset")
    }

    let symbols = ["X", "O"];
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let numPlayers = 0;
    let currentPlayer = Math.random() < 0.5 ? 0 : 1;
    let score = [0,0];
    let numplays = 0;
    let stage = 0;

    for(let i = 0; i < UI.choices.length; i++){
        UI.choices[i].addEventListener("click", (e)=>{
            e.preventDefault();
            if(stage === 0){
                nextStage();
                numPlayers = i === 0 ? 1 : 2;
                UI.playerTwoTurn.textContent = i === 0 ? "Computer's turn" : "Player 2 turn !";
            }else if(stage === 1){
                nextStage();
                symbols = i === 0 ? ["X", "O"] : ["O", "X"];
                switchPlayer();
            }
        })
    }

    for(let i = 0; i < UI.board.length; i++){
        UI.board[i].addEventListener("click", (e) => {
            e.preventDefault();
            if(board[i] === 0){
                UI.board[i].textContent = symbols[currentPlayer];
                numplays++;
                board[i] = symbols[currentPlayer];
                switchPlayer();
            }
        });
    }

    UI.reset.addEventListener("click", (e)=>{
        e.preventDefault();
        initialise();
    });

    UI.back.addEventListener("click", (e)=>{
        e.preventDefault();
        initialise();
    });

    function initialise(){
        stage = 0;
        numPlayer = 0;
        numplays = 0;
        score = [0,0];
        UI.boardBox.hidden = true;
        UI.messageBox.hidden = false;
        UI.choicesBox.hidden = false;
        UI.back.hidden = true;

        UI.message.textContent = "How do you wanna play?";
        UI.choices[0].textContent = "One Player";
        UI.choices[1].textContent = "Two Players";

        UI.scores[0].textContent = "0";
        UI.scores[1].textContent = "0";

        UI.turns[0].style.top = "40px";
        UI.turns[1].style.top = "40px";

        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for(let j = 0; j< board.length; j++){
            UI.board[j].textContent = "";
        }
    }

    function nextStage(){
        if(stage === 0){
            UI.message.textContent = "Would you like to be X or O?";
            UI.choices[0].textContent = "X";
            UI.choices[1].textContent = "O";
            UI.back.hidden = false;
        }
        else if(stage === 1){
            UI.messageBox.hidden = true;
            UI.choicesBox.hidden = true;
            UI.back.hidden = true;
            UI.boardBox.hidden = false;
        }
        stage++;
    }

    function displayMessage(message){
        UI.boardBox.hidden = true;
        UI.message.textContent = message;
        UI.messageBox.hidden = false;
        numplays = 0;
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        setTimeout(()=>{
            for(let j = 0; j< board.length; j++){
                UI.board[j].textContent = "";
            }
            UI.boardBox.hidden = false;
            UI.messageBox.hidden = true;
        }, 1500);
    }

    function switchPlayer(){
        if(checkWin(board, symbols[currentPlayer])){
            let message = '"' + symbols[currentPlayer] +'"' + " wins !";
            displayMessage(message);
            score[currentPlayer]++;
            UI.scores[currentPlayer].textContent = score[currentPlayer];
        }else if(numplays === board.length){
            displayMessage("It's a draw !");
        }
        if(numPlayers===1 && currentPlayer === 0){
            setTimeout(() => {
                let AIPos = computerPlay(board, symbols[currentPlayer], symbols[0]);
                console.log(AIPos);
                UI.board[AIPos].textContent = symbols[currentPlayer];
                numplays++;
                board[AIPos] = symbols[currentPlayer];
                switchPlayer();
            }, 1600);
        } 
        UI.turns[currentPlayer].style.top = "40px";
        currentPlayer = currentPlayer === 1 ? 0 : 1;
        setTimeout(()=>{
            UI.turns[currentPlayer].style.top = "0px";
        },500);       
    }

    function checkWin(board, char){
        let winning = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for(let i = 0; i < winning.length; i++){
            let elt = winning[i];
            let acc = 0;
            for(let j = 0; j < elt.length; j++){
                if(board[elt[j]] === char){
                    acc++;
                    if(acc === 3) return true;
                }else{
                    break;
                }
            }
        }
        return false;
    }

    function computerPlay(board, AIchar, playerChar){
        // check if winning position
        let boardCopy = [...board];
        for(let i = 0; i < board.length; i++){
            if(board[i]===0){
                boardCopy[i] = AIchar;
                if(checkWin(boardCopy, AIchar)){
                    return i;
                }else{
                    boardCopy = [...board];
                }
            }
        }

        // check if player winning position
        boardCopy = [...board];
        for(let i = 0; i < board.length; i++){
            if(board[i]===0){
                boardCopy[i] = playerChar;
                if(checkWin(boardCopy, playerChar)){
                    return i;
                }else{
                    boardCopy = [...board];
                }
            }
        }

        // return a random available position
        let available = [];
        for(let i = 0; i < board.length; i++){
            if(board[i] === 0) available.push(i);
        }

        return available[Math.floor(Math.random()*available.length)];

    }

});
