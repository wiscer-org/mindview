import { Loader } from "../abstracts/Loader";

export class LoaderAlpha extends Loader {
    protected element: HTMLElement | null = null;
    infoAlert: HTMLElement | null = null;
    infoStatus: HTMLElement | null = null;

    constructor(query: string) {
        super();
        this.element = document.querySelector(query);
        if (!this.element) {
            throw new Error(`Element with query "${query}" not found`);
        }
        this.infoAlert = this.element.querySelector('#info-alert');
        if (!this.infoAlert) {
            throw new Error('Element with id "info-alert" not found');
        }
        this.infoStatus = this.element.querySelector('#info-status');
        if (!this.infoStatus) {
            throw new Error('Element with id "info-status" not found');
        }

    }

    async load(): Promise<void> {

        return super.load()
            .then(() => {
                // Set the text, notify loading has finished
                if (this.infoAlert) this.infoAlert.textContent = 'Assets loaded';

                // Wait a bit before hiding
                setTimeout(() => {
                    // Hide the loader HTML element after resources are loaded;
                    this.hideElement();
                }, 1500);
            });
    }
    hideElement() {
        this.element?.classList.add('pop-out');
    }
}
