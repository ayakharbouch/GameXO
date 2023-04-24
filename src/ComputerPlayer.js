import React from 'react';

class ComputerPlayer extends React.Component {
  getMove(squares) {
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

export default ComputerPlayer;