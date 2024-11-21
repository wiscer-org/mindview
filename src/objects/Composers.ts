import * as Mv from '../Mv';

export class GameComposer extends Mv.Composer {
    addButton(button: Mv.Button): void {
        throw new Error('Method not implemented.');
    }
    onGameReady(): void {
        throw new Error('Method not implemented.');
    }
    private buttons: Mv.Button[] = [];

    start(): void {
        this.destroy();
        this.buttons.forEach(button => this.addButton(button));
    }

    addGameButton(button: Mv.Button): void {
        this.buttons.push(button);
        this.addButton(button);
    }

    destroy(): void {
        this.buttons = [];
    }
}

export const Composers = {
    Game: GameComposer
} as const;
