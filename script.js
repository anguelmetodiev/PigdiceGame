// constant variables for DOM Manipulation
const player1El = document.querySelector('.player-0')
const player2El = document.querySelector('.player-1')
const score1El = document.querySelector('#score-0')
const score2El = document.getElementById('score-1')
const current1El = document.getElementById('current-0')
const current2El = document.getElementById('current-1')
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const btnRules = document.querySelector('.btn--rules')

// variables that can be reassigned and used as counters or boolean to determine the state (true or false)
let scores, currentScore, activePlayer, playing

// newGame - User can start a new Game and reset all the player scores to 0
const newGame = function () {
  scores = [0, 0] // keep the scores of the two players
  currentScore = 0 // current score of the player
  activePlayer = 0 // starting player
  playing = true // the player is playing 

  score1El.textContent = 0 // score of player 1 is displayed as 0
  score2El.textContent = 0 // score of player 2 is displayed as 0
  current1El.textContent = 0 // current score of player 1 is displayed as 0
  current2El.textContent = 0 // current score of player 2 is displayed as 0

  diceEl.classList.add('hidden') // dice is initially hidden
  player1El.classList.remove('player--winner') // player 1 wins is removed
  player2El.classList.remove('player--winner') // player 2 wins is removed
  player1El.classList.add('player--active') // player 1 is active is added
  player2El.classList.remove('player--active') // player 2 is active is removed
  document.querySelector('body').style.backgroundColor = '#8080ff' // set backgroundColor to #8080ff
  
}
newGame()

// switchPlayer - toggle between Player 1 and Player 2
const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0
  currentScore = 0

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  currentScore = 0;

  // activePlayer = activePlayer === 1 ? 2 : 0;0 // using Conditional (ternary) operator
  player1El.classList.toggle('player--active')
  player2El.classList.toggle('player--active')
}

// Roll - rolling a dice and generate scores fro 1 to 6
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1 // get the integer part of a number by removing fractional digits
    diceEl.classList.remove('hidden')
    diceEl.src = `dice-${dice}.png` // dice1.png, dice2.png, dice3.png, dice4.png, dice5.png, dice6.png
    if (dice !== 1) { // continue playing if dice is NOT 1
      currentScore += dice
      document.getElementById(`current-${activePlayer}`).textContent = currentScore
    } else {
      switchPlayer()
    }}});

// Hold - save the current score in the total score
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore

    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer]
    var input = document.querySelector('.btn--score').value // set a winning score that the player needs to reach in order to win the game
    var winningScore

    if(input) {
      winningScore = input
    } else {
      winningScore = 100 // if no input is set then winningScore will be set to 100
    }

    if (scores[activePlayer] >= winningScore) {
      playing = false
      diceEl.classList.add('hidden')

      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player--winner')
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player--active')
        document
        .querySelector('body').style.backgroundColor = '#6666ff'
        
    } else {
      switchPlayer()
    }
  }
})

//showRules - display dialog box stating the rules of the game
const showRules = function () {
  var gamerules = document.getElementById("gameRules")
  if (gamerules.style.display === "none") {
    gamerules.style.display = "block"
  } else {
    gamerules.style.display = "none"
  }
}

btnRules.addEventListener('click', showRules) // Show Rules
btnNew.addEventListener('click', newGame) // Start a New Game