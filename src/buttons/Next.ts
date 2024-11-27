import { Button, ButtonAttributes } from '../abstracts/Button';

export class NextButton extends Button {
    constructor(attrs: ButtonAttributes) {
        // Using fa-arrow-right icon for next
        super('Next', 'fa-arrow-right', {
            id: 'next-button',
            'ariaLabel': 'Next',
            ...attrs
        });
    }
}
