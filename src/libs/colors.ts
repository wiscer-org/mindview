/**
 * This file contains the colors related statics or utility functions 
 */
// Define pairs of similar colors
export const similarColors: [string, string][] = [
    ["red", "pink"],
    ["red", "orange"],
    ["blue", "green"],
    ["blue", "lightblue"],
    ["blue", "teal"],
    ["orange", "brown"],
    ["orange", "yellow"],
    ["green", "lime"],
    ["green", "teal"],
    ["gray", "darkgray"],
    ["black", "gray"],
    ["yellow", "gold"],
];

// More advance similar colors
export const similarColorsAdvanced = [
    ["teal", "turquoise"],
    ["orange", "coral"],
    ["purple", "violet"],
    ["brown", "sienna"],
];

// Randomize similar colors
export function randomSimilarColorPair(): [string, string] {

    // Get random color pair
    let randomIndex = Math.floor(Math.random() * similarColors.length);
    let colorPair = similarColors[randomIndex];

    // Randomly swap the order
    if (Math.random() < 0.5) {
        colorPair = [colorPair[1], colorPair[0]];
    }
    return colorPair
}