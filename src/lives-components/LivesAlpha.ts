import { LivesComponent } from '../abstracts/LivesComponent';

/**
 * Deals mostly with visualization of the lives, or specific implementations.
 * Common logic of lives is in the `LivesComponent`
 * 
 */
export class LivesAlpha extends LivesComponent {
    /**
     * Class name for the busy state, e.g.: doing animation, for the container element.
     */
    private static elementClassBusy = 'busy';

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

        // Mark the element as busy
        this.markElementBusy();
        // Promises to be resolved whenever each animation ends
        let animationPromises: Promise<void>[] = [];

        // Append 'hearts' to the lives display
        for (let i = 0; i < addedLives; i++) {
            let heart = this.createLivesElement();
            // Add `pulse` for animation
            heart.classList.add(animationClass);
            // Add event handler for animation end
            animationPromises.push(new Promise(resolve => {
                heart.addEventListener('animationend', () => {
                    heart.classList.remove(animationClass);
                    resolve();
                }, { once: true });
            }));

            // Remove the last child of lost lives / empty heart
            const lastEmptyHeart = this.element.querySelector(':scope > .empty:last-child');
            if (lastEmptyHeart) {
                lastEmptyHeart.remove();
            }

            // Wait a little, before continue for the next heart animation
            await new Promise(resolve => setTimeout(resolve, 200));

            // Append the new heart
            this.element.prepend(heart);
        }

        // Return new promise
        return new Promise(async resolve => {
            // Wait for all the hearts to finish animation
            await Promise.all(animationPromises);

            // Mark the element as not busy
            this.markElementNotBusy();

            resolve();
        });


        // Remove pulse class when animation ends
        // return new Promise(resolve => {
        //     this.element.addEventListener('animationend', () => {
        //         this.element.classList.remove('pulse');
        //         resolve();
        //     }, { once: true });
        // });
    }
    private isElementBusy() {
        return this.element.classList.contains(LivesAlpha.elementClassBusy);
    }
    private markElementBusy() {
        this.element.classList.add(LivesAlpha.elementClassBusy);
    }

    private markElementNotBusy() {
        this.element.classList.remove(LivesAlpha.elementClassBusy);
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
        // this.redrawHeartsIfNeeded(currentLives);

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
    private async delete_redrawHeartsIfNeeded(currentLives: number): Promise<void> {
        // Need to check if animation is currently going on and wait for it to end
        if (this.isElementBusy()) {

            // Define handler
            const handler = async () => {

                // Remove this event handler
                this.element.removeEventListener('animationend', handler);

                // If element is busy, return
                if (!this.isElementBusy()) {
                    this.delete_redrawHeartsIfNeeded(currentLives);
                } else {
                    return;
                }
            }

            // Add event listener
            this.element.addEventListener('animationend', () => {
                handler();
            }, { once: true });
        }


        let currentHearts = this.element.querySelectorAll(':not(.empty)').length;

        // Redraw hearts if there is a difference
        if (currentHearts !== currentLives) {
            // Clear the container first
            this.element.innerHTML = "";
            // No animation. Apply `currentLives`to the element. 
            for (let i = 0; i < currentLives; i++) {
                let heart = this.createLivesElement();
                this.element.prepend(heart);
            }
        }
    }


    protected async animateShowInitialLive(lives: number): Promise<void> {
        // Empty the container first
        this.element.innerHTML = "";

        return this.animateLivesUpdate(0, lives);
    }
}
