"use strict"

//  - Global Variables

const HEX_RED = "#FF0000";
const HEX_BLUE = "#0000ff";
const HEX_GREEN = "#00ff00";
const HEX_WHITE = "#ffffff";

const mainContainer = document.createElement("div");
mainContainer.id = "main-container";

const optionsContainer = document.createElement("div");
optionsContainer.id = "options-container";

const optionRed = document.createElement("option");
optionRed.value = HEX_RED;
optionRed.textContent = "Red";

const optionBlue = document.createElement("option");
optionBlue.value = HEX_BLUE;
optionBlue.textContent = "Blue";

const optionGreen = document.createElement("option");
optionGreen.value = HEX_GREEN;
optionGreen.textContent = "Green";

const optionWhite = document.createElement("option");
optionWhite.value = HEX_WHITE;
optionWhite.textContent = "White";

const selectColor = document.createElement("select");
selectColor.name = "selectColor";

const btnChangeGridSize = document.createElement("button");
btnChangeGridSize.textContent = "Change Grid Size";

const btnToggleGrid = document.createElement("button");
btnToggleGrid.textContent = "Toggle Grid";

let gridArray = [];
let gridSize = 16;
let currentColor = HEX_RED;

//  - Functions

function changeCurrentColor() {
    currentColor = selectColor.value;
}

function changeGridSize() {
    let number = +prompt("Choose a number between 1 and 100", 16);
    if (number < 1 || number > 100)
        return false;

    gridSize = number;
    return true;
}

function calcFlexBasis() {
    return (100 / gridSize).toString() + "%";
}

function createGrid() {
    let array = [];
    // ROWS
    for (let i = 0; i < gridSize; i++) {
        array[i] = [];
        // COLUMNS
        for (let j = 0; j < gridSize; j++) {
            const newDiv = document.createElement("div");
            newDiv.className = "square";
            newDiv.style.flexBasis = calcFlexBasis();
            newDiv.addEventListener("click", (event) => {
                let target = event.target;
                target.style.backgroundColor = currentColor;
            });
            array[i][j] = newDiv;
        }
    }
    return array;
}

// Appends the gridArray elements to the main div
function appendGrid(array) {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            mainContainer.appendChild(array[i][j]);
        }
    }
}

function removeGrid(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            array[i][j].remove();
        }
    }
}

//  - General logic

selectColor.appendChild(optionRed);
selectColor.appendChild(optionBlue);
selectColor.appendChild(optionGreen);
selectColor.appendChild(optionWhite);
optionsContainer.appendChild(selectColor);
optionsContainer.appendChild(btnChangeGridSize);

gridArray = createGrid(gridArray);
appendGrid(gridArray);

document.body.appendChild(mainContainer);
document.body.appendChild(optionsContainer);

// Change the currentColor with the select button
selectColor.addEventListener("change", changeCurrentColor);

// Change the grid size
btnChangeGridSize.addEventListener("click", () => {
    if (!changeGridSize()) {
        alert("ERROR: Invalid input");
    } else {
        removeGrid(gridArray);
        gridArray = [];
        gridArray = createGrid();
        appendGrid(gridArray);
    }
});