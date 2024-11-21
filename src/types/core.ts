import * as Mv from '../Mv';

export enum GameState {
    INITIALIZING,
    STARTED,
    PAUSED,
    RESUMED,
    ENDED
}

export abstract class MvGame {
    protected state: GameState = GameState.INITIALIZING;

    abstract init(): void;
    abstract start(): void;
    abstract pause(): void;
    abstract resume(): void;
    abstract end(): void;

    getState(): GameState {
        return this.state;
    }

    protected setState(state: GameState): void {
        this.state = state;
    }
}

export abstract class MvComposer {
    protected game: MvGame;

    constructor(game: MvGame) {
        this.game = game;
    }

    abstract compose(): void;
    abstract destroy(): void;
}

export abstract class MvModalContent {
    public topCloseButton = false;
    abstract getH1(): string;
    abstract getH2(): string;
    abstract getContent(): string;
    abstract getBottomButtons(): Mv.Button[];
}

export class MvLoader {
    private static instance: MvLoader;
    private isLoading: boolean = false;
    private element: HTMLElement;

    private constructor() {
        this.element = document.createElement('div');
        this.element.className = 'mv-loader';
        this.element.style.display = 'none';
        document.body.appendChild(this.element);
    }

    static getInstance(): MvLoader {
        if (!MvLoader.instance) {
            MvLoader.instance = new MvLoader();
        }
        return MvLoader.instance;
    }

    show(): void {
        if (!this.isLoading) {
            this.isLoading = true;
            this.element.style.display = 'block';
        }
    }

    hide(): void {
        if (this.isLoading) {
            this.isLoading = false;
            this.element.style.display = 'none';
        }
    }
}

export class MvModal {
    private element: HTMLElement;
    private content: HTMLElement;
    private isOpen: boolean = false;

    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'mv-modal';
        this.content = document.createElement('div');
        this.content.className = 'mv-modal-content';
        this.element.appendChild(this.content);
    }

    setContent(modalContent: MvModalContent): void {
        this.content.innerHTML = '';

        if (modalContent.topCloseButton) {
            const closeButton = document.createElement('button');
            closeButton.className = 'mv-modal-close';
            closeButton.onclick = () => this.close();
            this.content.appendChild(closeButton);
        }

        const h1 = document.createElement('h1');
        h1.textContent = modalContent.getH1();
        this.content.appendChild(h1);

        const h2 = document.createElement('h2');
        h2.textContent = modalContent.getH2();
        this.content.appendChild(h2);

        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = modalContent.getContent();
        this.content.appendChild(contentDiv);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'mv-modal-buttons';
        modalContent.getBottomButtons().forEach(button => {
            buttonContainer.appendChild(button.getHTMLElement());
        });
        this.content.appendChild(buttonContainer);
    }

    open(): void {
        if (!this.isOpen) {
            document.body.appendChild(this.element);
            this.isOpen = true;
        }
    }

    close(): void {
        if (this.isOpen) {
            document.body.removeChild(this.element);
            this.isOpen = false;
        }
    }
}