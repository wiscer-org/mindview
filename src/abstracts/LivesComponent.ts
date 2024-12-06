/**
 * Abstract class for lives, contains logical methods for lives management.
 */
export abstract class LivesComponent {
    protected lives: number = 3;  // Default starting lives
    constructor() {
        this.element.textContent = this.lives.toString();
    }

    public getLives(): number {
        return this.lives;
    }
    
    public loseLife(amount: number = 1): void {
        this.lives = Math.max(0, this.lives - amount);
        this.animateLivesUpdate();
    }

    public addLife(amount: number = 1): void {
        this.lives += amount;
        this.animateLivesUpdate();
    }

    public setLives(lives: number): void {
        this.lives = Math.max(0, lives);
        this.animateLivesUpdate();
    }

    element: HTMLDivElement = document.createElement('div');
    
    /**
     * Animation when lives element is shown, usually at the start of game / round
     */
    abstract animateShow(): Promise<void>;
    abstract animateLivesUpdate(): Promise<void>;
}
