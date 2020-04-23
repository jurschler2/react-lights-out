import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out that uses the Cell component and is used by the App component.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    nrows = 3;
 *    ncols = 4;
 *    This would be: [[f, f, f, f], 
 *                    [t, t, f, t], 
 *                    [f, f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = .22 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      initialBoard.push([]);
      for (let j = 0; j < ncols; j++) {
        let val = Math.random() >= chanceLightStartsOn ? false : true;
        initialBoard[i].push(val);
      }
    }
    return initialBoard;
  }

  function hasWon() {
    // check the board in state to determine whether the player has won.
    // To refactor with every
    for (let i = 0; i < nrows; i++) {
      for (let j = 0; j < ncols; j++) {
        if (board[i][j] === true) {
          return false;
        }
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      const deepBoardCopy = [...oldBoard];
      for (let idx = 0; idx < deepBoardCopy.length; idx++) {
        deepBoardCopy[idx] = [...oldBoard[idx]];
      }

      // in the copy, flip this cell and the cells around it
      let flipChecks = [[y, x],[y+1, x],[y, x+1],
                        [y-1, x],[y, x-1]];
      flipChecks.map(([y,x])=> flipCell(y, x, deepBoardCopy));
      
      // return the copy
      return deepBoardCopy;


    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
      <div>
        You won!
      </div>
    );
  }
  
  // make table board
    let htmlBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell key={coord} coord={coord} isLit={board[y][x]} flipCellsAroundMe={flipCellsAround} />
          );
        }
        htmlBoard.push(<tr key={y}>{row}</tr>);
      }
      
    // To rewrite the htmlBoard construction with maps
    // let html2 = board.map((row, i)=> <tr>{row.map(etc)}</tr>)
      
      return (
        <table className="board">
          <tbody>{htmlBoard}</tbody>
       </table>
      );
      
  }

export default Board;
