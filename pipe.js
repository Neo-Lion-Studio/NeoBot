export class Pipe {
    constructor(position, gameSize, gameElement) {
        this.x = position;
        this.width = 52;
        this.gameSize = gameSize;
        this.gameElement = gameElement;
        this.generatePipe();
    }

    generatePipe() {
        const pipeType = Math.floor(Math.random() * 3);
        switch (pipeType) {
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
                this.downPipeH = this.gameSize - this.downPipeY;
                break;
            case 2:
                this.upPipeY = 0;
                this.upPipeH = parseInt(Math.random() * 150) + 100;
                this.downPipeY = this.upPipeH + 150;
                this.downPipeH = this.gameSize - this.downPipeY;
                break;
        }

        this.createPipeElements();
    }

    createPipeElements() {
        this.divUp = document.createElement("div");
        this.divUp.className = "pipeU";
        this.updatePipeStyle(this.divUp, this.upPipeY, this.upPipeH);

        this.divDown = document.createElement("div");
        this.divDown.className = "pipeD";
        this.updatePipeStyle(this.divDown, this.downPipeY, this.downPipeH);

        this.gameElement.appendChild(this.divUp);
        this.gameElement.appendChild(this.divDown);
    }

    updatePipeStyle(element, y, height) {
        element.style.left = this.x + "px";
        element.style.top = y + "px";
        element.style.width = this.width + "px";
        element.style.height = height + "px";
    }

    update(speed) {
        this.x -= speed;
        this.divUp.style.left = this.x + "px";
        this.divDown.style.left = this.x + "px";
        console.log("Pipe position:", this.x);
    }

    reset(gameSize) {
        this.x = gameSize;
        this.generatePipe();
    }

    checkCollision(ball) {
        const ballX = ball.getX();
        const ballY = ball.getY();
        const ballRight = ballX + ball.width;
        const ballBottom = ballY + ball.height;

        const clsUp = (ballRight > this.x) && (ballX < this.x + this.width) && (ballY < this.upPipeH);
        const clsDown = (ballRight > this.x) && (ballX < this.x + this.width) && (ballBottom > this.downPipeY);

        if (clsUp || clsDown) {
            console.log("Collision detected");
            return true;
        }

        return false;
    }
}
