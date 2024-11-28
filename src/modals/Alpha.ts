import { Modal, ModalAttributes } from '../abstracts/Modal';
import * as Mv from '../Mv';

export class ModalAlpha extends Modal {
    constructor(attrs: ModalAttributes = {}, buttonsAndBehaviour: [Mv.Button, Mv.ModalButtonBehaviour][] = []) {
        const defaultAttrs: ModalAttributes = {
            title: 'Information',
            className: 'modal-alpha',
            ...attrs
        };

        super(defaultAttrs, buttonsAndBehaviour);
    }
}
