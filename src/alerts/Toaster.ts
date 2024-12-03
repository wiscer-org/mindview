class Toaster {
    element: HTMLElement
    constructor(customStyles = {}) {
        // Create toast element
        this.element = document.createElement('div');
        this.element.setAttribute('role', 'alert');
        this.element.setAttribute('aria-live', 'assertive');

        // Default styles
        const defaultStyles = {
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '4px',
            fontSize: '16px',
            opacity: '0',
            transition: 'opacity 0.3s ease-in-out',
            zIndex: '1000',
            textAlign: 'center',
            maxWidth: '80%',
            wordWrap: 'break-word'
        };

        // Merge default and custom styles
        const finalStyles = { ...defaultStyles, ...customStyles };

        // Apply styles
        Object.assign(this.element.style, finalStyles);

        // Add to document
        document.body.appendChild(this.element);
    }

    // Variable to hold timeout
    timeoutObject: ReturnType<typeof setTimeout> | undefined;
    // Default timeout
    defaultTimeout = 17e3;

    /**
     * Show toast message
     * @param {string} message 
     */
    show(message: string) {
        // Cancel the timeout if exists
        if (this.timeoutObject) {
            clearTimeout(this.timeoutObject);
        }

        // Set message
        this.element.textContent = message;

        // Show toast
        this.element.style.opacity = '1';

        // Hide after 10 seconds
        this.timeoutObject = setTimeout(() => {
            // Fade out 
            this.element.style.opacity = '0';
        }, this.defaultTimeout);
    }
}

export default Toaster;