import { Game } from './game.js';
import { Menu } from './menu.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const menu = new Menu(gameContainer);
    menu.init();
});
