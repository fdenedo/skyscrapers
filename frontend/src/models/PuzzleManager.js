import { Observer } from "../utils/Observer.js";

export default class PuzzleManager extends Observer {
    constructor(renderer, puzzle = []) {
        super();
        this.renderer = renderer;
        this.puzzle = puzzle;

        this.puzzleState = '';
    }

    notify(event, changedCells) {

        console.log(`Received event: ${event}, with data:`, changedCells)

        if(event === 'StartGame') {
            console.log(`Entering 'StartGame' logic`)
            this.newPuzzle({}); // TODO: IMPLEMENT THIS
        }

        if(event === 'userChangedCellValue') {
            console.log(`Entering 'userChangedCellValue' logic`)
            console.log(`Looping through ${changedCells.length} changed cells`)
            
            for(const cell of changedCells) {
                this.puzzle.userInput(cell.x, cell.y, cell.value)
            }
            console.log(`For loop complete, currentState: ${this.puzzle.currentState}`);

            if(this.puzzle.isFilled()) {
                this.puzzleState = 'FILLED';
                console.log("PUZZLE IS FILLED");
                if(this.puzzle.isSolved()) {
                    console.log("PUZZLE IS SOLVED");
                }
            } else {
                console.log(`Errors: `, this.puzzle.checkCellsForErrors(changedCells))
            }
        }

        if(event === 'userClearedCells') {
            console.log(`Entering 'userClearedCells' logic`)
            console.log(`Looping through ${changedCells.length} changed cells`)
            for(const cell of changedCells) {
                this.puzzle.userInput(cell.x, cell.y, 0);
            }
            console.log(`For loop complete, currentState: ${this.puzzle.currentState}`);
        }
    }

    newPuzzle(
        gridSize,
        givenDigits = [],
        topClues = [],
        bottomClues = [],
        leftClues = [],
        rightClues = []
    ) {
        this.renderer.generateGrid(gridSize);

        // Populate Given Digits
        for(let i = 0; i < givenDigits.length; i++) {
            for(let j = 0; j < givenDigits[i].length; j++) {
                this.renderer.populateGivenCellAt(j, i, givenDigits[i][j]);
            }
        }

        this.renderer.populateClues('top', topClues);
        this.renderer.populateClues('bottom', bottomClues);
        this.renderer.populateClues('left', leftClues);
        this.renderer.populateClues('right', rightClues);
    }

    newPuzzle(puzzle) {
        this.puzzle = puzzle;
        this.renderer.generateGrid(puzzle.gridSize);

        // Populate Given Digits
        for(let i = 0; i < puzzle.givenDigits.length; i++) {
            for(let j = 0; j < puzzle.givenDigits[i].length; j++) {
                this.renderer.populateGivenCellAt(j, i, puzzle.givenDigits[i][j]);
            }
        }

        this.renderer.populateClues('bottom', puzzle.bottomClues);
        this.renderer.populateClues('top', puzzle.topClues);
        this.renderer.populateClues('left', puzzle.leftClues);
        this.renderer.populateClues('right', puzzle.rightClues);
    }
    
}