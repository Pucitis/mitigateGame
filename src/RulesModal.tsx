
type RulesProps = {
  isOpen: boolean; // Specify the type for the isOpen prop
  onClose: () => void;
};

const Rules: React.FC<RulesProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; // Don't render the modal if it's not open
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="rules-content">
          <h2>Player vs. Computer Rules</h2>
          <div>
            <div>Rock crushes Scissors.</div>
            <div>Scissors cuts Paper.</div> 
            <div>Paper covers Rock.</div> 
            <div> Rock crushes Lizard.</div> 
            <div> Lizard poisons Spock.</div>
            <div>Spock smashes Scissors.</div> 
            <div>Scissors decapitates Lizard.</div> 
            <div>Lizard eats Paper.</div> 
            <div>Paper disproves Spock.</div> 
            <div>Spock vaporizes Rock.</div> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rules;
