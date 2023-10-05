import InputHandler from "./models/InputHandler.js";
import PuzzleManager from "./models/PuzzleManager.js";
import Puzzle from "./models/Puzzle.js";
import GameManager from "./models/GameManager.js";
import Renderer from "./models/Renderer.js";

const main = () => {
    const gameManager = new GameManager();
    const inputHandler = new InputHandler();
    const renderer = new Renderer();
    const puzzleManager = new PuzzleManager(renderer);
    inputHandler.addObserver(renderer);
    inputHandler.addObserver(puzzleManager);
    gameManager.addObserver(renderer);

    const examplePuzzle = new Puzzle({
        gridSize: 5,
        givenDigits: [
            [1,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,1],
            [0,0,0,4,2],
            [0,0,2,0,0]
        ],
        bottomClues: [0,0,0,1,0],
        leftClues: [0,1,0,0,0]
    })

    const examplePuzzle2 = new Puzzle({
        gridSize: 3,
        givenDigits: [
            [1,0,0],
            [0,2,0],
            [0,0,0],
        ],
        topClues: [2,0,0],
        leftClues: [0,1,0]
    })

    inputHandler.initialiseGlobalEventListeners();
    inputHandler.addClickEventListenersToGrid();
    inputHandler.setMaxSize(examplePuzzle2.gridSize);

    puzzleManager.newPuzzle(examplePuzzle2);
}

document.addEventListener("DOMContentLoaded", main);
