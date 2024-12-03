document
    .addEventListener('DOMContentLoaded', () => {
        let game = new SimpleWord();

        window.addEventListener('resize', () => {
            game.redrawCanvas();
        });
    });



import * as Mv from '../../src/Mv'
class SimpleWord extends Mv.Game {
    // Define words to be shuffled
    infoModal: Mv.Modal;
    resultModal: Mv.Modal;
    canvas: HTMLCanvasElement;
    currentWord: string;
    currentZoomLevel: number = 10;
    minZoomLevel: number = 1;  // Words will be the smallest
    maxZoomLevel: number = 10; // Words, will be the largest
    static minFontSize: number = 8; // The minimum font size
    currentColor: string = "red";

    constructor() {
        super();

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

        // Add zoom controls
        let zoomControl = Mv.ZoomControls.alpha({
            onZoomIn: this.increaseZoomLevel.bind(this),
            onZoomOut: this.decreaseZoomLevel.bind(this)
        });
        this.composer.addZoomControl(zoomControl);

        this.composer.start();

        // Initialize canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        document.body.appendChild(this.canvas);
        this.resizeCanvas();

        this.initInfoModal();
        this.initResultModal();
    }
    initResultModal() {
        // Next button inside result modal, will start next game
        let nextButton = Mv.Buttons.next({
            onclick: this.onclickNextButton.bind(this)
        });

        // Init result modal
        this.resultModal = Mv.Modals.alpha({
            title: 'Current Word',
            content: this.createResultModalContent(),
        }, [[nextButton, Mv.ModalButtonBehaviour.callbackAndClose]]);
    }
    createResultModalContent(): string {
        return `The current word displayed on screen is "${this.currentWord}".`;
    }
    initInfoModal() {
        // Init modal component here
        this.infoModal = Mv.Modals.alpha({
            title: 'Simple Word Game',
            content: '<p>Objective of this game is to guess the word on the screen.</p><p>If screen reader is activated, click on the "Result" button to let screen reader reads the current word.</p>'
        }, []);
    }
    init(): void {
        throw new Error('Method init not implemented.');
    }
    start(): void {
        // Start game now
        this.infoModal.show();
        this.newGame();
    }
    newGame() {
        // Generate random word
        this.currentWord = this.randomizeWord();
        // Randomize color
        this.currentColor = this.randomizeColor();

        // Update displayed word
        this.redrawCanvas();
    }
    pause(): void {
        throw new Error('Method pause not implemented.');
    }
    resume(): void {
        throw new Error('Method resume not implemented.');
    }
    end(): void {
        if (this.canvas) {
            document.body.removeChild(this.canvas);
        }
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
        return `Current Word: ${this.currentWord}`
    }
    onclickNextButton(): void {
        this.newGame();
    }
    increaseZoomLevel(): void {
        if (this.currentZoomLevel < this.maxZoomLevel) {
            this.currentZoomLevel++;
            this.redrawCanvas();
        } else {
            this.currentZoomLevel = this.maxZoomLevel;
            // TODO toaster('Maximum oom level reached')
        }
    }

    decreaseZoomLevel(): void {
        if (this.currentZoomLevel > this.minZoomLevel) {
            this.currentZoomLevel--;
            this.redrawCanvas();
        } else {
            this.currentZoomLevel = this.minZoomLevel;
            // TODO toaster('Minimum oom level reached')
        }
    }
    redrawCanvas(): void {
        if (!this.canvas || !this.currentWord) return;

        // Get the canvas context
        const context = this.canvas.getContext('2d');
        if (!context) return;

        // Resize canvas to match display size
        this.resizeCanvas();

        // Clear the canvas
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Calculate the base font size based on zoom level (1-7)

        // Start with the base font size
        let fontSize = 700;
        context.font = `bold ${fontSize}px Arial`;
        let textMetrics = context.measureText(this.currentWord);

        // Adjust font size to fit width based on zoom level
        const canvasWidth = this.canvas.width - 20;  // 20px padding
        // Determine the max width of the word. The formula is based on approximation with minimal width is 100
        const maxWidth = (this.currentZoomLevel - this.minZoomLevel) / (this.maxZoomLevel - this.minZoomLevel) * (canvasWidth - 100);
        while (textMetrics.width > maxWidth && (fontSize - 20) > SimpleWord.minFontSize) {
            fontSize -= 20;
            context.font = `bold ${fontSize}px Arial`;
            textMetrics = context.measureText(this.currentWord);
        }

        // Center the word on the canvas
        const x = (this.canvas.width - textMetrics.width) / 2;
        const y = (this.canvas.height / 2) +
            ((textMetrics.actualBoundingBoxAscent - textMetrics.actualBoundingBoxDescent) / 2);
        context.fillStyle = this.currentColor;
        context.fillText(this.currentWord, x, y);
    }

    resizeCanvas(): void {
        if (!this.canvas) return;
        // Set canvas size to match display size
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    randomizeWord() {
        const randomWords = ["cat", "dog", "sun", "sky", "pen", "cup", "hat", "bat", "run", "fan", "dew",
            "box", "lid", "net", "rat", "log", "pot", "tip", "map", "nap", "dot", "sip", "kit", "jar",
            "rib", "tap", "pit", "bug", "fox", "gem", "hill", "kite", "leaf", "milk", "nest", "owl", "nil",
            "sun", "moon", "star", "cake", "ice", "red", "cookie", "fun", "play", "nice", "run", "eat",
            "bird", "seal", "owl", "cow", "donut", "ball", "sweet", "candy", "chips", "pop", "straw",
            "cloud", "wind", "tree", "soil", "plum", "blue", "bike", "hand", "party", "rib", "mic", "neon",
            "snack", "ball", "soon", "swim", "pan", "jump", "laugh", "tie", "hug",
            "cat", "dog", "sun", "moon", "tree", "book", "fish", "bird", "star", "home", "beach"];
        return randomWords[Math.floor(Math.random() * randomWords.length)];
    }
    // Function to randomize color
    randomizeColor() {
        const colors = ["red", "darkblue", "darkgreen", "darkorange", "brown", "darkyellow", "darkpurple"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

}