import Square from "./Square";
import { useState } from "react";

export default function Grid( {
    column_length,
    row_length,
    xIsNext,
    squares,
    onPlay} ) {
    const [winner, setWinner] = useState("");

    function handleClick(i) {
        setWinner(calculateWinner(squares));
        if (squares[i]) { // If the square is already filled, do nothing
            return;
        }
        if (winner) { // If there's a winner, do nothing
            return;
        }

        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        onPlay(nextSquares);
        
      }

    function displayGrid() {
        const grid = Array.from({length: column_length}, (v, i) => i)
            .map(i => displayRow(i));
        return grid;
    }

    function displayRow(i) {
        const row = Array.from({length: row_length}, (v, i) => i)
            .map(j => {
                let index = i*3 + j;
                return <Square
                    value = {squares[index]}
                    updateSquare={() => handleClick(index)} />
            });
        return <div>{row}</div>
    }

    function displayStatus() {
        const winner = calculateWinner(squares);
        let status = winner
            ? winner + " wins!"
            : (xIsNext ? "X" : "O") + " goes next";
        return status
    }
        
    return (<>
        <div>{displayStatus()}</div>
        <div>{displayGrid()}</div>
        </>
    );

}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
    /* Check for the following:
      1. Is squares[first] null? If so, skip this iteration
      2. Do the squares not match value? If so, skip this iteration
      3. If the squares match and have some value, we have a winner - return that value */
    for (let i =0; i < lines.length; i++) {
        const[first, second, third] = lines[i];
        console.log("SQUARES: " + squares);
        console.log(squares[first]);
        if (!squares[first]) {
            continue;
        }
        let squaresDoNotMatch = squares[first] !== squares[second]
            || squares[second] !== squares[third];
        if (squaresDoNotMatch) {
            continue;
        }
        return squares[first];
    }
    /* If we make it through the loop, then there's on winner yet - return null */
    return null;
}
