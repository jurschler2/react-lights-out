import React from "react";
import "./Cell.css";

/** A single cell on the board that is used in the Board component.
 *
 * This has no state --- just three props:
 * 
 * - coords: which are the y-x coordinates of the cell in the matrix
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ coord, flipCellsAroundMe, isLit }) {
  const litClass = `${isLit ? "Cell-lit" : ""}`;
  const handleFlip = () => flipCellsAroundMe(coord);
  return <td className={`Cell ${litClass}`} onClick={handleFlip} role="button" />;
}

export default Cell;
