
interface ChoiceButtonProps {
  choice: string;
  onClick: (choice: string) => void;
}

function ChoiceButton({ choice, onClick }: ChoiceButtonProps) {
  return <button onClick={() => onClick(choice)}>{choice}</button>;
}

export default ChoiceButton;
