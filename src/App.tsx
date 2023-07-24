import React, { useState } from "react";
import './App.css';
import ChoiceButton from './ChoiceButton'; 
import GameResult from './GameResult'; 
import RulesModal from "./RulesModal";
import { useEffect } from "react";


const choices = ["rock", "paper", "scissors", "lizard", "spock"];
class RockPaperScissorsGame {
  round = 1;
  playerScore = 0;
  computerScore = 0;
  result = "";

  generateComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  playRound(playerChoice: string) {
    const computerChoice = this.generateComputerChoice();

    if (
      (playerChoice === "rock" && (computerChoice === "scissors" || computerChoice === "lizard")) ||
      (playerChoice === "scissors" && (computerChoice === "paper" || computerChoice === "lizard")) ||
      (playerChoice === "paper" && (computerChoice === "rock" || computerChoice === "spock")) ||
      (playerChoice === "lizard" && (computerChoice === "spock" || computerChoice === "paper")) ||
      (playerChoice === "spock" && (computerChoice === "scissors" || computerChoice === "rock"))
    ) {
      this.result = "You win!";
      this.playerScore++;
    } else if (
      (playerChoice === "rock" && (computerChoice === "paper" || computerChoice === "spock")) ||
      (playerChoice === "scissors" && (computerChoice === "rock" || computerChoice === "spock")) ||
      (playerChoice === "paper" && (computerChoice === "scissors" || computerChoice === "lizard")) ||
      (playerChoice === "lizard" && (computerChoice === "rock" || computerChoice === "scissors")) ||
      (playerChoice === "spock" && (computerChoice === "paper" || computerChoice === "lizard"))
    ) {
      this.result = "Computer wins!";
      this.computerScore++;
    } else {
      this.result = "Tie!";
    }

    this.round++;
  }

  isGameOver() {
    return this.round > 3;
  }

  reset() {
    this.round = 1;
    this.playerScore = 0;
    this.computerScore = 0;
    this.result = "";
  }

  getOverallWinner() {
    if (this.playerScore > this.computerScore) {
      return 'You';
    } else if (this.computerScore > this.playerScore) {
      return 'Computer';
    } else {
      return 'Tie';
    }
  }
}

function App() {
  const [choice, setChoice] = useState("");
  const [game, setGame] = useState(new RockPaperScissorsGame());
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [overallWinner, setOverallWinner] = useState('');

  const toggleRulesModal = () => {
    setShowRulesModal((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === "Escape") {
        setShowRulesModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleClick(selectedChoice: React.SetStateAction<string>) {
    setChoice(selectedChoice);
  }
  function handleStart() {
    setIsGameStarted(true);
  }

  function handleNext() {

    const updatedGame = new RockPaperScissorsGame();
    Object.assign(updatedGame, game);
    updatedGame.playRound(choice);
    setGame(updatedGame);
    setChoice("");

    if (updatedGame.isGameOver()) {
     
      const winner = updatedGame.getOverallWinner();
      setOverallWinner(winner);
    }
  }

  function handleReset() {
    const updatedGame = new RockPaperScissorsGame();
    setGame(updatedGame);
    setChoice("");
    setIsGameStarted(false);
    setOverallWinner(''); 
  }

  

  return (
   <div className="App">
      <h1>Rock Paper Scissors Lizard Spock</h1>
      {!isGameStarted && (
        <div className={`start-button-container fade-in`}>
          <button onClick={handleStart} className="Start-button">
            Start
          </button>
          <button className="rules-button" onClick={toggleRulesModal}>
            Rules
          </button>
        </div>
      )}
      {isGameStarted && (
        <div className={`game-container fade-in`}>
          <div className="choices-container">
            {choices.map((c) => (
              <ChoiceButton
                key={c}
                choice={c}
                onClick={handleClick}
              />
            ))}
          </div>
          <div className="game-info">
           {game.round < 4 ? <p>Round: {game.round}</p> : null}
            <GameResult
              result={game.result}
              playerScore={game.playerScore}
              computerScore={game.computerScore}
            />
            {!game.isGameOver() ? (
             <div> 
              <button onClick={handleNext} disabled={choice === ""}>
                Play
              </button>

              <div><button onClick={handleReset}>Reset</button></div>
              </div>
            ) : (
              <div className="game-over">
                <p>Game Over!</p>
                {overallWinner && <p>Overall Winner: {overallWinner}</p>}
                <button onClick={handleReset}>Play Again</button>
              </div>
              
            )}
          </div>
          <button className="rules-button" onClick={toggleRulesModal}>
            Rules
          </button>
        </div>
      )}
      <RulesModal isOpen={showRulesModal} onClose={toggleRulesModal} />
    </div>
  );
}
export default App;


