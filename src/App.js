import { useState } from "react";
import { minimax } from "./minimax";
import { calculateWinner } from "./calculateWinner";

// Squareコンポーネント
function Square({value, onSquareClick, highlight}){
  return <button className={`square ${highlight ? "highlight" : ""}`} onClick={onSquareClick}>{value}</button>
}

// Boardコンポーネント
function Board({xIsNext, squares, onPlay, ai}) {
  
  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const winningLine = result ? result.line : "";
  let status;

  function handleClick(i){
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = "O";

    onPlay(nextSquares);
    if (!nextSquares.includes(null)) return;
    ai(nextSquares);
  }

  if (winner) status = "勝者は " + winner + "です!";
  else if (!squares.includes(null)) status = "引き分けです!";
  else status = "あなたの番です!";

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} highlight={winningLine.includes(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} highlight={winningLine.includes(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} highlight={winningLine.includes(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} highlight={winningLine.includes(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} highlight={winningLine.includes(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} highlight={winningLine.includes(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} highlight={winningLine.includes(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} highlight={winningLine.includes(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} highlight={winningLine.includes(8)} />
      </div>
    </>
  )  
}

// Gameコンポーネント
export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function AIMove(squares){
    let xMove = minimax(squares, 0, true);
    const xSquares = squares.slice();
    xSquares[xMove] = "X";
    handlePlay(xSquares);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) description = move + "手目に戻る";
    else description = "最初に戻る";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} ai={AIMove} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
