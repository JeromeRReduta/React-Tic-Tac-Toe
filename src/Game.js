import Grid from "./Grid"
import { useState } from "react";

/* Represents the tic-tac-toe game. This includes the grid, info from the gamestate, and "time travel" functionality,
allowing players to replay the game starting from a previous move */
export default function Game() {
    /* Game state tracks:
        History - What the grid looked like, from initial state (empty) to current. Note that if we "time travel" to some previous move
            and play a new move, we will overwrite history, and the original timeline will no longer be tracked by the game state
        CurrentMove - basically what turn it is
        CurrentSquares - the current state of the grid
        XIsNext - whether X is next */
    const [gameState, setGameState] = useState({
        history: [Array(9).fill(null)],
        currentMove: 0,
    });
    gameState.currentSquares = gameState.history[gameState.currentMove];
    gameState.xIsNext = gameState.currentMove % 2 === 0

    /* When someone makes a move, edit gamestate to reflect the new history and current move/turn number */
    function handlePlay(nextSquares) {
        const nextHistory = [...gameState.history.slice(0, gameState.currentMove + 1), nextSquares];
        setGameState({
            ...gameState,
            history: nextHistory,
            currentMove: nextHistory.length - 1
        });
    }

    /* When someone wants to "time travel" to move n, updates the gamestate's current move/turn number to n */
    function jumpTo(move) {
        return setGameState(
            {
                ...gameState,
                currentMove: move
            }
        );
    }

    /* Lists buttons allowing the user to "time travel" to previous moves */
    function listMoves() {
        const moves = gameState.history.map((squares, move) => {
            return (
                <li key={move}>
                    <button onClick = {() => jumpTo(move)}>{"Jump to move " + move}</button>
                </li>
            )
        });
        return moves;
    }

    return (
        <div className="game">
            <div className="game-board">
                <Grid
                    column_length = {3}
                    row_length = {3}
                    xIsNext= {gameState.xIsNext}
                    squares = {gameState.currentSquares}
                    onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{listMoves()}</ol>
            </div>
        </div>
    );
}