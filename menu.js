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
    showHighScores() {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const highScoreElement = document.getElementById('highScore');
        highScoreElement.innerHTML = '<h3>最高积分</h3>' + 
            highScores.map((score, index) => `<p>${index + 1}. ${score}</p>`).join('');
        highScoreElement.style.display = 'block';
    }
    bindEvents() {
        document.getElementById('startGame').addEventListener('click', () => this.startGame());
        document.getElementById('chooseDifficulty').addEventListener('click', () => this.toggleDifficultySelector());
        document.getElementById('showHighScoreEnd').addEventListener('click', () => {
            this.showHighScores();
        });
        document.getElementById('backToMenu').addEventListener('click', () => {
            this.resetGame();
            this.showMenu());
        });
        document.getElementById('showHighScore').addEventListener('click', () => {
            this.showHighScores();
        });

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

    resetGame() {
        this.gameContainer.innerHTML = `
            <div id="menuScreen" class="screen">
                <h1>Flappy Ball</h1>
                <button id="startGame">开始游戏</button>
                <button id="chooseDifficulty">选择难度</button>
                <button id="showHighScore">积分记录</button>
                <div id="difficultySelector" style="display: none;">
                    <button class="difficultyBtn" data-level="1">简单</button>
                    <button class="difficultyBtn" data-level="2">普通</button>
                    <button class="difficultyBtn" data-level="3">中等</button>
                    <button class="difficultyBtn" data-level="4">困难</button>
                    <button class="difficultyBtn" data-level="5">极难</button>
                </div>
                <div id="highScore"></div>
            </div>
            <div id="game" class="screen" style="display: none;">
                <div id="ball" class="ball ball1"></div>
                <div id="score">0</div>
            </div>
            <div id="gameOverScreen" class="screen" style="display: none;">
                <h2>游戏结束</h2>
                <p id="finalScore"></p>
                <button id="showHighScoreEnd">积分记录</button>
                <button id="backToMenu">回到菜单</button>
            </div>
        `;
        this.init();
    }
	
}
