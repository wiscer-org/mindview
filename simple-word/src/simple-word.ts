document
    .addEventListener('DOMContentLoaded', () => {
        let game = new SimpleWord();
    });


import * as Mv from '../../src/Mv'
class SimpleWord extends Mv.Game {
    // Define words to be shuffled
    static words: string[] = ["cat", "dog", "sun", "moon", "tree", "book", "fish", "bird", "star", "home"];
    infoModal: Mv.Modal;
    resultModal: Mv.Modal;
    currentWord: string;

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
        this.currentWord = SimpleWord.words[Math.floor(Math.random() * SimpleWord.words.length)];
        // Update displayed word
        document.body.textContent = this.currentWord;
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
        return `Current Word: ${this.currentWord}`
    }
    onclickNextButton(): void {
        this.newGame();
    }
}
