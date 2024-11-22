import { Composer } from '../abstracts/Composer';
import { Game } from '../abstracts/Game';
import { Button } from '../abstracts/Button';
import { HomeButton } from '../buttons/Home';

export class Alpha extends Composer {
    /**
     * Start everything
     */
    start(): void {
        // Container to hold things to be waited before starting
        let thingsToWait: Promise<void>[] = []

        // Init Loader instance. Capture from existing HTML elements

        // Load assets, wait to finish
        // Load Foundation.css
        thingsToWait.push(this.loadCss('https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/css/foundation.min.css'));
        // Load generic styles
        thingsToWait.push(this.loadCss('/assets/styles/generic.css'));


        // layout butons
        this.layoutButtons();

    }
    private async loadCss(path: string) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = path;
        document.head.appendChild(cssLink);

        return new Promise<void>(resolve => {
            cssLink.onload = () => {
                resolve();
            };
        });
    }

    layoutButtons() {
        // BUttons order
        let buttonsOrder = [HomeButton];
        buttonsOrder.forEach(ButtonType => {
            const button = this.buttons.find(b => b instanceof ButtonType);
            if (button) {
                this.topLeft.appendChild(button.getHTMLElement());
            }
        });

    }
    onGameReady(): void {
        throw new Error('Method not implemented.');
    }

    constructor(game: Game) {
        super(game);
    }

    compose(): void {
    }

    destroy(): void {
    }

}
