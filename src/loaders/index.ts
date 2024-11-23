import { Loader } from '../abstracts/Loader';
import { LoaderAlpha } from './LoaderAlpha';

export const Loaders = {
    LoaderAlpha(query: string): Loader {
        return new LoaderAlpha(query);
    }
} as const;
