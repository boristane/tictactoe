document.addEventListener("DOMContentLoaded", () => {
    let UI = {
        board: document.querySelectorAll(".grid-item"),
        message: document.getElementById("message"),
        boardBox: document.getElementById("board"),
        messageBox: document.querySelector(".message"),
        scores: document.querySelectorAll(".score")
    }

    let symbols = ["X", "O"];
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    let currentPlayer = Math.random() < 0.5 ? 0 : 1;
    let score = [0,0];
    let numplays = 0;


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
                }
                else if(numplays === 9){
                    displayMessage("It's a draw !");
                }
                switchPlayer();
            }
        });
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
        currentPlayer = currentPlayer === 1 ? 0 : 1;
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
