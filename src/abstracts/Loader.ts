export abstract class Loader {
    protected toLoad: string[] = [];
    protected toLoadOnBackgrund: string[] = [];

    setToLoad(src: string): void {
        this.toLoad.push(src);
    }

    setToLoadOnBackground(src: string): void {
        this.toLoadOnBackgrund.push(src);
    }

    async load(): Promise<void> {
        let promises: Promise<void>[] = this.toLoad.map((src) => {
            return this.mapTypeAndLoad(src);
        });
        return new Promise((resolve, reject) => {
            Promise.all(promises)
                .then(() => resolve())
                .catch((error) => reject(error));
        })
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
}
