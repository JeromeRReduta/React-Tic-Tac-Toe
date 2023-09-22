function eSquare({ value, onSquareClick }) {
    return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }

export default function Square( {value, updateSquare} ) {
    return (
            <button className = "square" onClick = {updateSquare}>
                {value}
            </button>
    );
}