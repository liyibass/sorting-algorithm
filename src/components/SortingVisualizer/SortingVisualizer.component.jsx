import React, { useState, useEffect } from "react";
import "./SortingVisualizer.style.scss";
import DiagramBar from "../DiagramBar/DiagramBar.component";

import {
  selectionSortAnimations,
  bubbleSortAnimations,
  insertionSortAnimations,
} from "../../sortingAlgorithm/sortingAlgorithm";

function SortingVisualizer() {
  const [Diagram, setDiagram] = useState([]); //拿來顯示的Diagram
  const [resultDiagram, setResultDiagram] = useState([]); //背景顯示結果的Diagram
  const EXECUDE_TIME_INTERVAL = 10; //步驟執行時間
  const [timeouts, setTimeouts] = useState([]); // 儲存動畫的timeouts id，讓我們可以在reset時可以停止動畫

  // 初始創建
  useEffect(() => {
    generateDiagram();
  }, []);

  // ----------------------------Initial Control----------------------------

  const generateDiagram = () => {
    // 停止所有的setTimeout
    for (var i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
    setTimeouts([]);

    // 計算螢幕寬度以及bar數量，依此建立DiagramArray
    const screenWidth = document.body.clientWidth;
    const barNumber = Math.floor(screenWidth / 8);
    let DiagramArray = [];
    for (let i = 0; i < barNumber; i++) {
      DiagramArray[i] = Math.floor(Math.random() * 100);
    }

    // 更新顯示畫面
    setDiagram(DiagramArray);
    setResultDiagram([]);
  };

  const clearDiagram = () => {
    setDiagram([]);
    setResultDiagram([]);
  };

  // ----------------------------Algorithm Handler----------------------------
  const selectionSortHandler = () => {
    // 為防止Diagram被更動 硬拷貝Diagram並將結果送去algorithm計算
    const copyDiagram = Diagram.slice();
    const result = selectionSortAnimations(copyDiagram);
    // 顯示背景成果畫面、開啟動畫
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

  // ----------------------------Animation Handler----------------------------

  function animationHandler(animations) {
    // 取得所有bar
    const allArrayBars = document.querySelectorAll(".DiagramBar");

    // 依序將animation pair上色並交換高度
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = allArrayBars[barOneIdx].style;
      const barTwoStyle = allArrayBars[barTwoIdx].style;

      // 啟動setTimeout的同時將setTimeout的id放至timeouts中
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
