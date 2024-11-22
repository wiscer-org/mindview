import { Button } from './Button';
import { Game } from './Game';

export abstract class Composer {
    constructor(protected game: Game) {
        game.setComposer(this)

        this.createContainers();
        this.layoutContainers();
    }
    layoutContainers() {
        document.body.appendChild(this.topLeft)
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
    public addButton(button: Button) {
        this.buttons.push(button);
    };

    /**
     * Callback to be called by `Game` instance when `Game` instance is ready
     */
    abstract onGameReady(): void;

    protected topLeft: HTMLElement;
    protected topRight: HTMLElement;
    protected bottomLeft: HTMLElement;
    protected bottomRight: HTMLElement;

    protected buttons: Button[] = [];
    private createContainers() {
        this.topLeft = this.createCornerContainer();
        this.topLeft.classList.add('top');
        this.topLeft.classList.add('left');
        this.topRight = this.createCornerContainer();
        this.topRight.classList.add('top');
        this.topLeft.classList.add('right');
        this.bottomLeft = this.createCornerContainer();
        this.bottomLeft.classList.add('bottom');
        this.bottomLeft.classList.add('left');
        this.bottomRight = this.createCornerContainer();
        this.bottomRight.classList.add('bottom');
        this.bottomLeft.classList.add('right');
    }

    private createCornerContainer(): HTMLElement {
        const container = document.createElement('div');
        container.classList.add('f-c')
        return container;
    }
}
