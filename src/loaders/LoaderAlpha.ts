import { Loader } from "../abstracts/Loader";

export class LoaderAlpha extends Loader {
    protected element: HTMLElement | null = null;
    infoAlert: HTMLElement | null = null;
    infoStatus: HTMLElement | null = null;

    constructor(query: string) {
        // `query` is CSS selector. Loader container element need to be existed in DOM to be used.
        super(query);

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

    async load(): Promise<void[]> {
        // Load resources
        await super.load().catch(e => {
            // Note: Eventhough this the result of Promise.all. But it somehow only return 1 error message.
            // Display that 1 error message.
            console.log(e);
            let errorMsg = `Error loading ${e.target.tagName} from ${e.target.src}`;
            console.error(errorMsg);
            this.infoAlert?.textContent ? this.infoAlert.textContent = errorMsg : null;
        });

        // Set the text, notify loading has finished
        this.infoAlert?.textContent ? this.infoAlert.textContent = 'assets loaded' : null;

        // Wait a bit before hiding
        await new Promise<void>((r) => setTimeout(r, 400));

        // Hide and wait the loader HTML element after resources are loaded;
        await this.hide();

        // Meaning all assets has been successfully loaded
        return [];
    }
    async hideAnimation() {
        return new Promise<void>((resolve) => {
            if (this.element) {
                this.element.classList.add('pop-out');
                this.element.setAttribute('aria-hidden', 'true');
                console.log('set aria-hidden to true');

                // Wait until animation ends, then remove from DOM
                this.element.addEventListener("animationend", () => {
                    // Remove the element from DOM after animation
                    this.element?.parentNode?.removeChild(this.element);
                    resolve();
                });
            } else {
                resolve()
            }
        });
    }
}
