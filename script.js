"use strict"

//  - Global Variables

const mainContainer = document.createElement("div");
mainContainer.id = "main-container";

const optionsContainer = document.createElement("div");
optionsContainer.id = "options-container";

const inputColor = document.createElement("input");
inputColor.type = "color";

const btnChangeGridSize = document.createElement("button");
btnChangeGridSize.textContent = "Change Grid Size";

const btnToggleGrid = document.createElement("button");
btnToggleGrid.textContent = "Toggle Grid";

let gridArray = [];
let gridSize = 16;
let currentColor = inputColor.value;
let mouseMoving = false;

//  - Functions

function changeCurrentColor() {
    currentColor = inputColor.value;
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

optionsContainer.appendChild(inputColor);
optionsContainer.appendChild(btnChangeGridSize);

gridArray = createGrid(gridArray);
appendGrid(gridArray);

document.body.appendChild(mainContainer);
document.body.appendChild(optionsContainer);

// Change the currentColor with the select button
inputColor.addEventListener("change", changeCurrentColor);

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

// Implementar la opción de poder dibujar arrastrando el mouse
//Hacer un toggle
mainContainer.addEventListener("mousedown", () => {mouseMoving = true});
mainContainer.addEventListener("mouseup", () => {mouseMoving = false});
mainContainer.addEventListener("mouseleave", () => {mouseMoving = false});

//Arrastrar el mouse
mainContainer.addEventListener("mousemove", (event) => {
    let target = event.target;

    if (mouseMoving && target.className === "square") {
        target.style.backgroundColor = currentColor;
    }
});