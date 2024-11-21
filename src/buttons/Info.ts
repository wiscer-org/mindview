import * as Mv from '../Mv';


export class InfoButton extends Mv.Button {
    constructor() {
        super('Info', 'fa-info-circle', {
            id: 'info-button',
            ariaLabel: 'Show information'
        });
        this.element.onclick = () => this.onClick();
    }

    onClick(): void {
        // Implement info modal functionality
        console.log('Info clicked');
    }
}
