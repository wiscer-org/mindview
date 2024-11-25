document
    .addEventListener('DOMContentLoaded', () => {
        let game = new RandomColor();

        console.log("Hello World");
    });


import * as Mv from '../../src/Mv'
class RandomColor extends Mv.Game {
    // Define colors to be shuffled
    static colors: string[] = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "black", "white"];

    constructor() {
        console.log('at constructor');
        super();

        this.composer = Mv.Composers.Alpha(this);

        this.composer.addButton(Mv.Buttons.home());
        this.composer.addButton(Mv.Buttons.info());
        this.composer.addButton(Mv.Buttons.result());

        this.composer.start();
        console.log('finish constructor')
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

}
