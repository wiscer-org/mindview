export type ModalAttributes = Partial<HTMLDivElement> & {
    onClose?: () => void;
    title?: string;
    content?: string;
};

export abstract class Modal {
    protected element: HTMLDivElement;
    protected overlay: HTMLDivElement;
    protected contentElement: HTMLDivElement;
    protected titleElement: HTMLHeadingElement;
    protected closeButton: HTMLButtonElement;

    constructor(attrs: ModalAttributes = {}) {
        // Create modal elements
        this.element = document.createElement('div');
        this.overlay = document.createElement('div');
        this.contentElement = document.createElement('div');
        this.titleElement = document.createElement('h1');
        this.closeButton = document.createElement('button');

        // Set up overlay
        this.overlay.className = 'modal-overlay';
        this.overlay.onclick = (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        };

        // Set up modal container
        this.element.className = 'modal';
        Object.assign(this.element, attrs);

        // Set up title
        this.titleElement.className = 'modal-title';
        if (attrs.title) {
            this.titleElement.textContent = attrs.title;
        }

        // Set up close button
        this.closeButton.className = 'modal-close';
        this.closeButton.innerHTML = '&times;';
        this.closeButton.onclick = () => this.close();

        // Set up content
        this.contentElement.className = 'modal-content';
        if (attrs.content) {
            this.contentElement.innerHTML = attrs.content;
        }

        // Assemble modal
        this.element.appendChild(this.titleElement);
        this.element.appendChild(this.closeButton);
        this.element.appendChild(this.contentElement);
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

    setTitle(title: string): void {
        this.titleElement.textContent = title;
    }

    getElement(): HTMLDivElement {
        return this.element;
    }

    destroy(): void {
        this.close();
        this.overlay.onclick = null;
        this.closeButton.onclick = null;
    }
}
