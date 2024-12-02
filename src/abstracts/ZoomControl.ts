export type ZoomControlAttributes = {
    onZoomIn: () => void;
    onZoomOut: () => void;
};

export abstract class ZoomControl {
    protected element: HTMLElement;

    constructor(protected attrs: ZoomControlAttributes) {
        this.element = document.createElement('div');
        this.element.classList.add('zoom-control');
    }

    abstract getElement(): HTMLElement;

    destroy(): void {
        // Cleanup any event listeners or resources
        this.element.remove();
    }
}
