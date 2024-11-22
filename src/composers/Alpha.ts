import { Composer } from '../abstracts/Composer';
import { Game } from '../abstracts/Game';
import { Button } from '../abstracts/Button';

export class Alpha extends Composer {
    /**
     * Start everything
     */
    start(): void {
        // Container to hold things to be waited before starting
        let thingsToWait: Promise<void>[] = []

        // Init Loader instance

        // Load assets, wait to finish

        // Create corner containers, wait to finish
        this.layoutElements();


    }
    layoutElements() {
        throw new Error('Method not implemented.');
    }
    onGameReady(): void {
        throw new Error('Method not implemented.');
    }
    private topLeft: HTMLElement;
    private topRight: HTMLElement;
    private bottomLeft: HTMLElement;
    private bottomRight: HTMLElement;

    constructor(game: Game) {
        super(game);
        // Create corner containers
        this.topLeft = this.createCornerContainer();
        this.topRight = this.createCornerContainer();
        this.bottomLeft = this.createCornerContainer();
        this.bottomRight = this.createCornerContainer();
    }

    private createCornerContainer(): HTMLElement {
        const container = document.createElement('div');
        document.body.appendChild(container);
        return container;
    }

    compose(): void {
        this.destroy();
    }

    destroy(): void {
    }

    addButton(button: Button): void {
        // Default to top right if no container is specified
        this.topRight.appendChild(button.getHTMLElement());
    }
}
