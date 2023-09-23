/* Represents a single square in a tic-tac-toe grid */
export default function Square( {value, updateSquare} ) {
    return (
            <button className = "square" onClick = {updateSquare}>
                {value}
            </button>
    );
}