import { ZoomControl } from './ZoomControl';
import { Button } from './Button';
import { Game } from './Game';

export abstract class Composer {
    // Assets to be loaded
    protected assetsToLoad: Promise<void>[] = [];

    constructor(protected game: Game) {
        game.setComposer(this);

        this.createContainers();
        this.layoutContainers();
    }
    layoutContainers() {
        if (this.topLeft)
            document.body.appendChild(this.topLeft);
        if (this.bottomRight)
            document.body.appendChild(this.bottomRight);
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
     * Add zoom control to the composer
     * @param zoomControl 
     */
    public addZoomControl(zoomControl: ZoomControl) {
        this.zoomControl = zoomControl;
    }

    protected topLeft: HTMLElement | undefined;
    protected topRight: HTMLElement | undefined;
    protected bottomLeft: HTMLElement | undefined;
    protected bottomRight: HTMLElement | undefined;

    protected buttons: Button[] = [];
    protected zoomControl: ZoomControl | undefined;

    private createContainers() {
        this.topLeft = this.createCornerContainer();
        this.topLeft.classList.add('top');
        this.topLeft.classList.add('left');
        this.topRight = this.createCornerContainer();
        this.topRight.classList.add('top');
        this.topRight.classList.add('right');
        this.bottomLeft = this.createCornerContainer();
        this.bottomLeft.classList.add('bottom');
        this.bottomLeft.classList.add('left');
        this.bottomRight = this.createCornerContainer();
        this.bottomRight.classList.add('bottom');
        this.bottomRight.classList.add('right');
    }

    private createCornerContainer(): HTMLElement {
        const container = document.createElement('div');
        container.classList.add('f-c')
        return container;
    }
}
