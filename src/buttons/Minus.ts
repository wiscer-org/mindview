import { Button, ButtonAttributes } from '../abstracts/Button';

export class MinusButton extends Button {
    constructor(attrs: ButtonAttributes) {
        super('', 'fa-minus', {
            id: 'minus-button',
            'ariaLabel': 'Zoom out',
            ...attrs,
        });
    }

}
