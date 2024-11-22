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

        // Init Loader instance. Capture from existing HTML elements

        // Load assets, wait to finish

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
