import { Button } from '../abstracts/Button';

class HomeButton extends Button {
    constructor() {
        super('Home', 'TOP_LEFT');
        this.element.onclick = () => this.onClick();
    }

    onClick(): void {
        window.location.href = '/';
    }
}

class InfoButton extends Button {
    constructor() {
        super('Info', 'TOP_RIGHT');
        this.element.onclick = () => this.onClick();
    }

    onClick(): void {
        // Implement info modal
        console.log('Info clicked');
    }
}

class PauseButton extends Button {
    constructor() {
        super('Pause', 'TOP_RIGHT');
        this.element.onclick = () => this.onClick();
    }

    onClick(): void {
        // Implement pause functionality
        console.log('Game paused');
    }
}

class ResumeButton extends Button {
    constructor() {
        super('Resume', 'TOP_RIGHT');
        this.element.onclick = () => this.onClick();
    }

    onClick(): void {
        // Implement resume functionality
        console.log('Game resumed');
    }
}

export const Buttons = {
    Home: HomeButton,
    Info: InfoButton,
    Pause: PauseButton,
    Resume: ResumeButton
} as const;
