import { ZoomControl, ZoomControlAttributes } from '../abstracts/ZoomControl';
import { ZoomControlAlpha } from './alpha';

export const ZoomControls = {
    alpha: (attrs: ZoomControlAttributes) => new ZoomControlAlpha(attrs)
}