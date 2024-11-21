export abstract class Game {
    protected state: string = 'INITIALIZING';

    /**
     * Accept `Mv.Composer` instance.
     * This will allow object to communicate with the composer
     */
    abstract setComposer(composer): void;
    abstract init(): void;
    abstract start(): void;
    abstract pause(): void;
    abstract resume(): void;
    abstract end(): void;

    getState(): string {
        return this.state;
    }

    protected setState(state: string): void {
        this.state = state;
    }
}
