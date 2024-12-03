import { ZoomControl, ZoomControlAttributes } from '../abstracts/ZoomControl';
import { Button } from '../abstracts/Button';
import { Buttons } from '../buttons/index';
// import { PlusButton } from '../buttons/Plus';
// import { MinusButton } from '../buttons/Minus';

export class ZoomControlAlpha extends ZoomControl {
    private plusButton: Button;
    private minusButton: Button;

    constructor(attrs: ZoomControlAttributes) {
        super(attrs);

        // Create plus button
        this.plusButton = Buttons.plus({
            onclick: () => {
                attrs.onZoomIn();
            }
        });
        this.plusButton.getHTMLElement().classList.add('zoom-in');

        // Create minus button
        this.minusButton = Buttons.minus({
            onclick: () => attrs.onZoomOut()
        });
        this.minusButton.getHTMLElement().classList.add('zoom-out');

        // Add buttons to container
        this.element.appendChild(this.plusButton.getHTMLElement());
        this.element.appendChild(this.minusButton.getHTMLElement());
    }

    getElement(): HTMLElement {
        return this.element;
    }

    destroy(): void {
        this.plusButton.destroy();
        this.minusButton.destroy();
        super.destroy();
    }
}
