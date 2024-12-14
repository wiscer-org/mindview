import { LivesComponent } from '../abstracts/LivesComponent';

/**
 * Deals mostly with visualization of the lives, or specific implementations.
 * Common logic of lives is in the `LivesComponent`
 * 
 */
export class LivesAlpha extends LivesComponent {

    constructor() {
        super();
        // Setup the lives element styling
        // this.element.classList.add('lives-display');
        this.element.id = 'lives-c';
    }
    /**
     * Animate the show of the container of the initial lives.
     * Lives has not been given, only the container. Should be called at the start of the game.
     * This is useful to show the initial lives that given, represented by empty heart icons.
     * @returns Promise<void>
     */
    protected async delete_animateShowInitialLives(): Promise<void> {
        for (let i = 0; i < this.initialLives; i++) {
            let heart = document.createElement('div');
            heart.innerHTML = '🤍'; // White heart emoji as empty heart

            this.element?.prepend(heart);
        }


        return new Promise(resolve => {
            this.element.addEventListener('animationend', () => {
                this.element.classList.remove('fade-in');
                resolve();
            }, { once: true });
        });
    }

    protected async animateLivesAdded(addedLives: number): Promise<void> {
        const animationClass = 'pulse';

        console.log("Animate lives added. addedLives: " + addedLives);

        // Append 'hearts' to the lives display
        for (let i = 0; i < addedLives; i++) {
            let heart = this.createLivesElement();
            // Add `pulse` for animation
            heart.classList.add(animationClass);

            // Remove the last child of lost lives / empty heart
            const lastEmptyHeart = this.element.querySelector(':scope > .empty:last-child');
            if (lastEmptyHeart) {
                lastEmptyHeart.remove();
            }

            await new Promise(resolve => setTimeout(resolve, 200));

            // Append the new heart
            this.element.prepend(heart);
            // this.element.appendChild(heart);
        }

        // Remove pulse class when animation ends
        return new Promise(resolve => {
            this.element.addEventListener('animationend', () => {
                this.element.classList.remove('pulse');
                resolve();
            }, { once: true });
        });
    }
    /**
     * Animate lives has been lost
     * @param lostLives 
     */
    protected async animateLivesLost(lostLives: number): Promise<void> {
        // Iterate
        for (let i = 0; i < lostLives; i++) {
            let heart = this.createLostLivesElement();
            heart.classList.add('fade-out');

            // Remove the first child of lives display that is not `.empty`
            this.element.querySelector(':not(.empty)')?.remove();

            // Prepend the empty heart
            this.element.prepend(heart);
        }

        // Remove fade-out class when animation ends
        return new Promise(resolve => {
            this.element.addEventListener('animationend', () => {
                this.element.classList.remove('fade-out');
                resolve();
            }, { once: true });
        });
    }

    private createLostLivesElement() {
        let heart = this.createLivesElement();
        heart.classList.add('empty');
        heart.innerHTML = '🤍'; // White heart emoji as empty heart
        return heart;
    }

    private createLivesElement() {
        let heart = document.createElement('div');
        heart.innerHTML = '❤️'; // Full heart
        return heart;
    }

    /**
     * Update the disply of lives changes, could be added or lost
     * @param currentLives Current number of lives
     * @param diffLives Lives difference. Positive for added, negative for lost
     * @returns Promise<void>
     */
    protected async animateLivesUpdate(currentLives: number, diffLives: number): Promise<void> {
        // Get the existing number of lives (non empty hearts)
        this.redrawHeartsIfNeeded(currentLives);

        console.log("Animate lives update. currentLives: " + currentLives + ", diffLives: " + diffLives);

        // Do animation based on the difference	
        if (diffLives > 0) {
            return this.animateLivesAdded(diffLives);
        } else if (diffLives < 0) {
            return this.animateLivesLost(-diffLives);
        } else {
            return Promise.reject("Lives difference must not be 0");
        }
    }
    /**
     * Will redraw the hearts if there is a difference between the current lives and the number of hearts existing in the element
     * No animation.
     * @param currentLives Current number of lives
     */
    private redrawHeartsIfNeeded(currentLives: number) {
        let currentHearts = this.element.querySelectorAll(':not(.empty)').length;
        console.log("Redraw hearts. currentHearts: " + currentHearts);

        // Redraw hearts if there is a difference
        if (currentHearts !== currentLives) {
            // No animation. Apply `currentLives`to the element. 
            for (let i = 0; i < currentLives; i++) {
                let heart = this.createLivesElement();
                this.element.prepend(heart);
            }
        }
    }

    protected async animateShowInitialLive(lives: number): Promise<void> {
        return this.animateLivesUpdate(0, lives);
    }
}
