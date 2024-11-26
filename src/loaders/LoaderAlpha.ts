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

        await super.load()

        // Set the text, notify loading has finished
        this.infoAlert?.textContent ? this.infoAlert.textContent = 'assets loaded' : null;

        // Wait a bit before hiding
        await new Promise<void>((r) => setTimeout(r, 400));

        // Hide and wait the loader HTML element after resources are loaded;
        await this.hideElement();
    }
    async hideElement() {
        return new Promise<void>((resolve) => {

            if (this.element) {
                this.element.classList.add('pop-out');
                // Wait until animation ends
                this.element.addEventListener("animationend", () => {
                    resolve();
                });
            } else {
                resolve()
            }
        });
    }
}
