import * as Mv from '../Mv';
import { createFocusTrap } from 'focus-trap';

export type ModalAttributes = Partial<HTMLDivElement> & {
    onClose?: () => void;
    title?: string;
    content?: string;
    // If `closeable` is true, will add a close button on top and at the bottom
    closeable?: boolean;
};

// Define the buttons behaviours that will effect the modal.
export enum ModalButtonBehaviour {
    // Execute ònclick`before closing the modal
    callbackAndClose,
    // Will presis the passed ònclick
    callbackOnly,
}

export abstract class Modal {
    protected element: HTMLDivElement;
    protected overlay: HTMLDivElement;
    public contentElement: HTMLDivElement;
    public titleElement: HTMLHeadingElement;
    protected closeButton: HTMLButtonElement;
    protected footerElement: HTMLElement;
    protected buttons: Mv.Button[] = [];
    private focusTrap: any; // focus-trap instance

    // If `closeable` is true, will add a close button on top and at the bottom
    protected closeable: boolean = true;

    constructor(attrs: ModalAttributes = {}, buttonsAndBehaviour: [Mv.Button, ModalButtonBehaviour][]) {
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

        // Add ARIA attributes for accessibility
        this.element.setAttribute('role', 'dialog');
        this.element.setAttribute('aria-modal', 'true');
        if (attrs.title) {
            this.element.setAttribute('aria-labelledby', 'modal-title');
            this.titleElement.id = 'modal-title';
        }

        // Initialize focus trap
        this.focusTrap = createFocusTrap(this.element, {
            escapeDeactivates: true,
            allowOutsideClick: true,
            returnFocusOnDeactivate: true,
            fallbackFocus: this.element
        });

        // Set up title
        this.initTitleElement(attrs);

        // Add close button if closeable
        if (this.closeable) {
            this.addTopCloseButton();
        }

        // Set up content
        this.setContentElement(attrs);

        // Add bottom buttons 
        this.setButtons(buttonsAndBehaviour);

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
        this.closeButton.setAttribute('aria-label', 'Close Modal');
        this.closeButton.onclick = () => this.close();

        this.titleElement.appendChild(this.closeButton);
    }

    private initTitleElement(attrs: Mv.ModalAttributes) {
        this.titleElement.className = 'modal-title';
        if (attrs.title) {
            this.titleElement.textContent = attrs.title;
        }
    }

    private setButtons(buttonsAndBehaviour: [Mv.Button, Mv.ModalButtonBehaviour][]) {
        if (this.closeable) {
            let closeButton = Mv.Buttons.close({
                onclick: this.close.bind(this),
            });
            this.buttons.push(closeButton);
        }

        // Translate the passed `buttonsAndBehaviour` to `buttons. Will append `close`to close modal on the ònclick if needed.
        buttonsAndBehaviour.forEach(([button, behaviour]): void => {
            switch (behaviour) {
                case Mv.ModalButtonBehaviour.callbackAndClose:
                    if (button.getHTMLElement()
                        && button.getHTMLElement().onclick != null) {
                        // Wrap the `onclick` 
                        const originalOnClick = button.getHTMLElement().onclick;
                        button.getHTMLElement().onclick = () => {
                            if (originalOnClick) {
                                originalOnClick.call(button.getHTMLElement());
                            }
                            this.close();
                        };
                    };
                    break;
                default:
                    // do nothing
                    break;
            }
            this.buttons.push(button);
        });

        // Add buttons to footer
        this.buttons.forEach(button =>
            this.footerElement.appendChild(button.getHTMLElement())
        );
    }


    show(): void {
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.element);

        // Hide other content from screen readers
        this.setSiblingsAccessibility(true);

        // Activate focus trap
        this.focusTrap.activate();

        // Show modal content
        requestAnimationFrame(() => {
            this.overlay.classList.add('visible');
            this.element.classList.add('visible');
        });
    }

    close(): void {
        // Deactivate focus trap
        this.focusTrap.deactivate();

        // Show other content to screen readers
        this.setSiblingsAccessibility(false);

        this.overlay.classList.remove('visible');
        this.element.classList.remove('visible');

        // Remove after animation
        setTimeout(() => {
            document.body.removeChild(this.overlay);
            document.body.removeChild(this.element);
        }, 300);
    }

    private setSiblingsAccessibility(hideOthers: boolean) {
        // Get all direct children of body except our modal and overlay
        const siblings = Array.from(document.body.children).filter(
            el => el !== this.element && el !== this.overlay
        );

        // Set aria-hidden for siblings
        siblings.forEach(sibling => {
            if (hideOthers) {
                sibling.setAttribute('aria-hidden', 'true');
            } else {
                // For siblings that are modals, do not remove aria-hidden
                if (!sibling.hasAttribute('aria-modal')) {
                    sibling.removeAttribute('aria-hidden');
                }
            }
        });

        // Set aria-hidden for modal elements
        this.element.setAttribute('aria-hidden', hideOthers ? 'false' : 'true');
        this.overlay.setAttribute('aria-hidden', 'true'); // overlay should always be hidden from screen readers
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
        // Deactivate focus trap if it exists
        if (this.focusTrap) {
            this.focusTrap.deactivate();
        }

        this.close();
        this.overlay.onclick = null;
        this.closeButton.onclick = null;
    }
}
