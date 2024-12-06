import { ScoreComponent } from '../abstracts/ScoreComponent';

export class ScoreAlpha extends ScoreComponent {
    constructor() {
        super();

        // TODO Setup the score element

    }
    animateShow(): Promise<void> {
        // TODO animate when attaching score element

        return Promise.resolve();
    }
    animateScoreUpdate(): Promise<void> {
        // TODO animate when updating score
        this.element.textContent = this.score.toString();
        this.element.classList.add("pop-in");

        // Remove pop-in class when animation ends
        return new Promise(resolve => {
            this.element.addEventListener("animationend", () => {
                this.element.classList.remove("pop-in");
                resolve();
            })
        })
    }

}
