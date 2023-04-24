import React from 'react';
import calculateWinner from './calculateWinner';
import Square from './Square';
import isBoardFull from './isBoardFull';
import ComputerPlayer from './ComputerPlayer2';
import './App.css';

class Game2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
          xIsNext: true,
          isComputerTurn: false,
          gameMode: 'human-vs-human',
          difficulty: 'easy', // add this line
        };
        this.computerPlayer = new ComputerPlayer();
      }

      handleDifficultyClick(difficulty) {
        this.setState({
          difficulty,
        });
        this.handleNewGameClick();
      }
    
      handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        if (!isBoardFull(squares) && this.state.gameMode === "human-vs-human") {
          squares[i] = this.state.xIsNext ? "X" : "O";
          this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
          });
        }
        if (!isBoardFull(squares) && this.state.gameMode === "player-vs-computer") {
          squares[i] = "X";
          this.setState({
            squares: squares,
          });
          setTimeout(() => {
            const computerMove = this.computerPlayer.getMove(squares, 'O', this.state.difficulty);
            squares[computerMove] = 'O';
            this.setState({
              squares: squares,
              xIsNext: true,
              isComputerTurn: false,
            });
          }, 500);
        }
      }
      
  
  
  handleNewGameClick() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      isComputerTurn: false, // set isComputerTurn to false
    });
  }

  componentDidUpdate() {
    if (this.state.gameMode === "player-vs-computer" && !this.state.xIsNext && this.state.isComputerTurn) {
      const squares = this.state.squares.slice();
      const computerMove = this.computerPlayer.getMove(squares, 'O');
      squares[computerMove] = 'O';
      this.setState({
        squares: squares,
        xIsNext: true,
        isComputerTurn: false,
      });
    }
  }
  
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        key={i}
      />
    );
  }

  handleGameModeClick() {
    this.setState({
      gameMode: this.state.gameMode === "human-vs-human" ? "player-vs-computer" : "human-vs-human"
    });
    this.handleNewGameClick();
  }
  render() {
    const winner = calculateWinner(this.state.squares);
    let gameStatus;
    if (winner) {
      gameStatus = "Winner: " + winner;
    } else if (isBoardFull(this.state.squares)) {
      gameStatus = "Draw";
    } else if (this.state.gameMode === "player-vs-computer" && !this.state.xIsNext) {
      gameStatus = "Computer is playing...";
    } else {
      gameStatus = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
  
    return (
      <div>
       <div className="board">
  <div className="game-status">{gameStatus}</div>
  <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
</div>

<div className="button-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <button className="new-game-button" onClick={() => this.handleNewGameClick()}>New Game</button>
  <button className="game-mode-button" onClick={() => this.handleGameModeClick()}>
    {this.state.gameMode === "human-vs-human" ? "Switch to Player vs. Computer" : "Switch to Human vs. Human"}
  </button>
</div>

        {this.state.gameMode === "player-vs-computer" && this.state.xIsNext && (
         <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem"}}>
         <button 
           style={{backgroundColor: "lightgreen", border: "none", borderRadius: "5px", padding: "0.5rem 1rem"}}
           onClick={() => this.handleDifficultyClick('easy')}
         >
           Easy
         </button>
         <button 
           style={{backgroundColor: "yellow", border: "none", borderRadius: "5px", padding: "0.5rem 1rem"}}
           onClick={() => this.handleDifficultyClick('medium')}
         >
           Medium
         </button>
         <button 
           style={{backgroundColor: "red", border: "none", borderRadius: "5px", padding: "0.5rem 1rem"}}
           onClick={() => this.handleDifficultyClick('hard')}
         >
           Hard
         </button>
       </div>
       
        )}
      </div>
    );
  }
  
  
}

export default Game2;