import { Composer } from '../abstracts/Composer';
import { Game } from '../abstracts/Game';
import { Alpha } from './Alpha';
import { Beta } from './Beta';

export const Composers = {
    Alpha(game: Game): Composer {
        return new Alpha(game);
    },
    Beta(game: Game): Composer {
        return new Beta(game);
    }
} as const;