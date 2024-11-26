document
    .addEventListener('DOMContentLoaded', () => {
        let game = new RandomColor();

    });


import * as Mv from '../../src/Mv'
class RandomColor extends Mv.Game {
    // Define colors to be shuffled
    static colors: string[] = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "black", "white"];
    infoModal: Mv.Modal;

    constructor() {
        super();

        // Init composer
        this.composer = Mv.Composers.Alpha(this);

        // Set up buttons
        let infoButton = Mv.Buttons.info({
            onclick: this.infoButtonOnClick.bind(this)
        });
        let resultButton = Mv.Buttons.result({
            onclick: this.resultButtonOnClick.bind(this)
        });

        this.composer.addButton(Mv.Buttons.home());
        this.composer.addButton(infoButton);
        this.composer.addButton(resultButton);

        this.composer.start();

        // Init modal component here
        this.infoModal = Mv.Modals.alpha({
            title: 'Random Color',
            content: '<p>Guess the color on the screen.</p><p>Activate screen reader,  and click on the "Result" button to know the current color.</p>'
        });
    }
    init(): void {
        throw new Error('Method init not implemented.');
    }
    start(): void {
        // Start game now
        this.infoModal.show();
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
    infoButtonOnClick(): void {
        throw new Error('Method InfoButtonOnClick not implemented.');
    }
    resultButtonOnClick(): void {
        throw new Error('Method resultButtonOnClick not implemented.');
    }
}
