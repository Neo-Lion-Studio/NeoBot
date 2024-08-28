import { Game } from './game.js';

export class Menu {
    constructor(container) {
        this.container = container;
        this.menuScreen = document.getElementById('menuScreen');
        this.gameScreen = document.getElementById('game');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.difficultySelector = document.getElementById('difficultySelector');
        this.highScoreElement = document.getElementById('highScore');
        this.highScoreElement2 = document.getElementById('gameOverHighScore');       
        this.finalScoreElement = document.getElementById('finalScore');
        this.currentDifficulty = 1;
        this.highScores = JSON.parse(localStorage.getItem('highScores')) || {};
    }

    init() {
        this.bindEvents();
        this.showMenu();
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
        console.log("Starting game...");
        this.menuScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';
        this.gameOverScreen.style.display = 'none';
    
        const game = new Game(this.gameScreen, this.currentDifficulty);
        console.log("Game started");
        game.onGameOver = (score) => {
            console.log("Game over, score:", score);
            this.gameOver(score);
        };
    }

    gameOver(score) {
        this.updateHighScore(score);
        this.finalScoreElement.textContent = `Your score: ${score}`;
        this.gameScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'flex';
    }
    showMenu() {
        this.menuScreen.style.display = 'flex';
        this.gameScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'none';
        this.difficultySelector.style.display = 'none';
        this.highScoreElement.style.display = 'none';
        this.highScoreElement2.style.display = 'none';        
    }

    toggleDifficultySelector() {
        this.difficultySelector.style.display = this.difficultySelector.style.display === 'none' ? 'block' : 'none';
    }

    setDifficulty(level) {
        this.currentDifficulty = parseInt(level);
        document.querySelectorAll('.difficultyBtn').forEach(btn => btn.classList.remove('selected'));
        document.querySelector(`.difficultyBtn[data-level="${level}"]`).classList.add('selected');
    }

    updateHighScore(score) {
        if (!this.highScores[this.currentDifficulty] || score > this.highScores[this.currentDifficulty]) {
            this.highScores[this.currentDifficulty] = score;
            localStorage.setItem('highScores', JSON.stringify(this.highScores));
        }
    }

    showHighScore() {
        let highScoreText = 'High Scores:\n';
        for (let difficulty in this.highScores) {
            highScoreText += `Difficulty ${difficulty}: ${this.highScores[difficulty]}\n`;
        }

        this.highScoreElement.textContent = highScoreText;
        this.highScoreElement2.textContent = highScoreText;        
        this.highScoreElement2.style.display = 'block';        
        this.highScoreElement.style.display = 'block';
    }
        resetGame(){
            this.difficultyLevel = 3;
            this.showMenu();
            this.gameScreen.innerHTML = '';
            this.highScoreElement.style.display = 'none';
            this.highScoreElement2.style.display = 'none';            
            this.toggleDifficultySelector();
            document.querySelectorAll('.difficultyBtn').forEach(btn => {
                btn.classList.remove('selected');
            });
            document.querySelector('.difficultyBtn[data-level="3"]').classList.add('selected');
        }
	
}
