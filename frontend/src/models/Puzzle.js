export default class Puzzle {
    constructor({
        gridSize,
        givenDigits = [],
        topClues = [],
        bottomClues = [],
        leftClues = [],
        rightClues = []
    }) {
        this.gridSize = gridSize;
        this.givenDigits = givenDigits;
        this.topClues = topClues;
        this.bottomClues = bottomClues;
        this.leftClues = leftClues;
        this.rightClues = rightClues;

        this.currentState = givenDigits.map(row => [...row]);
        this.errors = [];
    }

    userInput(x, y, value) {
        console.log(`Puzzle received userInput for ${x},${y} of ${value}`)
        if (this.givenDigits[y][x]) return;
        this.currentState[y][x] = value;
    }

    validate() {

    }

    isFilled() {
        for(let i = 0; i < this.gridSize; i++) {
            for(let j = 0; j < this.gridSize; j++) {
                if(this.currentState[j][i] < 1) return false;
            }
        }
        return true;
    }

    isSolved() {
        for(let i = 0; i < this.gridSize; i++) {
            if (
                this.duplicatesInRow(i).length > 0 ||
                this.duplicatesInColumn(i).length > 0 ||
                !this.isClueSatisfied('top', i, this.topClues[i]) ||
                !this.isClueSatisfied('bottom', i, this.bottomClues[i]) ||
                !this.isClueSatisfied('left', i, this.leftClues[i]) ||
                !this.isClueSatisfied('right', i, this.rightClues[i])
            ) {
                return false;
            }
        }

        return true;
    }

    toJSON() {

    }

    fromJSON(json) {

    }

    getRow(y) {
        return this.currentState[y];
    }

    getColumn(x) {
        return this.currentState.map((value) => value[x]);
    }

    checkForDuplicates(array) {
        const valueToIndex = new Map();
        const duplicateIndices = []

        for (let i = 0; i < array.length; i++) {
            const value = array[i];

            if (value === 0) continue;
            
            if (valueToIndex.has(value)) {
              duplicateIndices.push({ index: i, value });
              duplicateIndices.push({ index: valueToIndex.get(value), value });
            } else {
              valueToIndex.set(value, i);
            }
          }
        
          // Remove duplicates from the duplicateIndices array
          return Array.from(new Set(duplicateIndices));
    }

    duplicatesInRow(y) {
        const duplicates = this.checkForDuplicates(this.getRow(y));
        return duplicates.map(dup => ({ x: dup.index, y: parseInt(y, 10), value: dup.value }));
    }

    duplicatesInColumn(x) {
        const duplicates = this.checkForDuplicates(this.getColumn(x));
        return duplicates.map(dup => ({ x: parseInt(x, 10), y: dup.index, value: dup.value }));
    }

    isClueSatisfied(clueDirection, index, clue) {
        if (!clue) return true;

        let array;

        switch(clueDirection) {
            case 'top':
                array = this.getColumn(index);
                break;
            case 'bottom':
                array = this.getColumn(index).reverse();
                break;
            case 'left':
                array = this.getRow(index);
                break;
            case 'right':
                array = this.getRow(index).reverse();
                break;
            default:
                break;
        }

        let seen = 0;
        let tallest = 0;

        for(let i = 0; i < array.length; i++) {
            if(array[i] > tallest) {
                tallest = array[i];
                seen++;
            }
        }

        return seen === clue;
    }

    checkCellsForErrors(cells) {
        const errorCells = [];
        const checkedRows = new Set();
        const checkedColumns = new Set();

        for(let cell of cells) {
            if (checkedRows.has(cell.y) && checkedColumns.has(cell.x)) {
                continue;
            }

            if (!checkedRows.has(cell.y)) {
                const dupesInRow = this.duplicatesInRow(cell.y);
                console.log(`Duplicates in Row: `, dupesInRow);

                if (dupesInRow.length > 0) {
                    errorCells.push(...dupesInRow.map(c => ({ x: c.x, y: cell.y, value: c.value })));
                }

                checkedRows.add(cell.y);
            }

            if (!checkedColumns.has(cell.x)) {
                const dupesInColumn = this.duplicatesInColumn(cell.x);
                console.log(`Duplicates in Column: `, dupesInColumn);

                if (dupesInColumn.length > 0) {
                    errorCells.push(...dupesInColumn.map(c => ({ x: c.x, y: c.y, value: c.value })));
                }

                checkedColumns.add(cell.x);
            }
        }
        
        return errorCells;
    }
}