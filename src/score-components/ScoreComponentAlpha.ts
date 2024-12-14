import { ScoreComponent } from '../abstracts/ScoreComponent';

export class ScoreAlpha extends ScoreComponent {
    constructor() {
        super();

        // TODO Setup the score element

    }
    /**
     * Animation to show score. Usually at start of a new game.
     * @returns 
     */
    animateShow(): Promise<void> {
        this.element.textContent = this.score.toString();

        // Add animation class
        this.element.classList.add("pop-in");

        // Remove animation class when animation ends
        return new Promise(resolve => {
            this.element.addEventListener("animationend", () => {
                this.element.classList.remove("pop-in");
                resolve();
            })
        });
    }
    /**
     * Animation to update score. Usually when the score changes.
     * @returns Promise<void>
     */
    animateScoreUpdate(): Promise<void> {
        this.element.textContent = this.score.toString();

        // Add animation class
        const animationClass = "pop";
        this.element.classList.add(animationClass);

        // Remove pop-in class when animation ends
        return new Promise(resolve => {
            this.element.addEventListener("animationend", () => {
                this.element.classList.remove(animationClass);
                resolve();
            })
        });
    }

}
