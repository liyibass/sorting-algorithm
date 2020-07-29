import React, { useState, useEffect } from "react";
import "./SortingVisualizer.style.scss";
import DiagramBar from "../DiagramBar/DiagramBar.component";

import { selectionSortAnimations } from "../../sortingAlgorithm/sortingAlgorithm";

function SortingVisualizer() {
  const [Diagram, setDiagram] = useState([]);

  const resetDiagram = () => {
    const screenWidth = document.body.clientWidth;
    const barNumber = Math.floor(screenWidth / 8);

    let DiagramArray = [];
    for (let i = 0; i < barNumber; i++) {
      DiagramArray[i] = Math.floor(Math.random() * 100);
    }

    setDiagram(DiagramArray);
  };

  useEffect(() => {
    resetDiagram();
  }, []);

  const selectionSortHandler = () => {
    const animations = selectionSortAnimations(Diagram);
    const allArrayBars = document.getElementsByClassName("DiagramBar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = allArrayBars[barOneIdx].style;
      const barTwoStyle = allArrayBars[barTwoIdx].style;
      setTimeout(() => {
        // 上色
        barOneStyle.backgroundColor = "red";
        barTwoStyle.backgroundColor = "red";
        // 交換高度
        const temp = barTwoStyle.height;
        barTwoStyle.height = barOneStyle.height;
        barOneStyle.height = temp;
      }, i * 10);

      setTimeout(() => {
        barOneStyle.backgroundColor = "#4d88e0";
        barTwoStyle.backgroundColor = "#4d88e0";
      }, (i + 1) * 10);
    }
  };
  const swapTwoBars = (animationPairIndex, allArrayBars) => {
    const [barOneIdx, barTwoIdx] = animationPairIndex;
    const barOneStyle = allArrayBars[barOneIdx].style;
    const barTwoStyle = allArrayBars[barTwoIdx].style;
  };

  return (
    <div className="SortingVisualizer">
      <div className="controlBar">
        <button onClick={() => resetDiagram()}>Reset</button>
        <button onClick={() => selectionSortHandler()}>Selection Sort</button>
      </div>
      <div className="DiagramContainer">
        {Diagram.map((bar, index) => {
          return <DiagramBar key={index} value={bar} />;
        })}
      </div>
    </div>
  );
}

export default SortingVisualizer;
