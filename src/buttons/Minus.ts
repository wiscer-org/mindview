import { Button } from '../abstracts/Button';

export class MinusButton extends Button {
    constructor() {
        super('', 'fa-minus', {
            id: 'minus-button',
            'ariaLabel': 'Zoom out',
            onclick: () => this.onClick(),
        });
    }

    onClick(): void {
        // Empty onClick as it will be set by the consumer
    }
}
