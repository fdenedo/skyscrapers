import Renderer from "./Renderer.js";
import { Observable } from "../utils/Observer.js";
import { findAncestor } from "../helpers/helper.js";

export default class InputHandler extends Observable {
    constructor() {
        super();
        this.shiftPressed = false;
        this.maxSize = 0;
        this.isGridInteractable = false;
        this.observers = [];
    }

    initialiseGlobalEventListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Shift") {
                this.shiftPressed = true;
            }
        });

        document.addEventListener("keyup", (event) => {
            if (event.key === "Shift") {
                this.shiftPressed = false;
            }
        });

        document.addEventListener("keydown", (event) => this.handleKeyDown(event));
        document.addEventListener("keyup", (event) => this.handleKeyUp(event));
    }

    setMaxSize(gridSize) {
        this.maxSize = gridSize;
    }

    addClickEventListenersToGrid() {
        const grid = document.querySelector(`.${Renderer.GRID_CLASS}`);
        grid.addEventListener('click', (event) => this.handleCellClick(event));
    }

    handleCellClick(event) {
        if(!this.isGridInteractable) return;

        const clickedCell = findAncestor(event.target, '.cell');
        console.log(`Clicked: `, clickedCell)

        if(this.shiftPressed) {
            this.notifyObservers('ToggleCellSelect', clickedCell)
        } else {
            this.notifyObservers('SelectCell', clickedCell)
        }
        
    }

    handleKeyDown(event) {
        if(!this.isGridInteractable) return;

        const keyPressed = event.key;
        let selectedCells = []

        if(!isNaN(keyPressed)) {
            const val = parseInt(keyPressed, 10);
            if(val > 0 && val <= this.maxSize) {
                selectedCells = Renderer.getAllSelectedCells();
                this.notifyObservers('UpdateCellValues', val)
                this.notifyObservers(
                    'userChangedCellValue', 
                    selectedCells.map(cell => ({x: cell.x, y: cell.y, value: val}))
                )
            }
        }

        if(keyPressed === "Delete" || keyPressed === "Backspace") {
            selectedCells = Renderer.getAllSelectedCells();
            this.notifyObservers('ClearSelectedCells', {});
            this.notifyObservers(
                'userClearedCells', 
                selectedCells.map(cell => ({x: cell.x, y: cell.y, value: 0}))
            );
        }   
    }

    handleKeyUp(event) {
        if(!this.isGridInteractable) return;

        if (event.key === "Escape") {
            this.notifyObservers('DeselectAll', {});
        }
    }
    
}