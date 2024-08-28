export class Ball {
    constructor(element, gameSize) {
        this.entity = element;
        this.speedY = 5;
        this.x = element.offsetLeft;
        this.y = element.offsetTop;
        this.currentFrame = 0;
        this.startAnimation();
    }

    update(gravity, gameSize) {
        this.speedY += gravity;
        this.y += this.speedY;
        this.y = Math.max(0, Math.min(this.y, gameSize - 45));
        this.entity.style.top = this.y + 'px';
    }

    jump(gravity) {
        this.speedY = -10 * gravity;
    }

    startAnimation() {
        setInterval(() => {
            this.currentFrame = (this.currentFrame + 1) % 4;
            this.entity.className = `ball ball${this.currentFrame + 1}`;
        }, 50);
    }
}
