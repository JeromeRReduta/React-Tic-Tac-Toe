import Square from "./Square";
import { useState } from "react";

/* Component representing a 3x3 tic-tac-toe grid */
export default function Grid( {
    column_length,
    row_length,
    xIsNext,
    squares,
    onPlay} ) {
    const [winner, setWinner] = useState("");

    /* Function for handling a click on a square. If the square is filled or a winner exists,
        this function returns early. Otherwise, it edits a copy of the grid to add a new X or O
        and calls onPlay on that copy */
    function handleClick(i) {
        setWinner(calculateWinner(squares));
        if (squares[i]) {
            return;
        }
        if (winner) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        onPlay(nextSquares);
      }

    /* displays the grid */
    function displayGrid() {
        return Array
            .from({length: column_length}, (v, i) => i)
            .map(i => displayRow(i));
    }

    /* displays a single row in the grid */
    function displayRow(i) {
        const row = Array
            .from({length: row_length}, (v, i) => i)
            .map(j => {
                let index = i*3 + j;
                return <Square
                    value = {squares[index]}
                    updateSquare={() => handleClick(index)} />
            });
        return <div>{row}</div>
    }

    /* displays a status message for the user */
    function displayStatus() {
        const winner = calculateWinner(squares);
        const nextPlayer = xIsNext ? "X" : "O";
        return winner
            ? winner + " wins!"
            : nextPlayer + " goes next";
    }

    return (
        <>
            <div>{displayStatus()}</div>
            <div>{displayGrid()}</div>
        </>
    );
}

/* Given a grid state, calculates the winner - X, O, or null (no winner yet) */
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
