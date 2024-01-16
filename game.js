const spaceship = document.getElementById('spaceship');
const gameContainer = document.getElementById('game-container');
let spaceshipPosition = 50; // Initial position in percentage

// Initialize Telegram Web App
Telegram.WebApp.ready();

function moveSpaceship(direction) {
    spaceshipPosition += (direction === 'left' ? -5 : 5);
    updateSpaceshipPosition();
}

function updateSpaceshipPosition() {
    spaceship.style.left = `${spaceshipPosition}%`;
}

Telegram.WebApp.MainButton.setText('Move Left');
Telegram.WebApp.MainButton.onClick(() => {
    moveSpaceship('left');
    toggleMainButton();
});

function toggleMainButton() {
    if (Telegram.WebApp.MainButton.text === 'Move Left') {
        Telegram.WebApp.MainButton.setText('Move Right');
    } else {
        Telegram.WebApp.MainButton.setText('Move Left');
    }
}

function createAsteroid() {
    const asteroid = document.createElement('div');
    asteroid.classList.add('asteroid');
    asteroid.style.left = `${Math.random() * 100}%`;
    gameContainer.appendChild(asteroid);

    let asteroidPosition = 0;
    function moveAsteroid() {
        asteroidPosition += 2;
        asteroid.style.top = `${asteroidPosition}px`;

        if (asteroidPosition < gameContainer.offsetHeight) {
            requestAnimationFrame(moveAsteroid);
        } else {
            asteroid.remove();
        }
    }
    moveAsteroid();
}

setInterval(createAsteroid, 2000);
