import { Button } from '../abstracts/Button';

export class HomeButton extends Button {
    constructor() {
        super('Home', 'fa-home', {
            id: 'home-button',
            'ariaLabel': 'MindView home'
        });
        this.element.onclick = () => this.onClick();
    }

    onClick(): void {
        window.location.href = '/';
    }
}

// Override the static factory method
Button.HOME = (): Button => {
    return new HomeButton();
};
