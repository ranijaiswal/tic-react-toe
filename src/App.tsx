import React, {useState} from 'react';
import './App.css';

enum Player {
    X,
    O
}

enum Space {
    Empty,
    X,
    O
}
interface GameState {
    currentPlayer: Player;
    board: Space[]
}


function DisplayPlayer(props: {player: Player}) {
    if (props.player === Player.X) {
        return <span> X </span>
    }
    return <span> O </span>
}

function DisplaySpace(props: {board: Space[], row: number, col: number}) {
    const space = props.board[3 * props.row + props.col];
    switch (space) {
        case Space.X:
            return <span> X </span>;
        case Space.O:
            return <span> O </span>;
        default:
            return <span/>;
    }
}


function Board(props: {board: Space[], onClick: (row: number, col: number) => void}) {
    return <table style={{borderCollapse: "collapse"}}>
        <tbody>
        {
            [0, 1, 2].map(row => <tr key={row}>
                {[0, 1, 2].map(col =>
                    <td
                        key={col}
                        style={{width: "30px", height: "30px", borderStyle: "solid", borderWidth:"1px", borderColor:"white"}}
                        onClick={() => props.onClick(row, col)}
                    >
                        <DisplaySpace board={props.board} row={row} col={col}/>
                    </td>)}
                </tr>)
        }
        </tbody>
    </table>}

function togglePlayer(player: Player) {
    if (player === Player.X) {
        return Player.O
    }
    return Player.X
}

function App() {
    const [gameState, setGameState] = useState<GameState>({
        currentPlayer: Player.O,
        board: Array.from({length: 9}).map(() => Space.Empty)
    });
    function spaceClicked(row: number, col: number) {
        const indexClicked = 3 * row + col;
        const newBoard = [...gameState.board];
        if (gameState.currentPlayer === Player.X) {
            newBoard[indexClicked] = Space.X;
        }
        else {
            newBoard[indexClicked] = Space.O;
        }
        setGameState({currentPlayer: togglePlayer(gameState.currentPlayer), board: newBoard})
    }
    return (
        <div className="App">
            <header className="App-header">
                <button onClick={() => setGameState(
                    {currentPlayer: togglePlayer(gameState.currentPlayer), board: gameState.board})}>
                    Toggle Player
                </button>
                <p>
                    Current player is <DisplayPlayer player={gameState.currentPlayer}/>
                </p>
                <Board board={gameState.board} onClick={spaceClicked}/>
            </header>
        </div>
    );
}

export default App;
