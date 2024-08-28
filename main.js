import { Game } from './game.js';
import { Menu } from './menu.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded");
    const gameContainer = document.getElementById('gameContainer');
    const menu = new Menu(gameContainer);
    menu.init();
    console.log("Menu initialized");
});
