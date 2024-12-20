document
    .addEventListener('DOMContentLoaded', () => {
        let game = new ShapeDig();
    });

import { randomShape } from '../../src/libs/shapes';
import * as Mv from '../../src/Mv'
import * as PIXI from 'pixi.js'

/**
 * Coordinates, in pixels
 */
type Position = {
    x: number;
    y: number;
};
/**
 * The shape to be rendered
 */
type GraphicShape = PIXI.Graphics & {
    shapeType: string;
}

class ShapeDig extends Mv.Game {
    infoModal: Mv.Modal;
    resultModal: Mv.Modal;
    /** 
     * Base length of the shapes. Will be recalculated upon window resize
     */
    baseLength: number = 60;
    static numberOfShapesOnFirstDraw: number = 50;
    selectedShapeType: string = 'none';

    init(): void {
        throw new Error('Method not implemented.');
    }
    async start(): Promise<void> {
        document.body.style.backgroundColor = '#000';

        await this.initApp();

        this.newGame();

        // Show info modal, to give info about he game to user.
        this.infoModal.show();
    }
    pause(): void {
        throw new Error('Method not implemented.');
    }
    resume(): void {
        throw new Error('Method not implemented.');
    }
    async end(): Promise<void> {
        await this.resultModal.show();
    }
    getAssetsToLoad(): string[] {
        return [];
    }

    // PIXI app
    private app: PIXI.Application;

    private canvasWidth: number = 0;
    private canvasHeight: number = 0;

    constructor() {
        super();

        // TODO Setup event listeners
        // window.addEventListener('resize', this.onCanvasResize.bind(this));

        // Setup and start composer
        this.setupAndStartComposer();

        this.initInfoModal();
        this.initResultModal();

        // IMPORTAN no need to start the game. Already stareted by the Alpha composer
    }
    async initApp(): Promise<void> {
        // FIXME: The height of the top container 
        const heightOfTopContainer = 40;

        // Init PIXI Application with fullscreen size canvas
        this.app = new PIXI.Application();
        await this.app.init({
            width: window.innerWidth,
            height: window.innerHeight - heightOfTopContainer,
            backgroundAlpha: 0,
            antialias: true,
        });

        // Position canvas below control container
        this.app.canvas.style.position = 'absolute';
        // The height of the top container 
        this.app.canvas.style.top = heightOfTopContainer + 'px';
        this.app.canvas.style.left = '0';
        document.body.appendChild(this.app.canvas);

    }
    private infoButtonOnclick() {
        this.infoModal.show();
    }
    private resultModalNextButtonOnclick() {
        this.newGame();
    }
    private initResultModal() {
        this.resultModal = Mv.Modals.alpha({
            title: `Game Over`,
            content: this.createResultModalContent(),
            closeable: false
        }, [[Mv.Buttons.next({ onclick: this.resultModalNextButtonOnclick.bind(this) }), Mv.ModalButtonBehaviour.callbackAndClose]]);
    }
    createResultModalContent(): string {

        return `
            <p>Your score is ${this.getScore()} points. Try again.</p>
        `;
    }
    initInfoModal() {
        this.infoModal = Mv.Modals.alpha({
            title: 'Shape Dig Game',
            content: `
            <p>
                Objective of this game is to tap the same shape, based on the first shape you tap.
                So you are first free to tap on any shapes, then you need to follow the same shape.
            </p>
            <p>
                You will get 1 point for every correct tap, and you have 5 lives before the game is over.
                Good luck!
            </p>
            `
        }, []);
    }

    private async setupAndStartComposer() {
        this.composer = Mv.Composers.Alpha(this);

        // Set up buttons
        const infoButton = Mv.Buttons.info({
            onclick: this.infoButtonOnclick.bind(this)
        });

        // Add buttons to composer
        this.composer.addButton(Mv.Buttons.home());
        this.composer.addButton(infoButton);

        // Init Score component
        this.composer.useScoreComponent();

        // Use lives component
        await this.composer.useLivesComponent();

        // Automatically start the game after composer.start() finished
        this.composer.start();
    }

    async newGame(): Promise<void> {
        // Initialize game state
        this.composer?.setScore(0);
        await this.composer?.setInitialLives(5);

        // Set initial shapes
        await this.regenerateShapes();

        this.newRound();
    }

    private async newRound() {
        // Randomize shape
        const shape = ShapeDig.randomizeShapeType();

        // Randomize position
        const position = this.randomizePosition();

        // Randomize color
        const color = ShapeDig.randomizeColorButWhite();

        // Draw shape
        const graphic = this.generateAGraphic(shape);
    }
    /**
     * Randomize basic color, except white
     * @returns Hex color
     */
    static randomizeColorButWhite() {
        // No white, since background is white
        const colors = [
            0xFF0000, // red
            0x0000FF, // blue
            0x008000, // green
            0xFFFF00, // yellow
            0xFFA500, // orange
            0x800080, // purple
            0x00FFFF, // cyan
            0xFF00FF, // magenta
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    /**
     * The possible shape types
     */
    static shapeTypes = ["square", "circle", "triangle", "star", "cross"];
    /**
     * Randomize shape
     * @returns Random shape
     */
    static randomizeShapeType() {
        const shapeTypes = ShapeDig.shapeTypes;
        return shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    }
    /**
     * Randomize the position of the shape
     */
    private randomizePosition(): Position {
        return {
            x: this.baseLength + Math.floor(Math.random() * this.canvasWidth - 2 * this.baseLength),
            y: this.baseLength + Math.floor(Math.random() * this.canvasHeight - 2 * this.baseLength)
        };
    }

    private onCanvasResize(): void {

        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.app.renderer.resize(this.canvasWidth, this.canvasHeight);
        this.drawCanvas();
    }

    private drawCanvas(): void {
        // Clear canvas
        this.app.renderer.clear();

        // Placeholder for drawing game elements
    }

    regenerateShapes() {
        const shapeGraphics = this.generateGraphics();
        this.drawGraphics(shapeGraphics);
    }

    /**
     * Generate shapes (PIXI.Graphics) with random calor and random coordinates.
     * Also attach event handler 'onclick' to each shape.
     */
    generateGraphics() {
        let shapes: PIXI.Graphics[] = [];

        for (let i = 0; i < ShapeDig.numberOfShapesOnFirstDraw; i++) {
            // Random shape type
            const shapeType = ShapeDig.randomizeShapeType();

            shapes.push(this.generateAGraphic(shapeType));
        }

        return shapes;
    }
    generateAGraphic(shapeType) {
        // Create new PIXI Graphics object
        const graphics: GraphicShape = Object.assign(new PIXI.Graphics(), { shapeType: shapeType }); // new PIXI.Graphics();

        // Random position within window bounds
        const x = Math.random() * (window.innerWidth - this.baseLength * 2) + this.baseLength;
        const y = Math.random() * (window.innerHeight - this.baseLength * 4) + this.baseLength;

        // Random shape color
        const color = ShapeDig.randomizeColorButWhite();

        // Draw different shapes based on type
        switch (shapeType) {
            case 'square':
                // graphics.drawRect(x, y, this.baseLength * 3.2, this.baseLength * 3.2);
                graphics.rect(x, y, this.baseLength * 3.2, this.baseLength * 3.2);
                break;
            case 'circle':
                // graphics.drawCircle(x, y, this.baseLength * 1.8);
                graphics.circle(x, y, this.baseLength * 1.8);
                break;
            case 'triangle':
                graphics.moveTo(x, y - this.baseLength * 2);
                graphics.lineTo(x + this.baseLength * 1.7, y + this.baseLength);
                graphics.lineTo(x - this.baseLength * 1.7, y + this.baseLength);
                graphics.closePath();
                break;
            case 'star':
                // Draw star outline point by point
                const outerRadius = this.baseLength * 2;
                const innerRadius = this.baseLength;
                const points = 5;
                const angleStep = (Math.PI * 2) / points;
                const halfAngleStep = angleStep / 2;

                // Start at the top point
                graphics.moveTo(
                    x + Math.cos(-Math.PI / 2) * outerRadius,
                    y + Math.sin(-Math.PI / 2) * outerRadius
                );

                // Draw the star points
                for (let i = 0; i < points; i++) {
                    const angle = (-Math.PI / 2) + (i * angleStep);

                    // Draw line to inner point
                    graphics.lineTo(
                        x + Math.cos(angle + halfAngleStep) * innerRadius,
                        y + Math.sin(angle + halfAngleStep) * innerRadius
                    );

                    // Draw line to next outer point
                    graphics.lineTo(
                        x + Math.cos(angle + angleStep) * outerRadius,
                        y + Math.sin(angle + angleStep) * outerRadius
                    );
                }

                graphics.closePath();
                break;
            case 'cross':
                const width = this.baseLength * 0.8;
                const length = this.baseLength * 2;
                // Draw cross outline point by point
                graphics.moveTo(x - width / 2, y - length); // Top of vertical bar
                graphics.lineTo(x + width / 2, y - length); // Top right corner
                graphics.lineTo(x + width / 2, y - width / 2); // Right side to horizontal intersection
                graphics.lineTo(x + length, y - width / 2); // Right end of horizontal bar
                graphics.lineTo(x + length, y + width / 2); // Bottom right of horizontal
                graphics.lineTo(x + width / 2, y + width / 2); // Right side intersection
                graphics.lineTo(x + width / 2, y + length); // Bottom right of vertical
                graphics.lineTo(x - width / 2, y + length); // Bottom left of vertical
                graphics.lineTo(x - width / 2, y + width / 2); // Left side intersection
                graphics.lineTo(x - length, y + width / 2); // Left end of horizontal
                graphics.lineTo(x - length, y - width / 2); // Top left of horizontal
                graphics.lineTo(x - width / 2, y - width / 2); // Left side intersection
                graphics.closePath(); // Back to start
                break;
            default:
                console.error(`Unknown shape type: ${shapeType}`);
                break;
        }

        // Set stroke and fill color
        graphics.stroke({
            width: 12,
            color: 0x000000,
            alpha: 1,
        });
        graphics.fill(color);

        // Store shape type as property
        graphics.shapeType = shapeType;

        // Make shape interactive
        graphics.eventMode = 'static';
        graphics.cursor = 'pointer';

        graphics.on('pointerdown', this.shapeOnclick.bind(this, graphics, shapeType));
        graphics.on('touchstart', this.shapeOnclick.bind(this, graphics, shapeType));

        return graphics;
    }

    drawGraphics(shapeGraphics) {
        this.app.stage.removeChildren();
        shapeGraphics.forEach(shape => {
            this.app.stage.addChild(shape);
        });
    }
    /**
     * Handle click / activation on any shapes
     */
    async shapeOnclick(graphics, shapeType) {
        // If no shape type selected yet, set it as the first clicked shape type
        if (!ShapeDig.shapeTypes.includes(this.selectedShapeType)) {
            // This is the first shape
            this.selectedShapeType = shapeType;

            // Notify the user
            this.composer?.alert(`You selected ${shapeType}. Continue selecting ${shapeType}.`);

            // Remove the shape
            this.app.stage.removeChild(graphics);

            // Generate new graphic with the same shape
            this.app.stage.addChild(this.generateAGraphic(shapeType));
        } else {
            // Handle the click based on shape type
            this.shapeOnclickAfterFirst(graphics, shapeType);
        }
    }

    /**
     * Handle the click after shape has been selected on the first time
     */
    shapeOnclickAfterFirst(graphics, shapeType) {
        // Remove the shape from the stage
        this.app.stage.removeChild(graphics);
        // Replace with other shape that has same `shapeType`
        this.app.stage.addChild(this.generateAGraphic(graphics.shapeType));

        if (shapeType === this.selectedShapeType) {
            this.correctSelect(graphics);
        } else {
            this.falseSelect(graphics);
        }
    }

    correctSelect(graphics) {
        // increaseScore(1);
        this.composer?.addScore(1);

        // Notify user
        this.composer?.alert(`Correct! You selected ${graphics.shapeType}. Your score now ${this.getScore()}`);
    }
    getScore() {
        return this.composer?.getScore();
    }

    async falseSelect(graphics) {
        // Reduce life
        await this.composer?.loseLives();

        // Update score related display
        this.resultModal.setContent(this.createResultModalContent());

        // Should the game end?
        if (this.composer && this.composer.getLives() < 1) {
            this.end();
        } else {
            // Notify user
            this.composer?.alert(`Wrong shape! You chose ${graphics.shapeType}, should be ${this.selectedShapeType}. Try again.`);
        }
    }


}

