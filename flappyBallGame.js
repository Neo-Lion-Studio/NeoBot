class FlappyBall {
    constructor(gameElement, difficultyLevel) {
        this.gameElement = gameElement;
        this.gameContainer = gameElement.querySelector('#gameContainer');
        this.game = gameElement.querySelector('#game');
        this.ballEle = gameElement.querySelector('#ball');
        this.scoreElement = gameElement.querySelector('#score');
        this.gameover = false;
        this.score = 0;
        this.sky = { position: 0 };
        this.difficultyLevel = difficultyLevel;
        this.difficultySettings = {
            1: { pipeSpeed: 0.5, pipeCount: 2, gravity: 0.5 },
            2: { pipeSpeed: 0.75, pipeCount: 3, gravity: 0.75 },
            3: { pipeSpeed: 1, pipeCount: 4, gravity: 1 },
            4: { pipeSpeed: 1.25, pipeCount: 5, gravity: 1.25 },
            5: { pipeSpeed: 1.5, pipeCount: 6, gravity: 1.5 }
        };
        this.ball = {
            entity: this.ballEle,
            speedX: 5,
            speedY: 5,
            x: this.ballEle.offsetLeft,
            y: this.ballEle.offsetTop
        };
        this.pipes = [];
        
        this.init();
    }

    init() {
        this.setGameSize();
        this.createPipes();
        this.startGameLoop();
        this.attachEventListeners();
    }

    setGameSize() {
        const screenWidth = window.innerWidth;
        const gameSize = Math.min(screenWidth - 40, 600); 
        this.gameContainer.style.width = gameSize + 'px';
        this.gameContainer.style.height = gameSize + 'px';
    }

    createPipes() {
        for (let i = 0; i < this.difficultySettings[this.difficultyLevel].pipeCount; i++) {
            this.pipes.push(new Pipe(gameSize / this.difficultySettings[this.difficultyLevel].pipeCount * i + 350));
        }
    }

    startGameLoop() {
        this.gameLoop();
        this.updateBallPosition();
        this.animateBall();
        this.attachEventListeners();
    }

    gameLoop() {
        setInterval(() => {
            if (!this.gameover) {
                this.pipes.forEach(pipe => {
                    pipe.move();
                    if (pipe.checkCollision(this.ball)) {
                        this.gameover = true;
                    }
                });
                this.updateScore();
            }
        }, 10);
    }

    updateBallPosition() {
        setInterval(() => {
            if (!this.gameover) {
                this.ball.speedY += this.difficultySettings[this.difficultyLevel].gravity;
                this.ball.y += this.ball.speedY;
                if (this.ball.y > gameSize - 45) {
                    this.ball.y = gameSize - 45;
                    this.gameover = true;
                }
                if (this.ball.y < 0) {
                    this.ball.y = 0;
                    this.gameover = true;
                }
                this.ball.entity.style.top = this.ball.y + "px";
            }
        }, 25);
    }

    animateBall() {
        let currentFrame = 0;
        setInterval(() => {
            if (!this.gameover) {
                switch (currentFrame % 4) {
                    case 0:
                        this.ball.entity.className = 'ball ball1';
                        break;
                    case 1:
                        this.ball.entity.className = 'ball ball2';
                        break;
                    case 2:
                        this.ball.entity.className = 'ball ball3';
                        break;
                    case 3:
                        this.ball.entity.className = 'ball ball4';
                        break;
                }
                currentFrame++;
            }
        }, 50);
    }

    attachEventListeners() {
        document.onmousedown = () => {
            this.ball.speedY = -10 * this.difficultySettings[this.difficultyLevel].gravity;
        };
    }

    updateScore() {
        this.pipes.forEach(pipe => {
            if (pipe.x < -52) {
                pipe.x = gameSize;
                this.score++;
                this.scoreElement.textContent = this.score;
            }
        });
    }
}

class Pipe {
    constructor(position) {
        this.x = position;  
        this.width = 52;
        this.pipeType = Math.floor(Math.random() * 3);
        switch (this.pipeType) {
            case 0: 
                this.upPipeY = 0;  
                this.upPipeH = parseInt(Math.random() * 175) + 100; 
                this.downPipeY = this.upPipeH + 600;  
                this.downPipeH = 0.1; 
                break;
            case 1: 
                this.upPipeY = 0;  
                this.upPipeH = 0.1; 
                this.downPipeY = parseInt(Math.random() * 175) + 200;  
                this.downPipeH = gameSize - this.downPipeY; 
                break;
            case 2: 
                this.upPipeY = 0;  
                this.upPipeH = parseInt(Math.random() * 150) + 100; 
                this.downPipeY = this.upPipeH + 150;  
                this.downPipeH = gameSize - this.downPipeY;  
                break;
        }
        this.divUp = document.createElement("div");
        this.divUp.className = "pipeU";
        this.divUp.style.left = this.x + "px";
        this.divUp.style.top = this.upPipeY + "px";
        this.divUp.style.width = this.width + "px";
        this.divUp.style.height = this.upPipeH + "px";
        
        this.divDown = document.createElement("div");
        this.divDown.className = "pipeD";
        this.divDown.style.left = this.x + "px";
        this.divDown.style.top = this.downPipeY + "px";
        this.divDown.style.width = this.width + "px";
        this.divDown.style.height = this.downPipeH + "px";
        
        game.appendChild(this.divUp);
        game.appendChild(this.divDown);
    }

    move() {
        this.x -= this.difficultySettings[this.difficultyLevel].pipeSpeed;
        this.divUp.style.left = this.x + "px";
        this.divDown.style.left = this.x + "px";
    }

    checkCollision(ball) {
        const clsUp = (ball.x + 30 > _this.x) && (ball.x + 15< _this.x + 52) && (ball.y + 15 < _this.upPipeH);
        const clsDown = (ball.x + 30 > _this.x) && (ball.x + 15 < _this.x + 52) && (ball.y + 30 > _this.downPipeY);
        return clsUp || clsDown;
    }
}

export { FlappyBall };