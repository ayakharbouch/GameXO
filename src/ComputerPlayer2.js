import React from 'react';
import calculateWinner from './calculateWinner';
import isBoardFull from './isBoardFull';
class ComputerPlayer2 extends React.Component {
    getMove(squares, player, difficulty) {
      const emptySquares = squares.reduce((acc, value, index) => {
        if (value === null) {
          acc.push(index);
        }
        return acc;
      }, []);
  
      let randomIndex;
      console.log(difficulty);
      if (difficulty === 'easy') {
        randomIndex = Math.floor(Math.random() * emptySquares.length);
      } else if (difficulty === 'medium') {
      const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    const columns = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
    const diagonals = [[0, 4, 8], [2, 4, 6]];
    const possibleWins = rows.concat(columns, diagonals);
    
    for (let i = 0; i < possibleWins.length; i++) {
      const [a, b, c] = possibleWins[i];
      if (squares[a] === 'O' && squares[a] === squares[b] && squares[c] === null) {
        return c;
      } else if (squares[b] === 'O' && squares[b] === squares[c] && squares[a] === null) {
        return a;
      } else if (squares[c] === 'O' && squares[c] === squares[a] && squares[b] === null) {
        return b;
      } else if (squares[a] === 'X' && squares[a] === squares[b] && squares[c] === null) {
        return c;
      } else if (squares[b] === 'X' && squares[b] === squares[c] && squares[a] === null) {
        return a;
      } else if (squares[c] === 'X' && squares[c] === squares[a] && squares[b] === null) {
        return b;
      }
    }

    const emptySquares = squares.reduce((acc, value, index) => {
      if (value === null) {
        acc.push(index);
      }
      return acc;
    }, []);
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
      } else if (difficulty === 'hard') {
const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
        const columns = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
        const diagonals = [[0, 4, 8], [2, 4, 6]];
        const possibleWins = rows.concat(columns, diagonals);
      
        // Check if the computer can win in the next move
        for (let i = 0; i < possibleWins.length; i++) {
          const [a, b, c] = possibleWins[i];
          if (squares[a] === player && squares[a] === squares[b] && squares[c] === null) {
            return c;
          } else if (squares[b] === player && squares[b] === squares[c] && squares[a] === null) {
            return a;
          } else if (squares[c] === player && squares[c] === squares[a] && squares[b] === null) {
            return b;
          }
        }
      
        // Check if the opponent can win in the next move and block it
        const opponent = player === 'X' ? 'O' : 'X';
        for (let i = 0; i < possibleWins.length; i++) {
          const [a, b, c] = possibleWins[i];
          if (squares[a] === opponent && squares[a] === squares[b] && squares[c] === null) {
            return c;
          } else if (squares[b] === opponent && squares[b] === squares[c] && squares[a] === null) {
            return a;
          } else if (squares[c] === opponent && squares[c] === squares[a] && squares[b] === null) {
            return b;
          }
        }
      
        // Play in the center if available
        if (squares[4] === null) {
          return 4;
        }
      
        // Play in a corner if available
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter((corner) => squares[corner] === null);
        if (availableCorners.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableCorners.length);
          return availableCorners[randomIndex];
        }
      
        // Play in a random available square
        const emptySquares = squares.reduce((acc, value, index) => {
          if (value === null) {
            acc.push(index);
          }
          return acc;
        }, []);
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        return emptySquares[randomIndex];      }
  
      return emptySquares[randomIndex];
    }
  
     getOptimalMove(squares, player) {
        const maxPlayer = player;
        const minPlayer = player === 'X' ? 'O' : 'X';
      
        // check if the game is over
        if (calculateWinner(squares)) {
          return null;
        } else if (isBoardFull(squares)) {
          return null;
        }
      
        // define a function to evaluate the score of a given move
        function evaluateMove(move, squares, player) {
          const newSquares = squares.slice();
          newSquares[move] = player;
          if (calculateWinner(newSquares)) {
            return player === maxPlayer ? 1 : -1;
          } else if (isBoardFull(newSquares)) {
            return 0;
          } else {
            const scores = [];
            const emptySquares = newSquares.reduce((acc, value, index) => {
              if (value === null) {
                acc.push(index);
              }
              return acc;
            }, []);
            emptySquares.forEach((emptySquare) => {
              scores.push(evaluateMove(emptySquare, newSquares, player === maxPlayer ? minPlayer : maxPlayer));
            });
            if (player === maxPlayer) {
              return Math.max(...scores);
            } else {
              return Math.min(...scores);
            }
          }
        }
      
        // loop through all empty squares and evaluate the score of each move
        const emptySquares = squares.reduce((acc, value, index) => {
          if (value === null) {
            acc.push(index);
          }
          return acc;
        }, []);
        const scores = emptySquares.map((emptySquare) => {
          return evaluateMove(emptySquare, squares, maxPlayer);
        });
      
        // find the index of the move with the highest score
        const maxScore = Math.max(...scores);
        const bestMoves = emptySquares.filter((emptySquare, index) => {
          return scores[index] === maxScore;
        });
        const randomIndex = Math.floor(Math.random() * bestMoves.length);
        return bestMoves[randomIndex];
      }
      
       getMoveExpert(squares, player) {
        const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
        const columns = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
        const diagonals = [[0, 4, 8], [2, 4, 6]];
        const possibleWins = rows.concat(columns, diagonals);
      
        // Check if the computer can win in the next move
        for (let i = 0; i < possibleWins.length; i++) {
          const [a, b, c] = possibleWins[i];
          if (squares[a] === player && squares[a] === squares[b] && squares[c] === null) {
            return c;
          } else if (squares[b] === player && squares[b] === squares[c] && squares[a] === null) {
            return a;
          } else if (squares[c] === player && squares[c] === squares[a] && squares[b] === null) {
            return b;
          }
        }
      
        // Check if the opponent can win in the next move and block it
        const opponent = player === 'X' ? 'O' : 'X';
        for (let i = 0; i < possibleWins.length; i++) {
          const [a, b, c] = possibleWins[i];
          if (squares[a] === opponent && squares[a] === squares[b] && squares[c] === null) {
            return c;
          } else if (squares[b] === opponent && squares[b] === squares[c] && squares[a] === null) {
            return a;
          } else if (squares[c] === opponent && squares[c] === squares[a] && squares[b] === null) {
            return b;
          }
        }
      
        // Play in the center if available
        if (squares[4] === null) {
          return 4;
        }
      
        // Play in a corner if available
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter((corner) => squares[corner] === null);
        if (availableCorners.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableCorners.length);
          return availableCorners[randomIndex];
        }
      
        // Play in a random available square
        const emptySquares = squares.reduce((acc, value, index) => {
          if (value === null) {
            acc.push(index);
          }
          return acc;
        }, []);
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        return emptySquares[randomIndex];
      }
      
    render() {
      return <div></div>;
    }
  }
  
export default ComputerPlayer2;