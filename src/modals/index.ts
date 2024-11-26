import { ModalAlpha } from './Alpha';
import { ModalAttributes } from '../abstracts/Modal';

export const Modals = {
    alpha(attrs: ModalAttributes = {}): ModalAlpha {
        return new ModalAlpha(attrs);
    }
} as const;
