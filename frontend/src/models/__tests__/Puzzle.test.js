import Puzzle from '../Puzzle.js';

describe('Puzzle Class', () => {

    const incorrectlyfilledPuzzle = new Puzzle({});
    const correctlyfilledPuzzle = new Puzzle({});
    const partiallyFilledPuzzle = new Puzzle({});
    const partiallyFilledWithErrors = new Puzzle({});

  describe('constructor', () => {
    let defaultPuzzle, givenValuesPuzzle;

    beforeEach(() => {
        defaultPuzzle = new Puzzle({
            gridSize: 5
        });

        givenValuesPuzzle = new Puzzle({
            gridSize: 5,
            givenDigits: [
                [1,0,2,5,4],
                [3,0,0,0,1],
                [0,0,3,0,0],
                [4,0,1,2,3],
                [0,0,0,0,5]
            ],
            topClues: [1, 2, 3, 4, 5],
            bottomClues: [5, 4, 3, 2, 1],
            leftClues: [1, 2, 3, 4, 5],
            rightClues: [5, 4, 3, 2, 1],
        })
    });

    const defaultPuzzleExpected = [
        ['gridSize', 5],
        ['givenDigits', []],
        ['topClues', []],
        ['bottomClues', []],
        ['leftClues', []],
        ['rightClues', []],
        ['currentState', []],
        ['errors', []]
    ]

    test.each(defaultPuzzleExpected)(
        'should properly initialise default property %s',
        (property, expected) => {
            expect(defaultPuzzle[property]).toEqual(expected);
        }
    )

    const givenPuzzleExpected = [
        ['gridSize', 5],
        ['givenDigits', [
            [1,0,2,5,4],
            [3,0,0,0,1],
            [0,0,3,0,0],
            [4,0,1,2,3],
            [0,0,0,0,5]
        ]],
        ['topClues', [1, 2, 3, 4, 5]],
        ['bottomClues', [5, 4, 3, 2, 1]],
        ['leftClues', [1, 2, 3, 4, 5]],
        ['rightClues', [5, 4, 3, 2, 1]],
        ['currentState', [
            [1,0,2,5,4],
            [3,0,0,0,1],
            [0,0,3,0,0],
            [4,0,1,2,3],
            [0,0,0,0,5]
        ]],
        ['errors', []]
    ]

    test.each(givenPuzzleExpected)(
        'should properly initialise given property %s',
        (property, expected) => {
            expect(givenValuesPuzzle[property]).toEqual(expected);
        }
    )
  });

  describe('userInput', () => {
    it('should update currentState for valid input', () => {
      // Test here
    });

    it('should not update for invalid input', () => {
      // Test here
    });
  });

  describe('validate', () => {
    it('should perform validation logic', () => {
      // Test here
    });
  });

  describe('isFilled', () => {
    it('should return true for a filled grid', () => {
      // Test here
    });

    it('should return false for an incomplete grid', () => {
      // Test here
    });
  });

  describe('isSolved', () => {
    it('should return true for a solved puzzle', () => {
      // Test here
    });

    it('should return false for an unsolved puzzle', () => {
      // Test here
    });
  });

  describe('toJSON', () => {
    it('should convert the puzzle state to JSON', () => {
      // Test here
    });
  });

  describe('fromJSON', () => {
    it('should set the puzzle state from JSON', () => {
      // Test here
    });
  });

  // More tests for other methods can be added here
});
