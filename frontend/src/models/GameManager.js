import { Observable } from "../utils/Observer";

export default class GameManager extends Observable {
    constructor() {
      super();
        this.timer;
        this.showErrors = false;
        this.zenMode = false;
        this.solved = true;
        this.currentState = 'MainMenu';
        this.observers = [];
    }
      
        // Function to change the state
        changeState(newState) {
          switch (this.currentState) {
            case 'MainMenu':
              if (newState === 'Playing') {
                this.notifyObservers('StartGame');
                this.startGame();
              }
              break;
            case 'Playing':
              if (newState === 'GameComplete') {
                this.gameOver();
              } else if (newState === 'MainMenu') {
                this.resetGame();
              }
              break;
            case 'GameComplete':
              if (newState === 'MainMenu') {
                this.resetGame();
              }
              break;
            default:
              console.log('Invalid state');
              break;
          }
          this.currentState = newState;
        }

        startGame() {
            this.timer.start();
          // Logic for starting the game
          console.log("Game started");
        }
      
        gameOver() {
          // Logic for game over
          console.log("Game over");
        }
      
        resetGame() {
          // Logic for resetting the game
          console.log("Game reset");
        }
      
      

    showMainMenu() {

    }

    startTimer() {

    }

    start() {
        
    }

    stop() {

    }

}