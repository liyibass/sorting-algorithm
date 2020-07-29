import React, { useState, useEffect } from "react";
import "./SortingVisualizer.style.scss";
import DiagramBar from "../DiagramBar/DiagramBar.component";

import {
  selectionSortAnimations,
  bubbleSortAnimations,
  insertionSortAnimations,
} from "../../sortingAlgorithm/sortingAlgorithm";

function SortingVisualizer() {
  const [Diagram, setDiagram] = useState([]);
  const [resultDiagram, setResultDiagram] = useState([]);
  const EXECUDE_TIME_INTERVAL = 7;

  useEffect(() => {
    generateDiagram();
  }, []);

  // 儲存動畫的timeouts 在reset時可以停止動畫
  const [timeouts, setTimeouts] = useState([]);
  function animationHandler(animations) {
    // 取得所有bar
    const allArrayBars = document.querySelectorAll(".DiagramBar");
    // 依序將animation pair上色並交換高度

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = allArrayBars[barOneIdx].style;
      const barTwoStyle = allArrayBars[barTwoIdx].style;

      // 啟動setTimeout的同時將id放至timeouts中
      timeouts.push(
        window.setTimeout(() => {
          // 上色
          barOneStyle.backgroundColor = "red";
          barTwoStyle.backgroundColor = "red";
          // 交換高度
          [barOneStyle.height, barTwoStyle.height] = [
            barTwoStyle.height,
            barOneStyle.height,
          ];
        }, i * EXECUDE_TIME_INTERVAL)
      );
      timeouts.push(
        window.setTimeout(() => {
          // 上色過後立即還原顏色
          barOneStyle.backgroundColor = "#4d88e0";
          barTwoStyle.backgroundColor = "#4d88e0";
        }, (i + 1) * EXECUDE_TIME_INTERVAL)
      );
    }
  }

  const selectionSortHandler = () => {
    const copyDiagram = Diagram.slice();
    const result = selectionSortAnimations(copyDiagram);
    setResultDiagram(result.Array);
    animationHandler(result.animations);
  };

  const bubbleSortHandler = () => {
    const copyDiagram = Diagram.slice();
    const result = bubbleSortAnimations(copyDiagram);
    setResultDiagram(result.Array);
    animationHandler(result.animations);
  };

  const insertionSortHandler = () => {
    const copyDiagram = Diagram.slice();
    const result = insertionSortAnimations(copyDiagram);
    setResultDiagram(result.Array);
    animationHandler(result.animations);
  };

  const generateDiagram = () => {
    for (var i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
    //quick reset of the timer array you just cleared
    setTimeouts([]);

    const screenWidth = document.body.clientWidth;
    const barNumber = Math.floor(screenWidth / 8);

    let DiagramArray = [];
    for (let i = 0; i < barNumber; i++) {
      DiagramArray[i] = Math.floor(Math.random() * 100);
    }

    setDiagram(DiagramArray);
    setResultDiagram([]);
  };

  const clearDiagram = () => {
    setDiagram([]);
    setResultDiagram([]);
  };
  console.log("rerender");
  console.log("");
  return (
    <div
      className="SortingVisualizer"
      style={{ height: `${window.innerHeight}px` }}
    >
      <div className="controlBar">
        <button onClick={() => clearDiagram()}>Clear</button>
        <button onClick={() => generateDiagram()}>Generate</button>
        <button onClick={() => selectionSortHandler()}>Selection Sort</button>
        <button onClick={() => bubbleSortHandler()}>Bubble Sort</button>
        <button onClick={() => insertionSortHandler()}>insertion Sort</button>
      </div>
      <div className="DiagramContainer">
        {Diagram.map((bar, index) => {
          return <DiagramBar key={index} value={bar} />;
        })}
      </div>

      <div className="DiagramContainer sortResult">
        {resultDiagram.map((bar, index) => {
          return <DiagramBar key={index} value={bar} />;
        })}
      </div>
    </div>
  );
}

export default SortingVisualizer;
