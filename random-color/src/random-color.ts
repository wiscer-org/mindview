document
    .addEventListener('DOMContentLoaded', () => {
        let game = new RandomColor();

    });


import * as Mv from '../../src/Mv'
class RandomColor extends Mv.Game {
    // Define colors to be shuffled
    static colors: string[] = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "black", "white"];
    infoModal: Mv.Modal;
    resultModal: Mv.Modal;
    randomColor: string;

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

        this.composer.start();

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
            title: 'Current Color',
            content: this.createResultModalContent(),
        }, [[nextButton, Mv.ModalButtonBehaviour.callbackAndClose]]);
    }
    createResultModalContent(): string {
        return `The current color displayed on screen is ${this.randomColor}.`;
    }
    initInfoModal() {
        // Init modal component here
        this.infoModal = Mv.Modals.alpha({
            title: 'Random Color Game',
            content: '<p>Objective of this game is to guess the color on the screen.</p><p>If screen reader is activated,  click on the "Result" button to let screen reader reads the current color.</p>'
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
        // Generate random color
        this.randomColor = RandomColor.colors[Math.floor(Math.random() * RandomColor.colors.length)];
        // Update color
        document.body.style.backgroundColor = this.randomColor;
    }
    pause(): void {
        throw new Error('Method pause not implemented.');
    }
    resume(): void {
        throw new Error('Method resume not implemented.');
    }
    end(): void {
        throw new Error('Method end not implemented.');
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
        return `Current Color: ${this.randomColor}`
    }
    onclickNextButton(): void {
        this.newGame();
    }
}
