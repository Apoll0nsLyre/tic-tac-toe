const cellElements = document.querySelectorAll('.cell');
const main = document.querySelector('.main');
const board = document.querySelector('.board');
const turn = document.querySelector('#turn');
const Turn = document.querySelector('.turn');
const reset = document.querySelector('#reset');
const newgame = document.querySelector('#newgame');
const result = document.querySelector('.result');
const score1 = document.querySelector('#score1');
const score2 = document.querySelector('#score2');
let winner = '';

// création du jeu
class Player {
  constructor(name, letter) {
    this.name = name
    this.letter = letter
    this.score = 0
  }
}

class Game {
  constructor() {
    this.player1 = new Player('Player 1', 'X')
    this.player2 = new Player('Player 2', 'O')
    this.currentPlayer = this.player1
    this.board = ['','','','','','','','','']
    this.winningCombos = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // columns
      [0,4,8], [2,4,6]           // diagonals
    ];
    
    // affichage du score
    score1.textContent = this.player1.score
    score2.textContent = this.player2.score

    reset.addEventListener('click', () => {
      this.board = ['','','','','','','','','']
      cellElements.forEach(cell => {
        cell.textContent = ''
      })
      result.style.display = 'none'
      result.textContent = ''
      Turn.style.display = 'block'
      this.currentPlayer = this.player1
      turn.textContent = this.currentPlayer.name
      this.player1.score = 0
      this.player2.score = 0
      score1.textContent = this.player1.score
      score2.textContent = this.player2.score
    }
    )

    newgame.addEventListener('click', () => {
      this.board = ['','','','','','','','','']
      cellElements.forEach(cell => {
        cell.textContent = ''
      })
      result.style.display = 'none'
      result.textContent = ''
      Turn.style.display = 'block'
      this.currentPlayer = this.player1
      turn.textContent = this.currentPlayer.name
      score1.textContent = this.player1.score
      score2.textContent = this.player2.score
    }
    )
  }
}

const game = new Game();

// actions du jeu

if (checkWinner()) {
  checkWinner();
  result.textContent = `${winner} wins!`
  Turn.style.display = 'none'
}

cellElements.forEach(cell => {
  cell.addEventListener('click', (cell) => {
    if (!checkWinner()) {
      if (cell.target.textContent !== '') {
        return
      }else {
      game.board[cell.target.id] = game.currentPlayer.letter
      cell.target.textContent = game.currentPlayer.letter
      game.currentPlayer = game.currentPlayer === game.player1 ? game.player2 : game.player1
      turn.textContent = game.currentPlayer.name
      if (checkWinner()) {
        checkWinner();
        result.style.display = 'block'
        Turn.style.display = 'none'
        result.textContent = `${winner} wins!`
        if (winner === game.player1.name) {
          game.player1.score++
        }else if (winner === game.player2.name) {
          game.player2.score++
        }
        score1.textContent = game.player1.score
        score2.textContent = game.player2.score
      }else if (checkWinner() === false && game.board.includes('') === false) {
        result.style.display = 'block'
        Turn.style.display = 'none'
        result.textContent = `It's a tie!`
        }
      } 
    }else {
      return 
      }
    })
  })

turn.textContent = game.currentPlayer.name;



function checkWinner() {
  for (let i = 0; i < game.winningCombos.length; i++) {
    let combo = game.winningCombos[i]
    if (game.board[combo[0]] === game.board[combo[1]] && game.board[combo[1]] === game.board[combo[2]] && game.board[combo[0]] !== '') {
      if (game.board[combo[0]] === game.player1.letter) {
        winner = game.player1.name
      }else {
        winner = game.player2.name
      }
      return true
    }
  }
  return false
}

