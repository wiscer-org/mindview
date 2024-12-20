import { Button } from '../abstracts/Button';

export class HomeButton extends Button {
    constructor() {
        // No label
        super('', 'fa-home', {
            id: 'home-button',
            'ariaLabel': 'MindView home',
            onclick: () => this.onclick(),
        });
    }

    onclick(): void {
        window.location.href = '/';
    }
}
