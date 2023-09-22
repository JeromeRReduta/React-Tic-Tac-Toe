import Grid from "./Grid"
import { useState } from "react";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]); // Note that this is an array of array[9]'s
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;
    
    console.log("history[0]: " + history[0]);
    console.log("history[history.length-1]: " + history[history.length-1]);

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function listMoves() {
        const moves = history.map((squares, move) => {
            let description = "Jump to move " + move;
            return (
                <li key={move}>
                    <button onClick = {() => setCurrentMove(move)}>
                        {description}
                    </button>
                </li>
            )
        });
        return moves;
    }

    return (
        <div className="game">
            <div className="game-board">
                <Grid
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                    column_length={3}
                    row_length={3}/>
            </div>
            <div className="game-info">
                <ol>{listMoves()}</ol>
            </div>
        </div>
    );
}