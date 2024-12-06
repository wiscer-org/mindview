import { ScoreComponent } from '../abstracts/ScoreComponent';
import { ScoreAlpha as ScoreComponentAlpha } from './ScoreComponentAlpha';

export const ScoreComponents = {
    alpha() {
        return new ScoreComponentAlpha();
    },
};