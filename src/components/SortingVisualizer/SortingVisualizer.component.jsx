import React, { useState, useEffect } from "react";
import "./SortingVisualizer.style.scss";
import DiagramBar from "../DiagramBar/DiagramBar.component";

import {
  selectionSortAnimations,
  bubbleSortAnimations,
} from "../../sortingAlgorithm/sortingAlgorithm";

function SortingVisualizer() {
  const [Diagram, setDiagram] = useState([]);

  useEffect(() => {
    resetDiagram();
  }, []);

  const resetDiagram = () => {
    const screenWidth = document.body.clientWidth;
    const barNumber = Math.floor(screenWidth / 8);

    let DiagramArray = [];
    for (let i = 0; i < barNumber; i++) {
      DiagramArray[i] = Math.floor(Math.random() * 100);
    }

    setDiagram(DiagramArray);
  };

  const animationHandler = (animations) => {
    // 取得所有bar
    const allArrayBars = document.getElementsByClassName("DiagramBar");

    // 依序將animation pair上色並交換高度
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
        // 上色過後立即還原顏色
        barOneStyle.backgroundColor = "#4d88e0";
        barTwoStyle.backgroundColor = "#4d88e0";
      }, (i + 1) * 10);
    }
  };

  const selectionSortHandler = () => {
    const animations = selectionSortAnimations(Diagram);
    animationHandler(animations);
  };

  const bubbleSortHandler = () => {
    const animations = bubbleSortAnimations(Diagram);
    animationHandler(animations);
  };

  return (
    <div className="SortingVisualizer">
      <div className="controlBar">
        <button onClick={() => resetDiagram()}>Reset</button>
        <button onClick={() => selectionSortHandler()}>Selection Sort</button>
        <button onClick={() => bubbleSortHandler()}>Bubble Sort</button>
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
