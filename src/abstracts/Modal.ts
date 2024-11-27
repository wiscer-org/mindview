import * as Mv from '../Mv';

export type ModalAttributes = Partial<HTMLDivElement> & {
    onClose?: () => void;
    title?: string;
    content?: string;
    // If `closeable` is true, will add a close button on top and at the bottom
    closeable?: boolean;
};

export enum ModalButton {
    CallbackAndClose,
}

export abstract class Modal {
    protected element: HTMLDivElement;
    protected overlay: HTMLDivElement;
    protected contentElement: HTMLDivElement;
    protected titleElement: HTMLHeadingElement;
    protected closeButton: HTMLButtonElement;
    protected footerElement: HTMLElement;
    protected buttons: Mv.Button[] = [];

    // If `closeable` is true, will add a close button on top and at the bottom
    protected closeable: boolean = true;

    constructor(attrs: ModalAttributes = {}, buttons: ModalButton[]) {
        // Create modal elements
        this.element = document.createElement('div');
        this.overlay = document.createElement('div');
        this.contentElement = document.createElement('div');
        this.titleElement = document.createElement('h1');
        this.closeButton = document.createElement('button');
        this.footerElement = document.createElement('footer')

        // Set up overlay
        this.overlay.className = 'modal-overlay';
        this.overlay.onclick = (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        };

        // Set up modal container
        // this.element.className = 'modal';
        Object.assign(this.element, attrs);

        // Set up title
        this.initTitleElement(attrs);

        // Add close button if closeable
        if (this.closeable) {
            this.addTopCloseButton();
        }

        // Set up content
        this.setContentElement(attrs);

        // Add bottom buttons 
        this.setButtons();

        // Set up footer
        this.initFooterElement();

        // Assemble modal
        this.assembleModal();
    }
    private assembleModal() {
        this.element.appendChild(this.titleElement);
        this.element.appendChild(this.contentElement);
        this.element.appendChild(this.footerElement);
    }

    private setContentElement(attrs: Mv.ModalAttributes) {
        this.contentElement.className = 'modal-content';
        if (attrs.content) {
            this.contentElement.innerHTML = attrs.content;
        }
    }

    addTopCloseButton() {
        // Set up top close button
        this.closeButton.className = 'modal-close';
        this.closeButton.innerHTML = '&times;';
        this.closeButton.onclick = () => this.close();

        this.titleElement.appendChild(this.closeButton);
    }

    private initTitleElement(attrs: Mv.ModalAttributes) {
        this.titleElement.className = 'modal-title';
        if (attrs.title) {
            this.titleElement.textContent = attrs.title;
        }
    }

    private setButtons() {
        if (this.closeable) {
            let closeButton = Mv.Buttons.close({
                onclick: this.close.bind(this),
            });
            this.buttons.push(closeButton);
        }
    }

    show(): void {
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.element);
        // Add a small delay before adding the visible class for animation
        setTimeout(() => {
            this.overlay.classList.add('visible');
            this.element.classList.add('visible');
        }, 10);
    }

    close(): void {
        this.overlay.classList.remove('visible');
        this.element.classList.remove('visible');

        // Wait for animation to complete before removing elements
        setTimeout(() => {
            this.overlay.remove();
            this.element.remove();
        }, 300); // Match this with CSS transition duration
    }

    setContent(content: string): void {
        this.contentElement.innerHTML = content;
    }


    getElement(): HTMLDivElement {
        return this.element;
    }
    /**
     * Init footer element and all children elements
     */
    initFooterElement(): void {
        this.footerElement = document.createElement('footer');

        // Construct buttons
        this.buttons.forEach(button => {
            this.footerElement.appendChild(button.getHTMLElement());
        });
    }

    destroy(): void {
        this.close();
        this.overlay.onclick = null;
        this.closeButton.onclick = null;
    }
}

