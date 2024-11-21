import * as  Mv from "../../../../src/Mv";

export default class SampleGame extends Mv.Game {
    private composer: Mv.Composer;
    init(): void {
        throw new Error('Method not implemented.');

        // TODO: Load assets

        // Tell `Mv.Composer` instance that tthis game is ready

    }

    /**
     * Accept `Mv.Composer` instance.
     * This will allow object to communicate with the composer
     */
    setComposer(composer: Mv.Composer): void {
        this.composer = composer;
    }

    start(): void {
        throw new Error('Method not implemented.');
    }
    pause(): void {
        throw new Error('Method not implemented.');
    }
    resume(): void {
        throw new Error('Method not implemented.');
    }
    end(): void {
        throw new Error('Method not implemented.');
    }

}