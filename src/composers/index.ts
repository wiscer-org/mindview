import { Composer } from '../abstracts/Composer';
import { Game } from '../abstracts/Game';
import { ComposerA } from './A';
import { ComposerB } from './B';

export const Composers = {
    A(game: Game): Composer {
        return new ComposerA(game);
    },
    B(game: Game): Composer {
        return new ComposerB(game);
    }
} as const;