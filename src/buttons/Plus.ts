import { Button, ButtonAttributes } from '../abstracts/Button';

export class PlusButton extends Button {
    constructor(attrs: ButtonAttributes) {
        super('', 'fa-plus', {
            id: 'plus-button',
            'ariaLabel': 'Zoom in',
            ...attrs,
        });
    }

}
