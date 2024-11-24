import * as Mv from '../Mv';

export class ResultButton extends Mv.Button {
    constructor() {
        super('', 'fa-check-circle', {
            id: 'result-button',
            ariaLabel: 'Show result'
        });
        this.element.onclick = () => this.onClick();
    }

    onClick(): void {
        // Implement result functionality
        console.log('Result clicked');
    }
}
