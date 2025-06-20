const board = document.getElementById('game-board');
const movesText = document.getElementById('moves');
const restartBtn = document.getElementById('restart-btn');
const message = document.getElementById('game-message');

let cardValues = ['🍎','🍌','🍇','🍉','🍓','🍒','🥝','🍍'];
let firstCard, secondCard;
let lockBoard = false;
let moves = 0;
let matches = 0;
let totalPairs = cardValues.length;
let cards = [];

function initGame() {
  board.innerHTML = '';
  message.textContent = '';
  moves = 0;
  matches = 0;
  lockBoard = false;
  movesText.textContent = `Moves: ${moves}`;
  [firstCard, secondCard] = [null, null];

  let gameValues = [...cardValues, ...cardValues]; // 16 cards
  gameValues.sort(() => 0.5 - Math.random()); // shuffle

  cards = [];

  gameValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.textContent = '';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
    cards.push(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped') || this === firstCard) return;

  this.textContent = this.dataset.value;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  moves++;
  movesText.textContent = `Moves: ${moves}`;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matches++;
    resetTurn();

    if (matches === totalPairs) {
      setTimeout(() => {
        message.textContent = `🎉 You completed the game in ${moves} moves!`;
      }, 500);
    }
  } else {
    setTimeout(() => {
      firstCard.textContent = '';
      secondCard.textContent = '';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

restartBtn.addEventListener('click', initGame);

initGame(); // Start the game for the first time
