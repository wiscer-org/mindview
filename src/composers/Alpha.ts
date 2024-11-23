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
        // Load Font Awesome css
        thingsToWait.push(this.loadCss('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'));
        // Load Foundation.css
        thingsToWait.push(this.loadCss('https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/css/foundation.min.css'));
        // Load generic styles
        thingsToWait.push(this.loadCss('/assets/styles/generic.css'));
        // thingsToWait.push(this.loadCss('/style.css'));
        // Load jQuery
        thingsToWait.push(this.loadScript('https://code.jquery.com/jquery-3.6.0.min.js'));
        // Load Foundation JS
        thingsToWait.push(this.loadScript('https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/js/foundation.min.js'));

        // layout butons
        this.layoutButtons();

    }
    private async loadCss(path: string) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = path;

        cssLink.crossOrigin = 'anonymous';
        cssLink.referrerPolicy = 'no-referrer';

        document.head.appendChild(cssLink);

        return new Promise<void>(resolve => {
            cssLink.onload = () => {
                resolve();
            };
        });

    }
    /**
    * Load script async
    */
    async loadScript(path: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = path;
            script.defer = true;

            script.onload = () => {
                resolve();
            };
            script.onerror = (error) => {
                reject(error);
            };
            document.head.appendChild(script);
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
