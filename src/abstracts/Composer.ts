import { ZoomControl } from './ZoomControl';
import { Button } from './Button';
import { Game } from './Game';
import { ScoreComponent } from './ScoreComponent';
import { ScoreComponents } from '../score-components/index';

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
        if (this.topCenter)
            document.body.appendChild(this.topCenter);
        if (this.topRight)
            document.body.appendChild(this.topRight);
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
     * Display an alert message
     * @param message Message to display
     */
    abstract alert(message: string): void;
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
    protected topCenter: HTMLElement | undefined;
    protected topRight: HTMLElement | undefined;
    protected bottomLeft: HTMLElement | undefined;
    protected bottomRight: HTMLElement | undefined;

    protected buttons: Button[] = [];
    protected zoomControl: ZoomControl | undefined;

    private createContainers() {
        this.topLeft = this.createElementsContainer();
        this.topLeft.classList.add('top');
        this.topLeft.classList.add('left');
        this.topCenter = this.createElementsContainer();
        this.topCenter.classList.add('top');
        this.topCenter.classList.add('center');
        this.topRight = this.createElementsContainer();
        this.topRight.classList.add('top');
        this.topRight.classList.add('right');
        this.bottomLeft = this.createElementsContainer();
        this.bottomLeft.classList.add('bottom');
        this.bottomLeft.classList.add('left');
        this.bottomRight = this.createElementsContainer();
        this.bottomRight.classList.add('bottom');
        this.bottomRight.classList.add('right');
    }

    private createElementsContainer(): HTMLElement {
        const container = document.createElement('div');
        container.classList.add('f-c')
        return container;
    }

    // Start of score component releated code
    protected scoreComponent: ScoreComponent | undefined;

    initScoreComponentIfNeeded() {
        if (!this.scoreComponent) {
            this.scoreComponent = ScoreComponents.alpha();
            this.scoreComponent.setScore(0)
        }
    }
    public setScore(score: number) {
        this.initScoreComponentIfNeeded();
        this.scoreComponent?.setScore(score);
    }
    public addScore(increase: number = 1): void {
        this.initScoreComponentIfNeeded();
        this.scoreComponent?.addScore(increase);
    }
    public getScore(): number {
        this.initScoreComponentIfNeeded();
        return this.scoreComponent?.getScore() ?? 0;
    }
}
