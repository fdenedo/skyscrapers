import { Observer } from "../utils/Observer.js";

export default class Renderer extends Observer {
    constructor() {
        super();
        this.grid = document.querySelector('.grid');
    }

    // CSS Classes 
    static GRID_CLASS = 'grid';
    
    static CELL_CLASS = 'cell';
    static CELL_SELECTED_CLASS = 'selected';
    static CELL_GIVEN_CLASS = 'given';
    static ERROR_CLASS = 'error';
    static SELECTED_CELL_SELECTOR = `.${Renderer.CELL_CLASS}.${Renderer.CELL_SELECTED_CLASS}`;
    static GIVEN_CELL_SELECTOR = `.${Renderer.CELL_CLASS}.${Renderer.CELL_GIVEN_CLASS}`;

    static CELL_INNER_CONTAINER_CLASS = 'cell-inner-container';

    static CLUE_CONTAINER_CLASS = 'clue-container'
    static CLUE_CELL_CLASS = 'clue-cell';
    static CLUE_TOP_CLASS = 'top';
    static CLUE_BOTTOM_CLASS = 'bottom';
    static CLUE_LEFT_CLASS = 'left';
    static CLUE_RIGHT_CLASS = 'right';

    notify(event, data) {

        console.log(`Renderer received event: ${event}, with data:`, data)

        if(event === 'StartGame') {
            this.screenVisible('game');
        }
        if(event === 'DeselectAll') {
            this.deselectAll();
        }
        if(event === 'ToggleCellSelect') {
            this.toggleCellSelect(data);
        }
        if(event === 'SelectCell') {
            this.deselectAll();
            this.select(data);
        }
        if(event === 'UpdateCellValues') {
            this.updateSelectedCellValues(data);
        }
        if(event === 'ClearSelectedCells') {
            this.clearSelectedCells();
        }
    }

    static getAllSelectedCells() {
        const cells = []

        const selectedCells = document.querySelectorAll(Renderer.SELECTED_CELL_SELECTOR);

        selectedCells.forEach(cell => {
            cells.push({
                x: cell.dataset.x,
                y: cell.dataset.y
            });
        })
        console.log(`Selected cells:`, cells);

        return cells;
    }

    // Methods
    createAndAppendDiv(parentElement, manipulateFn) {
        const newDiv = document.createElement("div");

        if (typeof manipulateFn === "function") {
            manipulateFn(newDiv, this);
        }

        parentElement.appendChild(newDiv);
    }

    getMainMenu() {
        return document.querySelector('.main-menu');
    }

    getGameScreen() {
        return document.querySelector('.game');
    }

    getPuzzleCompleteModal() {
        return document.querySelector('.modal.puzzle-complete');
    }

    generateGrid(size) {
        // Clear grid
        this.grid.innerHTML = '';

        // Calculate pixel size of grid
        const gridSize = Math.min(
            400,
            Math.max(300, window.innerWidth - 50)
        );
        const cellSize = gridSize / size;

        this.grid.style.width = `${gridSize}px`;
        this.grid.style.height = `${gridSize}px`;

        // Update layout to size
        this.grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

        for (let i = 0; i < size ** 2; i++) {
            const cell = document.createElement("div");
            cell.classList.add(Renderer.CELL_CLASS);

            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;

            cell.dataset.x = i % size;
            cell.dataset.y = Math.floor(i / size);

            const cellInnerContainer = document.createElement("div");
            cellInnerContainer.classList.add(Renderer.CELL_INNER_CONTAINER_CLASS);
            cellInnerContainer.textContent = '';
            cell.appendChild(cellInnerContainer);
            
            this.grid.appendChild(cell);
        }

        const topClueContainer = document.querySelector(`.${Renderer.CLUE_CONTAINER_CLASS}.${Renderer.CLUE_TOP_CLASS}`);
        const bottomClueContainer = document.querySelector(`.${Renderer.CLUE_CONTAINER_CLASS}.${Renderer.CLUE_BOTTOM_CLASS}`);
        const leftClueContainer = document.querySelector(`.${Renderer.CLUE_CONTAINER_CLASS}.${Renderer.CLUE_LEFT_CLASS}`);
        const rightClueContainer = document.querySelector(`.${Renderer.CLUE_CONTAINER_CLASS}.${Renderer.CLUE_RIGHT_CLASS}`);

        const clueContainers = [
            topClueContainer,
            bottomClueContainer,
            leftClueContainer,
            rightClueContainer
        ]

        const mainAxisSize = gridSize;
        const crossAxisSize = '2.5rem';

        topClueContainer.style.width = mainAxisSize;
        topClueContainer.style.height = crossAxisSize;

        bottomClueContainer.style.width = mainAxisSize;
        bottomClueContainer.style.height = crossAxisSize;

        leftClueContainer.style.width = crossAxisSize;
        leftClueContainer.style.height = mainAxisSize;

        rightClueContainer.style.width = crossAxisSize;
        rightClueContainer.style.height = mainAxisSize;

        clueContainers.forEach(container => {
            for(let i = 0; i < size; i++) {
                const clueCell = document.createElement("div");
                clueCell.classList.add(Renderer.CLUE_CELL_CLASS);
                clueCell.dataset.index = i

                if(
                    container.classList.contains(Renderer.CLUE_TOP_CLASS) || 
                    container.classList.contains(Renderer.CLUE_BOTTOM_CLASS)
                ) {
                    clueCell.style.width = `${cellSize}px`;
                    clueCell.style.height = crossAxisSize;
                } else {
                    clueCell.style.width = crossAxisSize;
                    clueCell.style.height = `${cellSize}px`;
                }

                container.appendChild(clueCell);
            }
        });
    }

    screenVisible(screen) {
        switch(screen) {
            case 'mainMenu':
                this.getMainMenu.classList.remove('hidden');
                this.getGameScreen.classList.add('hidden');
                break;
            case 'game':
                this.getMainMenu.classList.add('hidden');
                this.getGameScreen.classList.remove('hidden');
                break;
            default:
                break;
        }
    }

    select(cell) {
        cell.classList.add(Renderer.CELL_SELECTED_CLASS);
        // this.updateBorders(cell);
        // this.updateNeighbourBorders(cell);
    }

    deselect(cell) {
        cell.classList.remove(Renderer.CELL_SELECTED_CLASS);
    }

    deselectAll() {
        const cells = document.querySelectorAll(Renderer.SELECTED_CELL_SELECTOR);
        cells.forEach((cell) => this.deselect(cell));
    }

    toggleCellSelect(cell) {
        cell.classList.toggle(Renderer.CELL_SELECTED_CLASS);
    }

    updateSelectedCellValues(value) {
        const selectedCells = document.querySelectorAll(Renderer.SELECTED_CELL_SELECTOR);
        const changedCells = [];

        selectedCells.forEach(cell => {
            if (cell.classList.contains(Renderer.CELL_GIVEN_CLASS)) return;
            cell.querySelector(`.${Renderer.CELL_INNER_CONTAINER_CLASS}`).textContent = value;
        });
    }

    clearSelectedCells() {
        const selectedCells = document.querySelectorAll(Renderer.SELECTED_CELL_SELECTOR);
        const changedCells = [];

        selectedCells.forEach(cell => {
            cell.querySelector(`.${Renderer.CELL_INNER_CONTAINER_CLASS}`).textContent = '';
        });
    }

    populateGivenCellAt(x, y, value) {
        if(value && value > 0) {
            const cell = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
            cell.querySelector(`.${Renderer.CELL_INNER_CONTAINER_CLASS}`).textContent = value;
            this.setCellAsGiven(cell);
        }
    }

    populateClues(clueContainerPosition, cluesToPopulate) {
        const clueContainerSelector = document.querySelector(`.${Renderer.CLUE_CONTAINER_CLASS}.${clueContainerPosition}`);
        
        for(let i = 0; i < cluesToPopulate.length; i++) {
            if (!cluesToPopulate[i] || cluesToPopulate[i] <= 0) continue;
            const clueCell = clueContainerSelector.querySelector(`[data-index='${i}']`);
            clueCell.textContent = cluesToPopulate[i];
        }
    }

    setCellAsGiven(cell) {
        cell.classList.add(Renderer.CELL_GIVEN_CLASS);
    }

    highlightError(cell) {
        cell.classList.add('error');
    }

    highlightSeenClueError(position, index) {
        const clue = document.querySelector(`.clue-container.${position}[data-index='${index}']`);
    }
}