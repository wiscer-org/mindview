import { LivesComponent } from '../abstracts/LivesComponent';

export class LivesAlpha extends LivesComponent {
    constructor() {
        super();
        // Setup the lives element styling
        this.element.classList.add('lives-display');
    }

    animateShow(): Promise<void> {
        // Basic show animation
        this.element.classList.add('fade-in');
        
        return new Promise(resolve => {
            this.element.addEventListener('animationend', () => {
                this.element.classList.remove('fade-in');
                resolve();
            }, { once: true });
        });
    }

    animateLivesUpdate(): Promise<void> {
        // Update the display
        this.element.textContent = this.lives.toString();
        this.element.classList.add('pulse');

        // Remove pulse class when animation ends
        return new Promise(resolve => {
            this.element.addEventListener('animationend', () => {
                this.element.classList.remove('pulse');
                resolve();
            }, { once: true });
        });
    }
}
