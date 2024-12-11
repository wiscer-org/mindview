export abstract class Loader {
    protected toLoad: string[] = [];
    protected toLoadOnBackgrund: string[] = [];
    protected element: HTMLElement | null = null;

    constructor(query: string) {
        this.element = document.querySelector(query);
        if (!this.element) {
            throw new Error(`Element with query "${query}" not found. Element need to be already existed in DOM to be used as Loader container.`);
        }
    }

    setToLoad(src: string): void {
        this.toLoad.push(src);
    }

    setToLoadOnBackground(src: string): void {
        this.toLoadOnBackgrund.push(src);
    }

    async load(): Promise<void[]> {
        // Add the element to DOM before loading
        if (this.element && this.element?.parentNode !== document.body) {
            document.body.appendChild(this.element);
        }

        let promises: Promise<void>[] = this.toLoad.map((src) => {
            return this.mapTypeAndLoad(src);
        });
        // return new Promise((resolve, reject) => {
        //     Promise.all(promises)
        //         .then(() => {
        //             resolve();
        //         }).catch((error) => reject(error));
        // })

        console.log(`is promises array : ${Array.isArray(promises)}`);
        Promise.all(promises).then((r) => {
            console.log('success');
            console.log(r);
        }).catch(e => {
            console.log(`${Array.isArray(e)}`)
            console.log('promise all');
            console.error(e);
        });

        return [];
    }

    async loadOnBackground(): Promise<void> {
        let promises: Promise<void>[] = this.toLoadOnBackgrund.map((src) => {
            return this.mapTypeAndLoad(src);
        });
        return new Promise((resolve, reject) => {
            Promise.all(promises)
                .then(() => resolve())
                .catch((error) => reject(error));
        });
    }

    private mapTypeAndLoad(src: string): Promise<void> {
        const fileExtension = src.split('.').pop()?.toLowerCase();
        switch (fileExtension) {
            case 'css':
                return this.loadCss(src);
            case 'js':
                return this.loadScript(src);
            case 'mp3':
            case 'wav':
            case 'ogg':
                return this.loadAudio(src);
            default:
                throw new Error(`Unsupported file type: ${fileExtension}`);
        }
    }

    // Append to head
    private async loadCss(src: string): Promise<void> {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = src;
        cssLink.crossOrigin = 'anonymous';
        cssLink.referrerPolicy = 'no-referrer';

        document.head.appendChild(cssLink);

        return new Promise<void>(resolve => {
            cssLink.onload = () => {
                resolve();
            };
        });
    }

    private async loadScript(src: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.defer = true;

            script.onload = () => {
                resolve();
            };
            script.onerror = (error) => {
                reject(error);
            };
            document.head.appendChild(script);
        });
    }

    private async loadAudio(src: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const audio = new Audio(src);
            audio.oncanplaythrough = () => {
                resolve();
            };
            audio.onerror = (error) => {
                reject(error);
            };
        });
    }

    async hide(): Promise<void> {
        // Wait for hide animation in the child class
        await this.hideAnimation();

        // !important: Detach element from DOM, because it could block event of other elements
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    abstract hideAnimation(): Promise<void>;
}
