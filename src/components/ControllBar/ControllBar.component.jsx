import React, { useState } from "react";
import "./ControllBar.style.scss";

function ControllBar({
  clearDiagram,
  generateDiagram,
  selectionSortHandler,
  bubbleSortHandler,
  insertionSortHandler,
}) {
  const [ctrlBarState, setCtrlBarState] = useState(1); //0:generate 1:algorithm、generate 2:clear

  switch (ctrlBarState) {
    case 0:
      return (
        <div className="ControllBar">
          <button
            onClick={() => {
              setCtrlBarState(1);
              generateDiagram();
            }}
          >
            Generate
          </button>
        </div>
      );
    case 1:
      return (
        <div className="ControllBar">
          <button onClick={() => generateDiagram()}>Re-Generate</button>
          <button
            onClick={() => {
              setCtrlBarState(2);
              selectionSortHandler();
            }}
          >
            Selection Sort
          </button>
          <button
            onClick={() => {
              setCtrlBarState(2);
              bubbleSortHandler();
            }}
          >
            Bubble Sort
          </button>
          <button
            onClick={() => {
              setCtrlBarState(2);
              insertionSortHandler();
            }}
          >
            insertion Sort
          </button>
        </div>
      );
    case 2:
      return (
        <div className="ControllBar">
          <button
            onClick={() => {
              setCtrlBarState(1);
              clearDiagram();
            }}
          >
            Clear
          </button>
        </div>
      );
    default:
      return null;
  }
}

export default React.memo(ControllBar);
