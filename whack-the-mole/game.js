// game.js

class WhackTheMole {
    constructor({
        visibleTimeout = 2,
        onWhacked = () => { },
        parent = 'game-container',
        width = 1000,
        height = 800
    } = {}) {
        this.visibleTimeout = visibleTimeout * 1000; // Convert to milliseconds
        this.onWhacked = onWhacked;
        this.parent = parent;
        this.width = width;
        this.height = height;
        this.isPaused = false;
        this.currentMole = null;
        this.moleTimer = null;
        this.isGameActive = false;
        this.phaserScene = null; // Reference to the Phaser scene

        const self = this; // Reference to the WhackTheMole instance

        // Initialize Phaser game with properly defined scene methods
        this.config = {
            type: Phaser.AUTO,
            width: this.width,
            height: this.height,
            parent: this.parent,
            transparent: true, // Set transparent background
            scene: {
                preload: function () { self.preload(this); },
                create: function () { self.create(this); },
                update: function (time, delta) { self.update(this, time, delta); }
            },
            // backgroundColor: '#88F' // Optional, can remove if using full transparency
            backgroundColor: '#a00'
        };

        this.game = new Phaser.Game(this.config);
    }

    preload(scene) {
        // Load assets for the mole, 'whacked' image, and sound effects
        scene.load.image('mole', './assets/mole-4.png');          // Mole image
        scene.load.image('whacked', './assets/whacked.png');    // 'Whacked' image
        scene.load.audio('whackSound', './assets/whack.mp3');   // Whack sound when mole is hit
        scene.load.audio('missedSound', './assets/missed.mp3'); // Missed sound for when player misses
    }

    create(scene) {
        this.phaserScene = scene; // Store reference to the Phaser scene

        // Listen for clicks on the scene
        scene.input.on('pointerdown', (pointer) => {
            // If there’s a current mole and the click wasn't on it, play missed sound
            if (this.currentMole && !this.currentMole.getBounds().contains(pointer.x, pointer.y)) {
                scene.sound.play('missedSound');
            }
        });

        // Start the first game
        this.newGame();
    }

    update(scene, time, delta) {
        // Add any update logic here if needed
    }

    setVisibleTimeout(newTimeout) {
        this.visibleTimeout = newTimeout * 1000; // Convert to milliseconds
    }

    newGame() {
        if (this.currentMole) {
            this.currentMole.destroy();
            this.currentMole = null;
        }

        if (this.moleTimer) {
            clearTimeout(this.moleTimer);
            this.moleTimer = null;
        }

        this.isGameActive = true;
        this.spawnMole();
    }

    pauseGame() {
        if (this.isPaused) return;

        this.isPaused = true;

        if (this.currentMole) {
            this.currentMole.destroy();
            this.currentMole = null;
        }

        if (this.moleTimer) {
            clearTimeout(this.moleTimer);
            this.moleTimer = null;
        }

        if (this.phaserScene) {
            this.phaserScene.scene.pause();
        }
    }

    resumeGame() {
        if (!this.isPaused) return;

        this.isPaused = false;

        if (this.phaserScene) {
            this.phaserScene.scene.resume();
        }

        if (this.isGameActive) {
            this.spawnMole();
        }
    }

    spawnMole() {
        if (!this.isGameActive || !this.phaserScene) return;

        // Randomize position for the mole within screen bounds
        const x = Phaser.Math.Between(50, this.width - 50);
        const y = Phaser.Math.Between(50, this.height - 50);

        // Create mole sprite at a random position
        const mole = this.phaserScene.add.sprite(x, y, 'mole');
        mole.setInteractive({ useHandCursor: true });
        mole.setScale(0); // Start hidden

        // Tween for pop-up animation
        this.phaserScene.tweens.add({
            targets: mole,
            scale: 1,
            duration: 300,
            ease: 'Bounce.easeOut'
        });

        mole.on('pointerdown', () => {
            if (!this.isGameActive) return;

            this.onWhacked();

            // Replace mole with 'whacked' image and play sound
            mole.setTexture('whacked'); // Change mole to "whacked" image
            this.phaserScene.sound.play('whackSound'); // Play whacking sound

            // Clear the timer since mole was whacked
            if (this.moleTimer) {
                clearTimeout(this.moleTimer);
                this.moleTimer = null;
            }

            // Hide the "whacked" mole and spawn a new mole after a delay
            this.moleTimer = setTimeout(() => {
                mole.destroy();
                this.spawnMole();
            }, 500);
        });

        this.currentMole = mole;

        // Set a timer to hide the mole after visibleTimeout if it wasn't whacked
        this.moleTimer = setTimeout(() => {
            mole.destroy();
            this.currentMole = null;
            this.spawnMole();
        }, this.visibleTimeout);
    }
}

// Example usage:
// Ensure you have a div with id 'game-container' in your HTML.
// const game = new WhackTheMole({
//     visibleTimeout: 2,
//     onWhacked: () => {
//         console.log('Mole whacked!');
//         // Increment score or handle externally
//     }
// });

// To start a new game:
// game.newGame();

// To pause the game:
// game.pauseGame();

// To resume the game:
// game.resumeGame();

// To change the visible timeout:
// game.setVisibleTimeout(3);