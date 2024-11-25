import * as Mv from '../Mv';


export class InfoButton extends Mv.Button {

    constructor(attrs: Mv.ButtonAttributes) {
        const newAttrs: Mv.ButtonAttributes = {
            id: 'info-button',
            ariaLabel: 'Show information',
            ...attrs,
        };

        super('', 'fa-info-circle', newAttrs);
    }

}
