import { Modal, ModalAttributes } from '../abstracts/Modal';

export class ModalAlpha extends Modal {
    constructor(attrs: ModalAttributes = {}) {
        const defaultAttrs: ModalAttributes = {
            title: 'Information',
            className: 'modal-alpha',
            ...attrs
        };
        
        super(defaultAttrs);
    }
}
