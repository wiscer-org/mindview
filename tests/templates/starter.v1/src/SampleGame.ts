import * as  Mv from "../../../../src/Mv";

export default class SampleGame extends Mv.Game {
    getAssetsToLoad(): string[] {
        return [];
    }
    init(): void {
        throw new Error('Method not implemented.');

    }
    /**
     * Start everything, take over whole control. Different meaning than `pl`
     */
    start(): void {
        console.log("Sample Game started");
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