import React from 'react';
import calculateWinner from './calculateWinner';
import Square from './Square';
import isBoardFull from './isBoardFull';
import ComputerPlayer from './ComputerPlayer';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      isComputerTurn: false, // new state variable
      gameMode: 'human-vs-human' // add this line
    };
    this.computerPlayer = new ComputerPlayer();
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
        const computerMove = this.computerPlayer.getMove(squares, 'O');
        squares[computerMove] = 'O';
        this.setState({
          squares: squares,
          xIsNext: true,
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
        <button onClick={() => this.handleNewGameClick()}>New Game</button>
        <button onClick={() => this.handleGameModeClick()}>
          Switch to {this.state.gameMode === "human-vs-human" ? "player-vs-computer" : "human-vs-human"}
        </button>
      </div>
    );
  }
  
  
}

export default Game;