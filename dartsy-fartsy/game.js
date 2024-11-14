// Start up       
$(document).foundation();



// game.js

// Function to open the Settings modal
function openSettings() {
    // Using Foundation's Reveal plugin to open the modal
    console.log('Open setting');
    $('#settings-modal').foundation('open');
}

// Attach the click event to the Settings button
document.getElementById('settings-button').addEventListener('click', openSettings);

// Initialize your Phaser game here
// const config = {
//     type: Phaser.AUTO,
//     parent: 'game-container',
//     width: 800,
//     height: 600,
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };

// const game = new Phaser.Game(config);

// function preload() {
//     // Load your game assets here
//     this.load.image('dartboard', 'path/to/dartboard.png');
// }

// function create() {
//     // Create your game objects here
//     const dartboard = this.add.sprite(400, 300, 'dartboard');
//     // Add animations and interactions as needed
// }

// function update() {
//     // Game loop logic
// }
