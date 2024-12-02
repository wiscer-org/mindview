import { Composer } from '../abstracts/Composer';
import { Game } from '../abstracts/Game';
import { LoaderAlpha } from '../loaders/LoaderAlpha';
import { Button } from '../abstracts/Button';
import { HomeButton } from '../buttons/Home';
import { InfoButton } from '../buttons/Info';
import { ResultButton } from '../buttons/Result';
import { RefreshButton } from '../buttons/Refresh';

export class Alpha extends Composer {
    /**
     * Start everything
     */
    start(): void {
        // Init Loader instance
        const loader = new LoaderAlpha('#loader');

        // Load assets
        loader.setToLoad('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        loader.setToLoad('https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/css/foundation.min.css');
        loader.setToLoad('/assets/styles/generic.css');
        loader.setToLoad('https://code.jquery.com/jquery-3.6.0.min.js');
        loader.setToLoad('https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/js/foundation.min.js');
        // Load assets required by `Game`instance
        this.game.getAssetsToLoad().forEach(asset => {
            loader.setToLoad(asset);
        });

        // Load all resources
        loader.load()
            .then(() => {
                // layout buttons after resources are loaded
                this.layoutButtons();
                this.layoutZoomControl();
                // start game
                this.game.start();
            })
            .catch((error) => {
                console.error('Failed to load resources:', error);
            });
    }

    async layoutButtons() {
        // Buttons order
        let buttonsOrder = [HomeButton, InfoButton, RefreshButton, ResultButton];
        for (const ButtonType of buttonsOrder) {
            const button = this.buttons.find(b => b instanceof ButtonType);
            if (button && this.topLeft) {
                this.topLeft.appendChild(button.getHTMLElement());
                button.getHTMLElement().classList.add('pop-in');

                // Wait a little for animation effect
                await new Promise(resolve => setTimeout(resolve, 100));

                // Remove pop-in class after 2 seconds
                setTimeout(() => {
                    button.getHTMLElement().classList.remove('pop-in');
                }, 2000);

            }
        }
    }
    /**
     * Add zoom control to the bottom right
     */
    async layoutZoomControl() {
        if (this.zoomControl && this.bottomRight) {
            this.bottomRight.appendChild(this.zoomControl.getElement());
            alert('fnisih adding zoom control');
        }
    }

    constructor(game: Game) {
        super(game);
    }

    compose(): void {
    }

    destroy(): void {
    }
}
