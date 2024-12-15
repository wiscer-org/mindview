/**
 * Abstract class for lives, contains logical methods for lives management.
 */
export abstract class LivesComponent {
    protected initialLives: number = 7; // Default initial / starting lives
    protected lives: number = this.initialLives;
    constructor() {

    }

    public getLives(): number {
        return this.lives;
    }
    /**
     * Called when loosing lives. Throw error if the remaining lives will less than zero.
     * @param lives The number of lost lives.
     * @returns 
     */
    public async loseLife(lives: number = 1): Promise<void> {
        let prevLives = this.lives;
        this.lives = prevLives - lives;

        // Throw error if the remaining lives will less than zero.
        if (this.lives < 0) throw new Error("Remaining lives will less than zero.");

        return this.animateLivesUpdate(prevLives, -lives);
    }

    public async addLife(lives: number = 1): Promise<void> {
        let prevLives = this.lives;
        return this.animateLivesUpdate(prevLives, lives);
    }

    public async setInitialLives(lives: number): Promise<void> {
        this.lives = this.initialLives = Math.max(0, lives);
        return this.animateShowInitialLive(lives);
    }

    element: HTMLDivElement = document.createElement('div');

    /**
     * Animation when lives element is shown, usually at the start of game / round
     * @param lives Number of initial lives
     */
    protected abstract animateShowInitialLive(lives: number): Promise<void>;
    /**
     * Update the disply of lives changes, could be added or lost
     * @param currentLives Current number of lives
     * @param diff Lives difference. Positive for added, negative for lost
     */
    protected abstract animateLivesUpdate(currentLives: number, diff: number): Promise<void>;
}