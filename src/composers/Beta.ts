import { Composer } from '../abstracts/Composer';
import { Game } from '../abstracts/Game';
import { Button } from '../abstracts/Button';

export class Beta extends Composer {
    start(): void {
        throw new Error('Method not implemented.');
    }
    onGameReady(): void {
        throw new Error('Method not implemented.');
    }
    private container: HTMLElement;

    constructor(game: Game) {
        super(game);
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
    }

    compose(): void {
        this.destroy();
    }

    destroy(): void {
        if (this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }

    addButton(button: Button): void {
        this.container.appendChild(button.getHTMLElement());
    }
}
