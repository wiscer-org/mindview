import { Button, ButtonAttributes } from '../abstracts/Button';

export class CloseButton extends Button {
    constructor(attrs: ButtonAttributes) {
        // No label
        super('Close', 'fa-times',
            {
                id: 'close-button',
                'ariaLabel': 'Close',
                ...attrs
            });
    }

}
