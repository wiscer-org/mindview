import * as Mv from '../Mv';

export abstract class Game {
    protected state: string = 'INITIALIZING';
    protected composer: Mv.Composer | undefined;

    /**
     * Accept `Mv.Composer` instance.
     * This will allow object to communicate with the composer
     */
    setComposer(composer: Mv.Composer): void {
        this.composer = composer;
    }
    abstract init(): void;
    abstract start(): void;
    abstract pause(): void;
    abstract resume(): void;
    abstract end(): void;
    /**
     * Get all assets to load, to be loaded by Loader.
     * @returns List of assets to load
     */
    abstract getAssetsToLoad(): string[];

    getState(): string {
        return this.state;
    }

    protected setState(state: string): void {
        this.state = state;
    }
}
