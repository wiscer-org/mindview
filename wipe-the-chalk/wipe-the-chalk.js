
// Define the MainScene class
class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        console.log('debug 9'); // MainScene constructor called
    }

    init(data) {
        console.log('debug 10'); // init called
        if (data) {
            this.initGame(data);
        }
    }

    initGame({ chalkWidth, chalkColor, callbacks }) {
        console.log('debug 11'); // initGame called
        this.chalkWidth = chalkWidth;
        this.chalkColor = chalkColor;
        this.onChalkWiped = callbacks.onChalkWiped;
        this.onWipeFailed = callbacks.onWipeFailed;

        // Initialize other properties
        this.chalkGraphics = null;
        this.eraserGraphics = null;
        this.chalkPath = [];
        this.eraserPosition = { x: 0, y: 0 };
        this.isFrozen = false;
        this.lastWipedDistance = 0;
        this.wipedDistanceThreshold = 20; // 20px
        this.failureDistance = 50; // Example threshold for failure
    }

    preload() {
        console.log('debug 12'); // preload called
        // Load any assets if necessary
    }

    create() {
        console.log('debug 13'); // create called
        // Create chalk and eraser graphics
        this.chalkGraphics = this.add.graphics();
        this.eraserGraphics = this.add.graphics();

        // Generate initial chalk strokes
        this.generateChalkStrokes();

        // Create eraser sprite (simple circle for demonstration)
        this.eraser = this.add.circle(0, 0, 20, 0x000000, 0.5);
        console.log(`this.eraser: ${this.eraser}`);
        this.eraser.setDepth(1);
        this.eraser.setVisible(false);

        // Input handling
        this.input.on('pointermove', this.handlePointerMove, this);
        this.input.on('pointerdown', this.handlePointerDown, this);
        this.input.on('pointerup', this.handlePointerUp, this);

        this.isErasing = false;
        this.totalErased = 0;
    }

    generateChalkStrokes() {
        console.log('debug 14'); // generateChalkStrokes called
        // Clear any existing chalk
        this.chalkGraphics.clear();
        this.chalkGraphics.lineStyle(this.chalkWidth, this.chalkColor, 1);
        this.chalkPath = [];

        // Define start and end points
        const startX = 100;
        const startY = this.game.config.height / 2;
        const endX = this.game.config.width - 100;
        const endY = this.game.config.height / 2;

        console.log('debug 15'); // Drawing chalk line
        // Draw a straight line for simplicity; can be enhanced to more complex paths
        this.chalkGraphics.beginPath();
        this.chalkGraphics.moveTo(startX, startY);
        this.chalkGraphics.lineTo(endX, endY);
        this.chalkGraphics.strokePath();

        // Populate chalkPath with points along the line
        const points = 600; // Number of points along the chalk line
        const deltaX = (endX - startX) / points;
        for (let i = 0; i <= points; i++) {
            const x = startX + deltaX * i;
            const y = startY; // Straight horizontal line
            this.chalkPath.push({ x, y });
        }

        // FIXME: below lines are temporarily commented
        // Position the eraser at the start of the chalk
        // this.eraser.setPosition(startX, startY);
        // this.eraser.setVisible(true);

        console.log('debug 16'); // chalk has been drawn
    }

    eraseBoard() {
        console.log('debug 17'); // eraseBoard called in MainScene
        this.chalkGraphics.clear();
        this.eraser.setVisible(false);
        this.chalkPath = [];
        this.totalErased = 0;
    }

    handlePointerDown(pointer) {
        console.log('debug 18'); // handlePointerDown called
        if (this.isFrozen) return;
        this.isErasing = true;
        this.eraser.setVisible(true);
        this.eraserPosition.x = pointer.x;
        this.eraserPosition.y = pointer.y;
        this.eraser.setPosition(pointer.x, pointer.y);
    }

    handlePointerMove(pointer) {
        console.log('debug 19'); // handlePointerMove called
        if (this.isFrozen || !this.isErasing) return;
        this.eraserPosition.x = pointer.x;
        this.eraserPosition.y = pointer.y;
        this.eraser.setPosition(pointer.x, pointer.y);

        this.checkProximity();
    }

    handlePointerUp(pointer) {
        console.log('debug 20'); // handlePointerUp called
        if (this.isFrozen) return;
        this.isErasing = false;
        this.checkProximity();
    }

    checkProximity() {
        console.log('debug 21'); // checkProximity called
        if (this.chalkPath.length === 0) {
            // No chalk left
            return;
        }

        // Find the closest point on the chalk path to the eraser
        let closestPoint = null;
        let minDist = Infinity;

        for (let point of this.chalkPath) {
            let dist = Phaser.Math.Distance.Between(point.x, point.y, this.eraserPosition.x, this.eraserPosition.y);
            if (dist < minDist) {
                minDist = dist;
                closestPoint = point;
            }
        }

        if (closestPoint) {
            if (minDist <= this.chalkWidth + 20) { // 20px margin
                console.log('debug 22'); // Within proximity to erase
                // Erase the chalk at this point
                this.eraseChalkAt(closestPoint);
                this.lastWipedDistance += this.chalkWidth;
                if (this.lastWipedDistance >= this.wipedDistanceThreshold) {
                    console.log('debug 23'); // onChalkWiped callback triggered
                    this.onChalkWiped && this.onChalkWiped();
                    this.lastWipedDistance = 0;
                }
            } else {
                console.log('debug 24'); // Too far from chalk stroke
                // Too far from chalk stroke
                this.onWipeFailed && this.onWipeFailed();
                this.freeze();
            }
        }
    }

    eraseChalkAt(point) {
        console.log('debug 25'); // eraseChalkAt called
        // Remove the point from chalkPath and redraw
        const index = this.chalkPath.indexOf(point);
        if (index > -1) {
            this.chalkPath.splice(index, 1);
            this.redrawChalk();
        }
    }

    redrawChalk() {
        console.log('debug 26'); // redrawChalk called
        this.chalkGraphics.clear();
        this.chalkGraphics.lineStyle(this.chalkWidth, this.chalkColor, 1);
        if (this.chalkPath.length === 0) return;

        this.chalkGraphics.beginPath();
        this.chalkGraphics.moveTo(this.chalkPath[0].x, this.chalkPath[0].y);
        for (let point of this.chalkPath) {
            this.chalkGraphics.lineTo(point.x, point.y);
        }
        this.chalkGraphics.strokePath();
    }

    freeze() {
        console.log('debug 27'); // freeze called
        this.isFrozen = true;
        this.isErasing = false;
        // Additional visual feedback can be added here
    }

    resumeGame() {
        console.log('debug 28'); // resumeGame called
        this.isFrozen = false;
    }
}



class WipeTheChalk {
    constructor({ onChalkWiped, onWipeFailed }) {
        // console.log('debug 1'); // Constructor called
        // Store external callback functions
        this.onChalkWiped = onChalkWiped;
        this.onWipeFailed = onWipeFailed;

        // Initialize game properties
        this.game = null;
        this.gameConfig = null;

        // Bind methods
        this.eraseBoard = this.eraseBoard.bind(this);
        this.newGame = this.newGame.bind(this);
        this.freezeGame = this.freezeGame.bind(this);
        this.resumeGame = this.resumeGame.bind(this);
    }

    eraseBoard() {
        // console.log('debug 2'); // eraseBoard called
        if (this.game && this.game.scene.getScene('MainScene')) {
            this.game.scene.getScene('MainScene').eraseBoard();
        }
    }

    newGame({ chalkWidth = 5, chalkColor = 0xFFFFFF }) {
        // console.log('debug 3'); // newGame called
        // If a game instance already exists, destroy it
        if (this.game) {
            console.log('debug 4'); // Destroying existing game instance
            this.game.destroy(true);
        }

        // Define game configuration
        this.gameConfig = {
            type: Phaser.AUTO,
            // parent: 'game-container',
            width: window.innerWidth,
            height: window.innerHeight,
            // backgroundColor: '#2d2d2d',
            backgroundColor: '#ff33ff',
            scene: MainScene,
            // scene: {
            //     key: 'MainScene',
            //     // active: false, // Do not start automatically
            //     active: true,
            //     scene: MainScene
            // },
            physics: {
                default: 'arcade',
                arcade: {
                    // debug: false
                    debug: true,
                }
            },
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH
            }
        };

        // Initialize the game
        // console.log('debug 5'); // Initializing Phaser.Game
        this.game = new Phaser.Game(this.gameConfig);

        // Start the MainScene with initialization data
        console.log('debug 6'); // Starting MainScene
        this.game.scene.start('MainScene', {
            chalkWidth,
            chalkColor,
            callbacks: {
                onChalkWiped: this.onChalkWiped,
                onWipeFailed: this.onWipeFailed
            }
        });
    }

    freezeGame() {
        console.log('debug 7'); // freezeGame called
        if (this.game && this.game.scene.getScene('MainScene')) {
            this.game.scene.getScene('MainScene').freeze();
        }
    }

    resumeGame() {
        console.log('debug 8'); // resumeGame called
        if (this.game && this.game.scene.getScene('MainScene')) {
            this.game.scene.getScene('MainScene').resumeGame();
        }
    }
}
