import { Button } from '../abstracts/Button';

export class HomeButton extends Button {
    constructor() {
        // No label
        super('', 'fa-home', {
            id: 'home-button',
            'ariaLabel': 'MindView home'
        });
        this.element.onclick = () => this.onClick();
    }

    onClick(): void {
        window.location.href = '/';
    }
}
