/**
 * This file contains the shapes related statics or utility functions 
 */
export const shapes = [
    "square",
    "circle",
    "triangle",
    "star",
    "cross",
    "heart",
    "cloud",
    "snowflake",
    "rectangle",
    "diamond",
    "ellipse",
    "ring",
    "oval",
    "trapezoid",
    "pentagon",
    "hexagon",
    "octagon",
    "parallelogram",
    "heptagon",
    "nonagon",
    "sun",
    "arrow",
];

/**
 * Get random shapes
 */
export function randomShape(): string {
    return shapes[Math.floor(Math.random() * shapes.length)];
}

// Define pairs of similar shapes
export const similarShapes: [string, string][] = [
    ["square", "rectangle"],
    ["square", "diamond"],
    ["circle", "ellipse"],
    ["circle", "ring"],
    ["circle", "oval"],
    ["triangle", "trapezoid"],
    ["triangle", "pentagon"],
    ["hexagon", "octagon"],
    ["hexagon", "star"],
    ["heart", "arrow"],
    ["heart", "cloud"],
    ["star", "snowflake"],
];

// More advance similar shapes
export const similarShapesAdvanced = [
    ["trapezoid", "parallelogram"],
    ["pentagon", "heptagon"],
    ["octagon", "nonagon"],
    ["star", "sun"],
];

// Randomize similar shapes
export function randomSimilarShapePair(): [string, string] {

    // Get random shape pair
    let randomIndex = Math.floor(Math.random() * similarShapes.length);
    let shapePair = similarShapes[randomIndex];

    // Randomly swap the order
    if (Math.random() < 0.5) {
        shapePair = [shapePair[1], shapePair[0]];
    }
    return shapePair
}