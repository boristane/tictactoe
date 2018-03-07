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
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                if(checkWin(board, symbols[currentPlayer])){
                    let message = '"' + symbols[currentPlayer] +'"' + " wins !";
                    displayMessage(message);
                    score[currentPlayer]++;
                    UI.scores[currentPlayer].textContent = score[currentPlayer];
                    numplays = 0;
                }
                else if(numplays === 9){
                    displayMessage("It's a draw !");
                }
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
        UI.boardBox.hidden = true;
        UI.messageBox.hidden = false;
        UI.choicesBox.hidden = false;
        UI.back.hidden = true;

        UI.message.textContent = "How do you wanna play?";
        UI.choices[0].textContent = "One Player";
        UI.choices[1].textContent = "Two Players";

        UI.turns[0].style.top = "40px";
        UI.turns[1].style.top = "40px";

        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for(let j = 0; j< 9; j++){
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
        setTimeout(()=>{
            board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            for(let j = 0; j< 9; j++){
                UI.board[j].textContent = "";
            }
            UI.boardBox.hidden = false;
            UI.messageBox.hidden = true;
        }, 1500);
    }

    function switchPlayer(){
        UI.turns[currentPlayer].style.top = "40px";
        currentPlayer = currentPlayer === 1 ? 0 : 1;
        setTimeout(()=>{
            UI.turns[currentPlayer].style.top = "0px";
        },500)
        
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

});
