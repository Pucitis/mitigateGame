
interface GameResultProps {
  result: string;
  playerScore: number;
  computerScore: number;
}

function GameResult({ result, playerScore, computerScore }: GameResultProps) {
  return (
    <>
      <p>{result}</p>
      <p>You {playerScore} : {computerScore} Computer</p>
    </>
  );
}

export default GameResult;

