let counter = 1;

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        console.log(`${counter++} constructor start`);
        console.log(`${counter++} constructor end`);
    }

    preload() {
        console.log(`${counter++} preload start`);
        // Load assets if needed
        console.log(`${counter++} preload end`);
    }

    create() {
        console.log(`${counter++} create start`);
        this.add.text(100, 100, 'Hello Phaser', { font: '40px Arial', fill: '#ffffff' });
        console.log(`${counter++} create end`);
    }

    update() {
        console.log(`${counter++} update start`);
        // Update logic here if needed
        console.log(`${counter++} update end`);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // scene: MainScene,
    scene: {
        key: 'MainScene',
        // active: false, // Do not start automatically
        active: true,
        scene: MainScene
    }
};

console.log(`${counter++} Phaser game initialization start`);
const game = new Phaser.Game(config);
console.log(`${counter++} Phaser game initialization end`);
