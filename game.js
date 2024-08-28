import { Ball } from './ball.js';
import { Pipe } from './pipe.js';

export class Game {
    constructor(gameElement, difficultyLevel) {
        this.gameElement = gameElement;
        this.gameSize = Math.min(window.innerWidth, window.innerHeight) - 40;
        this.ball = null;
        this.pipes = [];
        this.score = 0;
        this.gameover = false;
        this.difficultyLevel = difficultyLevel;
        this.difficultySettings = {
            1: { pipeSpeed: 0.5, pipeCount: 2, gravity: 0.5 },
            2: { pipeSpeed: 1, pipeCount: 3, gravity: 0.75 },
            3: { pipeSpeed: 1.5, pipeCount: 4, gravity: 1 },
            4: { pipeSpeed: 2, pipeCount: 5, gravity: 1.25 },
            5: { pipeSpeed: 2.5, pipeCount: 6, gravity: 1.5 }
        };
        this.onGameOver = null;
        this.gameElement.style.display = 'block';
        this.init();
    }

    init() {
        console.log("Game initializing...");
        this.gameElement.style.width = this.gameSize + 'px';
        this.gameElement.style.height = this.gameSize + 'px';
        this.gameElement.innerHTML = '';
        const ballElement = document.createElement('div');
        ballElement.id = 'ball';
        ballElement.className = 'ball ball1';
        ballElement.style.position = 'absolute';
        ballElement.style.left = '100px';
        ballElement.style.top = '100px';
        this.gameElement.appendChild(ballElement);
        console.log("Ball element created:", ballElement);
        this.ball = new Ball(ballElement, this.gameSize);
        const scoreElement = document.createElement('div');
        scoreElement.id = 'score';
        scoreElement.textContent = '0';
        this.gameElement.appendChild(scoreElement);        
        for (let i = 0; i < this.difficultySettings[this.difficultyLevel].pipeCount; i++) {
            this.pipes.push(new Pipe(this.gameSize / this.difficultySettings[this.difficultyLevel].pipeCount * i + 350, this.gameSize, this.gameElement));
        }        
        this.bindEvents();
        this.startGameLoop();        
        console.log("Game initialized");
    }

    bindEvents() {
        document.onmousedown = () => {
            this.ball.jump(this.difficultySettings[this.difficultyLevel].gravity);
        };
    }

    startGameLoop() {
        const loop = () => {
            this.update();
            if (!this.gameover) {
                requestAnimationFrame(loop);
            }
        };
        requestAnimationFrame(loop);
    }
    
    update() {
        if (this.gameover) {
            if (this.onGameOver) {
                this.onGameOver(this.score);
            }
            return;
        }

        this.ball.update(this.difficultySettings[this.difficultyLevel].gravity, this.gameSize);
        this.updatePipes();
        this.checkCollisions();
        this.updateScore();

        if (this.ball.getY() >= this.gameSize - this.ball.height || this.ball.getY() <= 0) {
            this.endGame();
        }
    }

    checkCollisions() {
        this.pipes.forEach(pipe => {
            if (pipe.checkCollision(this.ball)) {
                console.log("Collision detected");
                this.endGame();
            }
        });
    }

    endGame() {
        console.log("Game Over");
        this.gameover = true;
        if (this.onGameOver) {
            this.onGameOver(this.score);
        }
    }

    updatePipes() {
        this.pipes.forEach(pipe => {
            pipe.update(this.difficultySettings[this.difficultyLevel].pipeSpeed);
            if (pipe.x < -52) {
                pipe.reset(this.gameSize);
                this.score++;
            }
        });
    }

    updateScore() {
        document.getElementById('score').textContent = this.score;
    }
}
