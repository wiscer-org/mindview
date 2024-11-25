import * as Mv from '../Mv';

export class RefreshButton extends Mv.Button {
    constructor(attrs: Mv.ButtonAttributes) {
        super('Refresh', 'fa-sync', {
            id: 'refresh-button',
            ariaLabel: 'Refresh page',
            ...attrs
        });
    }
}
