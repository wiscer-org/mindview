import * as Mv from '../Mv';

export class RefreshButton extends Mv.Button {
    constructor() {
        super('Refresh', 'fa-sync', {
            id: 'refresh-button',
            ariaLabel: 'Refresh page'
        });
        this.element.onclick = () => this.onClick();
    }

    onClick(): void {
        window.location.reload();
    }
}
