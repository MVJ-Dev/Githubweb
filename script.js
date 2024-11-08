// Card values and functions
const cardValues = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

let userCards = [];
let computerCards = [];
let gameOver = false;

// Deal a random card
function dealCard() {
    return cardValues[Math.floor(Math.random() * cardValues.length)];
}

// Calculate score for given cards
function calculateScore(cards) {
    let score = cards.reduce((total, card) => total + card, 0);
    cards.forEach((card, index) => {
        if (card === 11 && score > 21) {
            cards[index] = 1; // Adjust Ace value to 1 if score exceeds 21
        }
    });
    return cards.reduce((total, card) => total + card, 0);
}

// Display cards and scores
function displayCards() {
    document.getElementById("user-cards").textContent = userCards.join(', ');
    document.getElementById("computer-cards").textContent = computerCards.join(', ');
    document.getElementById("user-score").textContent = calculateScore(userCards);
    document.getElementById("computer-score").textContent = calculateScore(computerCards);
}

// Determine winner
function checkWinner() {
    const userScore = calculateScore(userCards);
    const computerScore = calculateScore(computerCards);
    let result = '';

    if (userScore > 21) {
        result = "You went over 21! You lose.";
    } else if (computerScore > 21) {
        result = "Computer went over 21! You win!";
    } else if (userScore === computerScore) {
        result = "It's a Draw.";
    } else if (userScore > computerScore) {
        result = "You win!";
    } else {
        result = "You lose.";
    }

    document.getElementById("game-result").textContent = result;
    gameOver = true;
}

// Computer's turn to draw cards
function computerPlay() {
    let computerScore = calculateScore(computerCards);
    while (computerScore < 17) {
        computerCards.push(dealCard());
        computerScore = calculateScore(computerCards);
        displayCards();
    }
    checkWinner();
}

// Initialize game
function startGame() {
    userCards = [dealCard(), dealCard()];
    computerCards = [dealCard(), dealCard()];
    gameOver = false;
    displayCards();
    document.getElementById("game-result").textContent = "";
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;
}

// Event listeners for buttons
document.getElementById("hit-button").addEventListener("click", () => {
    if (!gameOver) {
        userCards.push(dealCard());
        displayCards();
        if (calculateScore(userCards) > 21) {
            checkWinner();
        }
    }
});

document.getElementById("stand-button").addEventListener("click", () => {
    if (!gameOver) {
        computerPlay();
    }
});

document.getElementById("restart-button").addEventListener("click", () => {
    startGame();
});

// Start game on page load
window.onload = startGame;
