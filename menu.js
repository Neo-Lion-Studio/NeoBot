import { Game } from './game.js';

export class Menu {
    constructor(container) {
        this.container = container;
        this.menuScreen = document.getElementById('menuScreen');
        this.gameScreen = document.getElementById('game');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.difficultyLevel = 3;
        this.highScore = localStorage.getItem('highScore') || 0;
    }

    init() {
        this.bindEvents();
        this.showHighScore();
    }

    bindEvents() {
        document.getElementById('startGame').addEventListener('click', () => this.startGame());
        document.getElementById('chooseDifficulty').addEventListener('click', () => this.toggleDifficultySelector());
        document.getElementById('showHighScore').addEventListener('click', () => this.showHighScore());
        document.getElementById('showHighScoreEnd').addEventListener('click', () => this.showHighScore());
        document.getElementById('backToMenu').addEventListener('click', () => this.showMenu());

        const difficultyButtons = document.querySelectorAll('.difficultyBtn');
        difficultyButtons.forEach(button => {
            button.addEventListener('click', (e) => this.setDifficulty(e.target.dataset.level));
        });
    }

    startGame() {
        this.menuScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';
        this.gameOverScreen.style.display = 'none';

        const game = new Game(this.gameScreen, this.difficultyLevel);
        game.onGameOver = (score) => this.showGameOver(score);
    }

    showMenu() {
        this.menuScreen.style.display = 'block';
        this.gameScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'none';
    }

    showGameOver(score) {
        this.gameScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'block';
        document.getElementById('finalScore').textContent = `你的得分: ${score}`;

        if (score > this.highScore) {
            this.highScore = score;
            localStorage.setItem('highScore', this.highScore);
        }
    }

    toggleDifficultySelector() {
        const selector = document.getElementById('difficultySelector');
        selector.style.display = selector.style.display === 'none' ? 'block' : 'none';
    }

    setDifficulty(level) {
        this.difficultyLevel = parseInt(level);
        this.toggleDifficultySelector();
    }

    showHighScore() {
        document.getElementById('highScore').textContent = `最高分: ${this.highScore}`;
    }
}
