import { Game } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameElement = document.getElementById('game');
    new Game(gameElement);
});
