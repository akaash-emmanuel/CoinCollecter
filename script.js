const character = document.querySelector('.character');
const coinCounter = document.getElementById('counter');
const gameContainer = document.querySelector('.game-container');
const gameOverMessage = document.getElementById('game-over');

let coinCount = 0;
const totalCoins = 20; // Customize the number of coins
const characterSpeed = 30; // Customize character movement speed

// Function to create and position the coins randomly
function createCoin() {
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.left = Math.random() * (gameContainer.clientWidth - 30) + 'px';
    coin.style.top = Math.random() * (gameContainer.clientHeight - 30) + 'px';
    gameContainer.appendChild(coin);
}

for (let i = 0; i < totalCoins; i++) {
    createCoin();
}

document.addEventListener('keydown', (e) => {
    const characterRect = character.getBoundingClientRect();

    switch (e.key) {
        case 'w':
            if (characterRect.top > 0) {
                character.style.top = characterRect.top - characterSpeed + 'px';
            }
            break;
        case 'a':
            if (characterRect.left > 0) {
                character.style.left = characterRect.left - characterSpeed + 'px';
            }
            break;
        case 'd':
            if (characterRect.right < gameContainer.clientWidth) {
                character.style.left = characterRect.left + characterSpeed + 'px';
            }
            break;
        case 's':
            if (characterRect.bottom < gameContainer.clientHeight) {
                character.style.top = characterRect.top + characterSpeed + 'px';
            }
            break;
    }

    // Check for coin collection
    const coins = document.querySelectorAll('.coin');
    coins.forEach((coin) => {
        const coinRect = coin.getBoundingClientRect();

        if (
            characterRect.left < coinRect.right &&
            characterRect.right > coinRect.left &&
            characterRect.top < coinRect.bottom &&
            characterRect.bottom > coinRect.top
        ) {
            coin.style.display = 'none';
            coinCount++;

            if (coinCount === totalCoins) {
                gameOverMessage.style.display = 'block';
            }

            coinCounter.textContent = coinCount;
        }
    });
});

// Add this JavaScript function to your existing script.js

function closePopup() {
    const popup = document.getElementById('rules-popup');
    popup.style.display = 'none';
}

// Show the popup when the page loads
window.onload = function () {
    const popup = document.getElementById('rules-popup');
    popup.style.display = 'flex';
};

