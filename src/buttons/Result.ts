import * as Mv from '../Mv';

export class ResultButton extends Mv.Button {
    constructor(attrs: Mv.ButtonAttributes) {
        super('', 'fa-check-circle', {
            id: 'result-button',
            ariaLabel: 'Show result',
            ...attrs
        });
    }
}
