import { ModalAlpha } from './Alpha';
import { ModalAttributes } from '../abstracts/Modal';
import * as Mv from '../Mv';

export const Modals = {
    alpha(attrs: ModalAttributes = {}, buttonsAndBehaviour: [Mv.Button, Mv.ModalButtonBehaviour][]): ModalAlpha {
        return new ModalAlpha(attrs, buttonsAndBehaviour);
    }
} as const;
