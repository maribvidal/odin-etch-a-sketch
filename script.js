"use strict"

//  - Global Variables

const mainContainer = document.createElement("div");
mainContainer.id = "main-container";

const GRID_SIZE = 16;

let gridArray;

//  - Functions

function createGrid() {
    let array = [];
    // ROWS
    for (let i = 0; i < GRID_SIZE; i++) {
        array[i] = [];
        // COLUMNS
        for (let j = 0; j < GRID_SIZE; j++) {
            const newDiv = document.createElement("div");
            newDiv.className = "square";
            array[i][j] = newDiv;
        }
    }
    return array;
}

// Appends the gridArray elements to the main div
function appendGrid(array) {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            mainContainer.appendChild(array[i][j]);
        }
    }
}

//  - General logic

gridArray = createGrid(gridArray);
appendGrid(gridArray);
document.body.appendChild(mainContainer);