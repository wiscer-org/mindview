document
    .addEventListener('DOMContentLoaded', () => {
        let game = new RandomColor();

    });


import { InfoButton } from '../../src/buttons/Info';
import * as Mv from '../../src/Mv'
class RandomColor extends Mv.Game {
    // Define colors to be shuffled
    static colors: string[] = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "black", "white"];

    constructor() {
        super();

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
    }
    init(): void {
        throw new Error('Method init not implemented.');
    }
    start(): void {
        // Start game now
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
