document
    .addEventListener('DOMContentLoaded', () => {
        let game = new SimilarColors();

        window.addEventListener('resize', () => {
            game.resizeCanvas()
        });
    });


import * as Mv from '../../src/Mv'
class SimilarColors extends Mv.Game {
    upperHalfRect: UpperHalfRect = UpperHalfRect.UPPER;
    colorPair: [string, string] = ["black", "white"];  // To imitialize only
    init(): void {
        throw new Error('Method not implemented.');
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
    // Define colors to be matched
    static colors: string[] = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "black", "white"];
    infoModal: Mv.Modal;
    resultModal: Mv.Modal;
    canvas: HTMLCanvasElement;

    constructor() {
        super();

        // Setup and resize canvas
        this.setupAndResizeCanvas();

        // Init composer
        this.composer = Mv.Composers.Alpha(this);

        // Set up buttons
        let infoButton = Mv.Buttons.info({
            onclick: this.infoButtonOnclick.bind(this)
        });
        let resultButton = Mv.Buttons.result({
            onclick: this.resultButtonOnclick.bind(this)
        });

        this.composer.addButton(Mv.Buttons.home());
        this.composer.addButton(infoButton);
        this.composer.addButton(resultButton);

        this.composer.start();

        this.initInfoModal();
        this.initResultModal();
    }

    setupAndResizeCanvas() {
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            document.body.appendChild(this.canvas);
        }
        this.resizeCanvas();
    }

    initResultModal() {
        // Next button inside result modal, will start next game
        let nextButton = Mv.Buttons.next({
            onclick: this.onclickNextButton.bind(this)
        });

        // Init result modal
        this.resultModal = Mv.Modals.alpha({
            title: 'Similar Colors',
            content: this.createResultModalContent(),
        }, [[nextButton, Mv.ModalButtonBehaviour.callbackAndClose]]);
    }

    createResultModalContent(): string {
        let content = '';
        switch (this.upperHalfRect) {
            case UpperHalfRect.UPPER_LEFT:
                content = 'The upper left half is';
                break;
            case UpperHalfRect.UPPER_RIGHT:
                content = 'The upper right half is';
                break;
            case UpperHalfRect.UPPER:
                content = 'The upper half is';
                break;
            case UpperHalfRect.LEFT:
                content = 'The left half is';
                break;
            default:
                throw new Error('Invalid upper half rect to create result modal content');
        }

        content = `${content} color is ${this.colorPair[0]}, and the rest color is ${this.colorPair[1]}`;

        return content;
    }

    initInfoModal() {
        // Init modal component here
        this.infoModal = Mv.Modals.alpha({
            title: 'Similar Colors Game',
            content: '<p>Objective of this game is to identify similar colors on the screen.</p><p>If screen reader is activated, click on the "Result" button to let screen reader read the current colors.</p>'
        }, []);
    }

    start(): void {
        // Start game now
        this.infoModal.show();
        this.newGame();
    }

    newGame() {
        // randomize colors layout
        this.randomizeUpperHalfRect();

        // randomize colors
        this.colorPair = Mv.libs.colors.randomSimilarColorPair();

        // Draw canvas
        this.drawCanvas();

        // TODO update properties to be  reflected in result modal later on click
    }
    drawCanvas() {
        // Draw whole canvas with the second color
        const ctx = this.canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context is null');
        ctx.fillStyle = this.colorPair[1];
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the half part of canvas, based on the layout position, with the first color
        ctx.fillStyle = this.colorPair[0];
        switch (this.upperHalfRect) {
            case UpperHalfRect.UPPER_LEFT:
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, this.canvas.height);
                ctx.lineTo(this.canvas.width, 0);
                ctx.closePath();
                ctx.fill();
                break;
            case UpperHalfRect.UPPER_RIGHT:
                ctx.beginPath();
                ctx.moveTo(this.canvas.width, 0);
                ctx.lineTo(this.canvas.width, this.canvas.height);
                ctx.lineTo(0, 0);
                ctx.closePath();
                ctx.fill();
                break;
            case UpperHalfRect.UPPER:
                ctx.fillRect(0, 0, this.canvas.width, this.canvas.height / 2);
                break;
            case UpperHalfRect.LEFT:
                ctx.fillRect(0, 0, this.canvas.width / 2, this.canvas.height);
                break;
            default:
                console.error(`error layout: ${this.upperHalfRect}`);
                throw new Error('Invalid upper half rect');
        }



    }

    randomizeUpperHalfRect() {
        const values = Object.values(UpperHalfRect);
        const randomIndex = Math.floor(Math.random() * values.length);
        this.upperHalfRect = values[randomIndex] as UpperHalfRect;
    }

    getAssetsToLoad(): string[] {
        return []
    }

    infoButtonOnclick(): void {
        this.infoModal.show();
    }

    resultButtonOnclick(): void {
        this.resultModal.titleElement.textContent = this.createResultModalTitle();
        this.resultModal.contentElement.textContent = this.createResultModalContent();
        this.resultModal.show();
    }

    createResultModalTitle(): string {
        return `${this.colorPair[0]} and ${this.colorPair[1]}`;
    }

    onclickNextButton(): void {
        this.newGame();
    }

    resizeCanvas() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth || document.documentElement.clientWidth;
            this.canvas.height = window.innerHeight || document.documentElement.clientHeight;
        }
    }
}
/**
 * Only list half side of a rectangle
 * !important: assign string not number. Assigning number will cause error in switch-case (will often go to 'default'case)
 */
enum UpperHalfRect {
    UPPER_LEFT = 'UL',
    UPPER_RIGHT = 'UR',
    UPPER = 'U',
    LEFT = 'R',
}