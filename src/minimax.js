import { calculateWinner } from "./calculateWinner";

const scores = {
    "X" : 10,
    "O" : -10,
    "tie" : 0
  }

export function minimax(board, depth, alpha, beta, isMaximizing){
  let haveWinner = calculateWinner(board);
  if (haveWinner) return scores[haveWinner.winner];
  else if (!board.includes(null)) return scores["tie"];

  let bestMove = null;
  let bestScore = isMaximizing ? -Infinity : Infinity;

  if (isMaximizing){
    for (let i = 0; i < board.length; i++){
      if (board[i] === null){
        board[i] = "X";
        let score = minimax(board, depth + 1, alpha, beta, false);
        board[i] = null;
        if (score > bestScore){
          bestScore = score;
          if (depth === 0) bestMove = i;
        }

        alpha = Math.max(score, alpha);
        if (beta <= alpha) break;
      }
    }
    if (depth === 0 && bestMove !== null) return bestMove;

  } else {
    for (let i = 0; i < board.length; i++){
      if (board[i] == null){
        board[i] = "O";
        let score = minimax(board, depth + 1, alpha, beta, true);
        board[i] = null;
        if (score < bestScore) bestScore = score;
        
        beta = Math.min(score, beta);
        if (beta <= alpha) break;
      }
    }
  }

  return bestScore;
}