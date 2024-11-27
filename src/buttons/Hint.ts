import { Button, ButtonAttributes } from '../abstracts/Button';

export class HintButton extends Button {
    constructor(attrs: ButtonAttributes) {
        // Using fa-lightbulb icon for hint
        super('Hint', 'fa-lightbulb', {
            id: 'hint-button',
            'ariaLabel': 'Show hint',
            ...attrs
        });
    }
}
