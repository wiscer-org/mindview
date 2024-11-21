export abstract class Button {
    protected element: HTMLElement;

    constructor(
        protected text: string,
        protected fontAwesomeIcon: string = '',
        attrs: Partial<HTMLButtonElement> | Partial<HTMLAnchorElement> = {}
    ) {
        this.element = document.createElement('button');
        this.element.textContent = text;

        // Apply attributes
        Object.assign(this.element, attrs);

        // Add basic attributes
        this.element.className = 'button';
        // this.element.onclick = this.onClick.bind(this);

        // Add FontAwesome icon if provided
        if (fontAwesomeIcon) {
            const iconElement = document.createElement('i');
            iconElement.className = `fas ${fontAwesomeIcon}`;
            this.element.insertBefore(iconElement, this.element.firstChild);
        }
    }

    abstract onClick(): void;

    getHTMLElement(): HTMLElement {
        return this.element;
    }

    setText(text: string): void {
        this.text = text;
        this.element.textContent = text;

        // Preserve icon if it exists
        if (this.fontAwesomeIcon) {
            const iconElement = document.createElement('i');
            iconElement.className = `fas ${this.fontAwesomeIcon}`;
            this.element.insertBefore(iconElement, this.element.firstChild);
        }
    }

    destroy(): void {
        this.element.onclick = null;
    }
}