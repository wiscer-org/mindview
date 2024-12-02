import { Button } from '../abstracts/Button';

export class PlusButton extends Button {
    constructor() {
        super('', 'fa-plus', {
            id: 'plus-button',
            'ariaLabel': 'Zoom in',
            onclick: () => this.onClick(),
        });
    }

    onClick(): void {
        // Empty onClick as it will be set by the consumer
    }
}
