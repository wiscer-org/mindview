document
    .addEventListener('DOMContentLoaded', () => {
        let game = new PopTheBalloon();
    });

import * as Mv from '../../src/Mv'

class PopTheBalloon extends Mv.Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private canvasWidth: number = 0;
    private canvasHeight: number = 0;
    private balloonWidth: number = 0;
    private balloonHeight: number = 0;
    private balloonCenter: { x: number; y: number } = { x: 0, y: 0 };
    private balloonColor: string = '#ff0000';  // Default red color
    private balloonSize: number = 3;  // Default size
    private static initialLives: number = 5;
    private lives: number = PopTheBalloon.initialLives;  // Default number of lives
    private isGameActive: boolean = false;
    private _boundHandler: (e: MouseEvent | TouchEvent) => void;
    private popSound: HTMLAudioElement;
    private static popSoundSrc: string = 'https://www.soundjay.com/buttons/sounds/button-16.mp3';

    constructor() {
        super();
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = "fixed";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.zIndex = "1";
        this.ctx = this.canvas.getContext('2d')!;
        document.body.appendChild(this.canvas);

        // Initialize pop sound
        this.popSound = document.createElement('audio');
        this.popSound.src = PopTheBalloon.popSoundSrc;
        this.popSound.preload = 'auto';

        // Add pop animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes popAnimation {
                0% { transform: scale(1); opacity: 1; }
                100% { transform: scale(2); opacity: 0; }
            }
            .pop-animation {
                position: fixed;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                animation: popAnimation 0.3s ease-out forwards;
                pointer-events: none;
                z-index: 1000;
            }
        `;
        document.head.appendChild(style);

        // Setup event listeners
        window.addEventListener('resize', this.onCanvasResize.bind(this));

        // Setup and start composer
        this.setupAndStartComposer();

        this.initInfoModal();
        this.initResultModal();

        // Add listener to detect click / touch - bind the method to maintain context
        const boundHandler = this.handleCanvasInteraction.bind(this);
        this.canvas.addEventListener('click', boundHandler);
        this.canvas.addEventListener('touchstart', boundHandler);

        // Store the bound handler for later removal
        this._boundHandler = boundHandler;
    }

    private async setupAndStartComposer() {
        this.composer = Mv.Composers.Alpha(this);

        // Set up buttons
        const infoButton = Mv.Buttons.info({
            onclick: this.infoButtonOnclick.bind(this)
        });

        // Add buttons to composer
        this.composer.addButton(Mv.Buttons.home());
        this.composer.addButton(infoButton);

        // Init Score component
        this.composer.useScoreComponent();

        // Init lives component
        this.composer.useLivesComponent();

        // Automatically start the game after composer.start() finished
        this.composer.start();
    }

    async newGame(): Promise<void> {
        this.isGameActive = false

        // Set initial score
        this.composer?.setScore(0);
        // Set initial lives & wait animation to finish
        await this.composer?.setInitialLives(PopTheBalloon.initialLives);

        this.isGameActive = true;
        this.newRound();
    }

    private newRound() {
        this.moveBalloonRandomly();
    }

    private onCanvasResize(): void {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.measureUnits();
        this.drawCanvas();
    }

    private drawCanvas(): void {
        this.redrawBalloon();
    }

    private measureUnits(): void {
        // Calculate responsive units based on canvas width
        const baseUnit = Math.min(this.canvasWidth, this.canvasHeight) / 10;
        this.balloonWidth = baseUnit * 2;
        this.balloonHeight = baseUnit * 2.2;
    }

    private randomizeBalloonCenter(): void {
        const widthRadius = this.balloonWidth * 0.9;
        const heightRadius = this.balloonHeight * 1.1;

        // Ensure the balloon is fully visible within the canvas
        const x = Math.random() * (this.canvasWidth - 2 * widthRadius) + widthRadius;
        const y = Math.random() * (this.canvasHeight - 2 * heightRadius) + heightRadius;

        this.balloonCenter = { x, y };
    }

    private redrawBalloon(): void {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Balloon Body (Oval)
        const widthRadius = this.balloonWidth * 0.9;
        const heightRadius = this.balloonHeight * 1.1;
        this.ctx.beginPath();
        this.ctx.ellipse(this.balloonCenter.x, this.balloonCenter.y, widthRadius, heightRadius, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = this.balloonColor;
        this.ctx.fill();
        this.ctx.closePath();

        // Balloon Knot (Triangle)
        const knotHeight = heightRadius * 0.05;
        const knotWidth = heightRadius * 0.05;
        const triangleCenterX = this.balloonCenter.x;
        const triangleTopY = this.balloonCenter.y + heightRadius;
        const triangleLeftX = triangleCenterX - knotWidth / 2;
        const triangleRightX = triangleCenterX + knotWidth / 2;
        const triangleBottomY = triangleTopY + knotHeight;

        this.ctx.beginPath();
        this.ctx.moveTo(triangleCenterX, triangleTopY);
        this.ctx.lineTo(triangleLeftX, triangleBottomY);
        this.ctx.lineTo(triangleRightX, triangleBottomY);
        this.ctx.closePath();
        this.ctx.fillStyle = this.balloonColor;
        this.ctx.fill();

        // Balloon String (Curvy Line)
        const stringStartX = triangleCenterX;
        const stringStartY = triangleBottomY;
        const stringLength = heightRadius * 0.3;

        this.ctx.beginPath();
        this.ctx.moveTo(stringStartX, stringStartY);
        this.ctx.bezierCurveTo(
            stringStartX - 20, stringStartY + 60,
            stringStartX + 20, stringStartY + 120,
            stringStartX, stringStartY + stringLength
        );
        this.ctx.strokeStyle = '#555';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    private moveBalloonRandomly(): void {
        if (this.composer?.getLives
            && this.composer.getLives() > 0) {
            this.randomizeBalloonCenter();
            this.redrawBalloon();
        }
    }

    private isPointInBalloon(x: number, y: number): boolean {
        const widthRadius = this.balloonWidth * 0.9;
        const heightRadius = this.balloonHeight * 1.1;

        // Check if point is inside the oval (balloon body)
        const dx = (x - this.balloonCenter.x) / widthRadius;
        const dy = (y - this.balloonCenter.y) / heightRadius;
        const isInOval = (dx * dx + dy * dy) <= 1;

        // Check if point is inside the triangle (balloon knot)
        const triangleTopY = this.balloonCenter.y + heightRadius;
        const knotHeight = heightRadius * 0.05;
        const knotWidth = heightRadius * 0.05;
        const triangleLeftX = this.balloonCenter.x - knotWidth / 2;
        const triangleRightX = this.balloonCenter.x + knotWidth / 2;
        const triangleBottomY = triangleTopY + knotHeight;

        const isInTriangle =
            y >= triangleTopY &&
            y <= triangleBottomY &&
            x >= triangleLeftX &&
            x <= triangleRightX;

        return isInOval || isInTriangle;
    }

    private handleCanvasInteraction(event: MouseEvent | TouchEvent): void {
        event.preventDefault();
        event.stopPropagation();
        if (!this.isGameActive) return;

        const rect = this.canvas.getBoundingClientRect();
        let x: number, y: number;

        if (event.type === 'touchstart') {
            const touchEvent = event as TouchEvent;
            x = touchEvent.touches[0].clientX - rect.left;
            y = touchEvent.touches[0].clientY - rect.top;
        } else {
            const mouseEvent = event as MouseEvent;
            x = mouseEvent.clientX - rect.left;
            y = mouseEvent.clientY - rect.top;
        }

        if (this.isPointInBalloon(x, y)) {
            this.addScore();
            this.popSound.play();
            this.showPoppedBalloon(x, y);
            // this.moveBalloonRandomly();
            this.composer?.alert(`Great shot!`);
            this.newRound();
        } else {
            this.composer?.loseLives(1);
            let remainingLives = this.getLives();

            // Round out of lives
            if (remainingLives <= 0) {
                this.gameOver();
            } else {
                this.composer?.alert(`Missed! Lives remaining: ${remainingLives}`);
                this.newRound();
            }
        }

    }

    private getLives() {
        return this.composer?.getLives() || 0;
    }

    private addScore(): void {
        this.composer?.addScore(1);
    }

    private showPoppedBalloon(x: number, y: number): void {
        // Create a temporary div for the pop animation
        const popElement = document.createElement('div');
        popElement.style.position = 'fixed';  // Changed to fixed
        popElement.style.left = `${x - 25}px`;
        popElement.style.top = `${y - 25}px`;
        popElement.style.backgroundColor = this.balloonColor;
        popElement.style.zIndex = '1000';  // Ensure it's above canvas
        popElement.className = 'pop-animation';

        document.body.appendChild(popElement);

        // Remove the element after animation
        popElement.addEventListener('animationend', () => {
            if (popElement.parentNode) {  // Check if element still exists
                document.body.removeChild(popElement);
            }
        }, { once: true });
    }

    private gameOver(): void {
        // Show alert
        this.composer?.alert(`Game Over!`);
        // Update result modal content
        this.resultModal.setContent(this.createResultModalContent());
        this.resultModal.show();

        this.isGameActive = false;
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Remove event listeners using the stored bound handler
        // if (this._boundHandler) {
        //     this.canvas.removeEventListener('click', this._boundHandler);
        //     this.canvas.removeEventListener('touchstart', this._boundHandler);
        // }
    }

    startAgain(): void {
        this.newGame();
    }

    init(): void {
        throw new Error('Method not implemented.');
    }
    start(): void {
        this.infoModal.show();
        this.onCanvasResize();
        this.newGame();
    }
    pause(): void {
        throw new Error('Method not implemented.');
    }
    resume(): void {
        throw new Error('Method not implemented.');
    }
    end(): void {
        throw new Error('Method not implemented.');
    }
    getAssetsToLoad(): string[] {
        return [PopTheBalloon.popSoundSrc];
    }
    infoModal: Mv.Modal;
    resultModal: Mv.Modal;

    initInfoModal() {
        this.infoModal = Mv.Modals.alpha({
            title: 'Pop the Balloon Game',
            content: '<p>Objective of this game is to pop the balloon.</p><p>If screen reader is activated, click on the "Result" button to let screen reader read the current colors.</p>'
        }, []);
    }

    initResultModal() {
        this.resultModal = Mv.Modals.alpha({
            title: `Game Over`,
            content: this.createResultModalContent(),
            closeable: false,
        }, [[Mv.Buttons.next({ onclick: this.onclickNextButton.bind(this) }), Mv.ModalButtonBehaviour.callbackAndClose]]);
    }

    createResultModalContent(): string {
        return `
            <p>Congrats! You popped ${this.getScore()} balloons.</p>
        `;
    }

    private getScore() {
        return this.composer?.getScore() || 0;
    }

    infoButtonOnclick() {
        this.infoModal.show();
    }

    resultButtonOnclick() {
    }

    onclickNextButton() {
        this.newGame();
    }
}
