const board = [null,0,null,1,null,2,null,3,
    4,null,5,null,6,null,7,null,
    null,8,null,9,null,10,null,11,
    null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,
    12,null,13,null,14,null,15,null,
    null,16,null,17,null,18,null,19,
    20,null,21,null,22,null,23,null
    ]
//DOM references
const cells = document.querySelectorAll('td');
let redsPieces = document.querySelectorAll("[id='0'], [id='1'], [id='2'], [id='3'], [id='4'], [id='5'], [id='6'], [id='7'], [id='8'], [id='9'], [id='10'], [id='11']");
let blacksPieces = document.querySelectorAll("[id='12'], [id='13'], [id='14'], [id='15'], [id='16'], [id='17'], [id='18'], [id='19'], [id='20'], [id='21'], [id='22'], [id='23']");
const redTurnText = document.querySelectorAll('.red-turn-text');
const blackTurnText = document.querySelectorAll('.black-turn-text');
const divider = document.querySelector('.divider')




// player properties
let turn = true;
let redScore = 12;
let blackScore = 12;
let unavailablePieces = 0;
let playerPieces;

let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false,
}

//initializes the event listeners on pieces
function givePiecesEventListeners() {
    window.alert('1');
    if (turn) {
        //window.alert(redsPieces.length);
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        //window.alert(blacksPieces.length);
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].addEventListener('click', getPlayerPieces);
        }
    }
}

function getPlayerPieces() {
    //ai makes piece selection
    if (turn) {
        playerPieces = redsPieces;
    } else {
        playerPieces = blacksPieces;
    }
    removeCellonclick();
    resetBorders();
}

function removeCellonclick() {
    //window.alert('removeCell')
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute('onclick');
        
    }
}

function resetBorders() {
    //window.alert('reset Borders')
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = '1px solid white';
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

function resetSelectedPieceProperties() {
    //window.alert('reset Selected Piece')
    selectedPiece.pieceId = -1,
    selectedPiece.indexOfBoardPiece = -1,
    selectedPiece.isKing = false,
    selectedPiece.seventhSpace = false,
    selectedPiece.ninthSpace = false,
    selectedPiece.fourteenthSpace = false,
    selectedPiece.eighteenthSpace = false,
    selectedPiece.minusSeventhSpace = false,
    selectedPiece.minusNinthSpace = false,
    selectedPiece.minusFourteenthSpace = false,
    selectedPiece.minusEighteenthSpace = false
}

function getSelectedPiece() {
    //window.alert('get selected piece')
    selectedPiece.pieceId = parseInt(event.target.id);
    //window.alert('1')
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    //window.alert('2')
    isPieceKing();
}

let findPiece = function (pieceId) {
    //window.alert('find piece')
    let parsed = parseInt(pieceId);
    //window.alert('3')
    return board.indexOf(parsed);
}

function isPieceKing() {
    //window.alert('is king')
    if (document.getElementById(selectedPiece.pieceId).classList.contains('king')) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }
    getAvailableSpaces();
}

function getAvailableSpaces() {
    //window.alert('get available spaces')
    if (board[selectedPiece.indexOfBoardPiece +7] === null &&
        cells[selectedPiece.indexOfBoardPiece +7].classList.contains('noPieceEver') !== true) {
        selectedPiece.seventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece +9] === null &&
        cells[selectedPiece.indexOfBoardPiece +9].classList.contains('noPieceEver') !== true) {
        selectedPiece.ninthSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece -7] === null &&
        cells[selectedPiece.indexOfBoardPiece -7].classList.contains('noPieceEver') !== true) {
        selectedPiece.minusSeventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece -9] === null &&
        cells[selectedPiece.indexOfBoardPiece -9].classList.contains('noPieceEver') !== true) {
        selectedPiece.minusNinthSpace = true;
    }
    checkAvailableJumpSpaces();

}

function checkAvailableJumpSpaces() {
    //window.alert('check available jumps')
    if (turn) {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null
        && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains('noPieceEver') !== true
        && board[selectedPiece.indexOfBoardPiece + 7] >= 12) {
            selectedPiece.fourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null
            && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains('noPieceEver') !== true
            && board[selectedPiece.indexOfBoardPiece + 9] >= 12) {
                selectedPiece.eighteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null
            && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains('noPieceEver') !== true
            && board[selectedPiece.indexOfBoardPiece - 7] >= 12) {
                selectedPiece.minusFourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null
            && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains('noPieceEver') !== true
            && board[selectedPiece.indexOfBoardPiece - 9] >= 12) {
                selectedPiece.minusEighteenthSpace = true;
        }
    }
    else {
        if (board[selectedPiece.indexOfBoardPiece + 14] === null
            && cells[selectedPiece.indexOfBoardPiece + 14].classList.contains('noPieceEver') !== true
            && board[selectedPiece.indexOfBoardPiece + 7] < 12) {
                selectedPiece.fourteenthSpace = true;
            }
            if (board[selectedPiece.indexOfBoardPiece + 18] === null
                && cells[selectedPiece.indexOfBoardPiece + 18].classList.contains('noPieceEver') !== true
                && board[selectedPiece.indexOfBoardPiece + 9] < 12) {
                    selectedPiece.eighteenthSpace = true;
            }
            if (board[selectedPiece.indexOfBoardPiece - 14] === null
                && cells[selectedPiece.indexOfBoardPiece - 14].classList.contains('noPieceEver') !== true
                && board[selectedPiece.indexOfBoardPiece - 7] < 12) {
                    selectedPiece.minusFourteenthSpace = true;
            }
            if (board[selectedPiece.indexOfBoardPiece - 18] === null
                && cells[selectedPiece.indexOfBoardPiece - 18].classList.contains('noPieceEver') !== true
                && board[selectedPiece.indexOfBoardPiece - 9] < 12) {
                    selectedPiece.minusEighteenthSpace = true;
            } 
    }
    checkPieceConditions();
    
}

function checkPieceConditions() {
    //window.alert('check piece conditions')
    if (selectedPiece.isKing) {
        givePieceBorder();
    } else {
        if (turn) {
            selectedPiece.minusSeventhSpace = false;
            selectedPiece.minusNinthSpace = false;
            selectedPiece.minusFourteenthSpace = false;
            selectedPiece.minusEighteenthSpace = false;
        } else {
            selectedPiece.seventhSpace = false;
            selectedPiece.ninthSpace = false;
            selectedPiece.fourteenthSpace = false;
            selectedPiece.eighteenthSpace = false;
        }
        givePieceBorder();

    }

}

function givePieceBorder() {
    //window.alert('give piece border')
    if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace
        || selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
            document.getElementById(selectedPiece.pieceId).style.border = '3px solid green';
            giveCellsClick();
    } else {
        document.getElementById(selectedPiece.pieceId).style.border = '3px solid red';
        unavailablePieces++
        if (turn) {
            if (unavailablePieces >= redScore) {
                blackWins();
            }
        } else {
            if (unavailablePieces >= blackScore) {
                redWins();
            }
        }
    }
}

function giveCellsClick() {
    //window.alert('give cells click')
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexOfBoardPiece + 7].setAttribute('onclick', 'makeMove(7)');
    }
    if (selectedPiece.ninthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 9].setAttribute('onclick', 'makeMove(9)');
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 14].setAttribute('onclick', 'makeMove(14)');
    }
    if (selectedPiece.eighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 18].setAttribute('onclick', 'makeMove(18)');
    }
    if (selectedPiece.minusSeventhSpace) {
        cells[selectedPiece.indexOfBoardPiece - 7].setAttribute('onclick', 'makeMove(-7)');
    }
    if (selectedPiece.minusNinthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 9].setAttribute('onclick', 'makeMove(-9)');
    }
    if (selectedPiece.minusFourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 14].setAttribute('onclick', 'makeMove(-14)');
    }
    if (selectedPiece.minusEighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 18].setAttribute('onclick', 'makeMove(-18)');
    }
}
//ai makes move selection
function makeMove(number) {
    //window.alert(redsPieces.length)
    document.getElementById(selectedPiece.pieceId).remove();
    //window.alert(selectedPiece.pieceId)
    cells[selectedPiece.indexOfBoardPiece].innerHTML = '';
    //window.alert('2')
    if (turn) {
        //window.alert('3')
        if (selectedPiece.isKing) {
            //window.alert('king')
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece king" id="${selectedPiece.pieceId}"></p>`;
            redsPieces = document.querySelectorAll("[id='0'], [id='1'], [id='2'], [id='3'], [id='4'], [id='5'], [id='6'], [id='7'], [id='8'], [id='9'], [id='10'], [id='11']");
        } else {
            //window.alert(selectedPiece.pieceId)
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="red-piece" id="${selectedPiece.pieceId}"></p>`;
            redsPieces = document.querySelectorAll("[id='0'], [id='1'], [id='2'], [id='3'], [id='4'], [id='5'], [id='6'], [id='7'], [id='8'], [id='9'], [id='10'], [id='11']");
            //window.alert(redsPieces.length)
        }
    } else {
        if (selectedPiece.isKing) {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="black-piece king" id="${selectedPiece.pieceId}"></p>`;
            blacksPieces = document.querySelectorAll("[id='12'], [id='13'], [id='14'], [id='15'], [id='16'], [id='17'], [id='18'], [id='19'], [id='20'], [id='21'], [id='22'], [id='23']");
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="black-piece" id="${selectedPiece.pieceId}"></p>`;
            blacksPieces = document.querySelectorAll("[id='12'], [id='13'], [id='14'], [id='15'], [id='16'], [id='17'], [id='18'], [id='19'], [id='20'], [id='21'], [id='22'], [id='23']");
        }
    }
    //window.alert('hello')
    let indexOfPiece = selectedPiece.indexOfBoardPiece
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}

function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    //window.alert('change data')
    board[indexOfBoardPiece] = null;
    board[modifiedIndex] = parseInt(selectedPiece.pieceId);
    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(selectedPiece.pieceId).classList.add('king');
    }
    if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
        document.getElementById(selectedPiece.pieceId).classList.add('king');
    }
    if (removePiece) {
        board[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = '';
            blackScore--
        }
        if (turn === false && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = '';
            redScore--
        }
    }
    if (turn) {
        color = 'red'
    }
    else {
        color = 'black'
    }
    $.ajax({
        type: "GET",
        url: "post_move",
        data: {
            "color": color,
            "game_state": String(board),
        },
        dataType: "json",
        success: function (data) {
            // any process in data
        },
        failure: function () {
            window.alert("failure");
        }
    });

    resetSelectedPieceProperties();
    removeCellonclick();
    removeEventListeners();
}

function removeEventListeners() {
    //window.alert('remove event listener')
    if (turn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].removeEventListener('click', getPlayerPieces);     
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].removeEventListener('click', getPlayerPieces);     
        }
    }
    checkForWin();
}



function checkForWin() {
    //window.alert('check for win')
    if (blackScore === 0) {
        divider.style.display = 'none';
        for (let i = 0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = 'black';
            blackTurnText[i].style.display = 'none';
            redTurnText[i].textContent = 'RED WINS!'
        }
    } else if (redScore === 0) {
        divider.style.display = 'none';
        for (let i = 0; i < blackTurnText.length; i++) {
            blackTurnText[i].style.color = 'black';
            redTurnText[i].style.display = 'none';
            blackTurnText[i].textContent = 'BLACK WINS!'
        }
    }
    changePlayer();
}

function redWins() {
    divider.style.display = 'none';
    for (let i = 0; i < redTurnText.length; i++) {
        redTurnText[i].style.color = 'black';
        blackTurnText[i].style.display = 'none';
        redTurnText[i].textContent = 'RED WINS!'
    }
}

function blackWins() {
    divider.style.display = 'none';
    for (let i = 0; i < blackTurnText.length; i++) {
        blackTurnText[i].style.color = 'black';
        redTurnText[i].style.display = 'none';
        blackTurnText[i].textContent = 'BLACK WINS!'
    }
}

function changePlayer() {
    //window.alert('change player')
    if(redScore !== 0 && blackScore !==0) {
        if (turn) {
            turn = false;
            for (let i = 0; i < redTurnText.length; i++) {
                redTurnText[i].style.color = 'lightGrey';
                blackTurnText[i].style.color = 'black';
            }
        } else {
            turn = true;
            for (let i = 0; i < blackTurnText.length; i++) {
                blackTurnText[i].style.color = 'lightGrey';
                redTurnText[i].style.color = 'black';
            } 
        }
    }
    unavailablePieces = 0;
    givePiecesEventListeners();
}
givePiecesEventListeners();