/**
 * Abstract class for score, contains logical methods for score.
 */
export abstract class ScoreComponent {
    protected score: number = 0;
    constructor() {
        this.element.textContent = this.score.toString();
        this.element.id = "score";
        this.element.classList.add('fiery-text');
    }

    public getScore(): number {
        return this.score;
    }
    public addScore(score: number = 1): void {
        this.score++;

        // Update visual
        this.animateScoreUpdate();
    }
    /**
     * Set score. Usually called at the start of new game
     * @param score 
     */
    public setScore(score: number): void {
        this.score = score;
        this.animateShow();
    }
    element: HTMLDivElement = document.createElement('div');
    /**
     * Animation when score element is shown, usually at the start of game / round
     */
    abstract animateShow(): Promise<void>;
    abstract animateScoreUpdate(): Promise<void>;
}