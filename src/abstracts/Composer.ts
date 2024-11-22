import { Button } from './Button';
import { Game } from './Game';

export abstract class Composer {
    constructor(protected game: Game) {
        game.setComposer(this)
    }
    /**
     * start composing and take over whole control
     */
    abstract start(): void;
    /**
     * stop composing and give back control
     */
    abstract destroy(): void;
    /**
     * Add control button
     * @param button 
     */
    abstract addButton(button: Button): void;

    /**
     * Callback to be called by `Game` instance when `Game` instance is ready
     */
    abstract onGameReady(): void;
}
