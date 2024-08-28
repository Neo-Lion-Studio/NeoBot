export class Ball {
    constructor(element, gameSize) {
        this.element = element;
        this.speedY = 5;
        this.width = 45;
        this.height = 45;
        this.x = parseInt(element.style.left);
        this.y = parseInt(element.style.top);
        this.currentFrame = 0;
        this.startAnimation();
    }

    update(gravity, gameSize) {
        this.speedY += gravity;
        this.y += this.speedY;
        this.y = Math.max(0, Math.min(this.y, gameSize - this.height));
        this.element.style.top = this.y + 'px';
    }

    jump(gravity) {
        this.speedY = -10 * gravity;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
    
    startAnimation() {
        setInterval(() => {
            this.currentFrame = (this.currentFrame + 1) % 4;
            this.element.className = `ball ball${this.currentFrame + 1}`;
        }, 50);
    }
}
