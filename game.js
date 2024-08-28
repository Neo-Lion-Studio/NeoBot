import { Ball } from './ball.js';
import { Pipe } from './pipe.js';

export class Game {
    constructor(gameElement, difficultyLevel) {
        this.gameElement = gameElement;
        this.gameSize = Math.min(window.innerWidth - 40, 600);
        this.ball = null;
        this.pipes = [];
        this.score = 0;
        this.gameover = false;
        this.difficultyLevel = difficultyLevel;
        this.difficultySettings = {
            1: { pipeSpeed: 0.5, pipeCount: 2, gravity: 0.5 },
            2: { pipeSpeed: 0.75, pipeCount: 3, gravity: 0.75 },
            3: { pipeSpeed: 1, pipeCount: 4, gravity: 1 },
            4: { pipeSpeed: 1.25, pipeCount: 5, gravity: 1.25 },
            5: { pipeSpeed: 1.5, pipeCount: 6, gravity: 1.5 }
        };
        this.onGameOver = null;
        this.init();
    }

    init() {
        this.gameElement.style.width = this.gameSize + 'px';
        this.gameElement.style.height = this.gameSize + 'px';
        
        this.ball = new Ball(document.getElementById('ball'), this.gameSize);
        
        for (let i = 0; i < this.difficultySettings[this.difficultyLevel].pipeCount; i++) {
            this.pipes.push(new Pipe(this.gameSize / this.difficultySettings[this.difficultyLevel].pipeCount * i + 350, this.gameSize, this.gameElement));
        }

        this.bindEvents();
        this.startGameLoop();
    }

    bindEvents() {
        document.onmousedown = () => {
            this.ball.jump(this.difficultySettings[this.difficultyLevel].gravity);
        };
    }

    startGameLoop() {
        setInterval(() => this.update(), 25);
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

        if (this.ball.y > this.gameSize - 45 || this.ball.y < 0) {
            this.gameover = true;
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

    checkCollisions() {
        this.pipes.forEach(pipe => {
            if (pipe.checkCollision(this.ball)) {
                this.gameover = true;
            }
        });
    }

    updateScore() {
        document.getElementById('score').textContent = this.score;
    }
}
