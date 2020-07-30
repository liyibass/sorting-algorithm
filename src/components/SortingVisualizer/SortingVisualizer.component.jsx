import React, { useState, useEffect } from "react";
import "./SortingVisualizer.style.scss";
import DiagramBar from "../DiagramBar/DiagramBar.component";

import {
  selectionSortAnimations,
  bubbleSortAnimations,
  insertionSortAnimations,
} from "../../sortingAlgorithm/sortingAlgorithm";
import ControllBar from "../ControllBar/ControllBar.component";

function SortingVisualizer() {
  const [Diagram, setDiagram] = useState([]); //拿來顯示的Diagram
  const [resultDiagram, setResultDiagram] = useState([]); //背景顯示結果的Diagram
  const [prompt, setPrompt] = useState({});
  const [timeouts, setTimeouts] = useState([]); // 儲存動畫的setTimeouts id，讓我們可以在reset時可以停止動畫
  const EXECUDE_TIME_INTERVAL = 8; //步驟執行時間

  // 初始創建
  useEffect(() => {
    generateDiagram();
  }, []);

  // ----------------------------Initial Control----------------------------

  const generateDiagram = () => {
    // 計算螢幕寬度以及bar數量，依此建立DiagramArray
    const screenWidth = document.body.clientWidth;
    const barNumber = Math.floor(screenWidth / 10);
    let DiagramArray = [];
    for (let i = 0; i < barNumber; i++) {
      DiagramArray[i] = Math.floor(Math.random() * 100);
    }
    // 更新顯示畫面
    setDiagram(DiagramArray);
    setResultDiagram([]);
  };

  useEffect(() => {
    // 多次sort+re-generate後 bar的style會小概率觸發丟失bug
    // 所以在每一次Diagram更新時 都需要重置bar的style確保數值一致
    const allArrayBars = document.querySelectorAll(".DiagramBar");
    allArrayBars.forEach((bar, index) => {
      // 如果數值不一致，就重新賦予
      if (`${Diagram[index]}%` !== bar.style.height) {
        // console.log(false);
        bar.style.height = `${Diagram[index]}%`;
      } else {
        // console.log(true);
      }

      // 順便重置顏色
      bar.style.backgroundColor = "#4d88e0";
    });
  }, [Diagram]);

  const clearDiagram = () => {
    // 停止所有的setTimeout
    for (var i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
    setTimeouts([]);

    // 關掉prompt
    const showPrompt = document.querySelector(".promptContainer");
    showPrompt.classList.remove("promptContainer-showPrompt");

    setDiagram([]);
    setResultDiagram([]);
    setPrompt({});
    generateDiagram();
  };

  // ----------------------------Algorithm Handler----------------------------
  const selectionSortHandler = () => {
    // 為防止Diagram被更動 硬拷貝Diagram並將結果送去algorithm計算
    const copyDiagram = Diagram.slice();
    const result = selectionSortAnimations(copyDiagram);
    // 顯示背景成果畫面、開啟動畫
    setResultDiagram(result.Array);
    animationHandler(result.animations);
    setPrompt({
      algorithm: "Selection Sort",
      Best: `Best:O(n${String.fromCharCode(178)})`,
      Worst: `Worst:O(n${String.fromCharCode(178)})`,
      Avg: `Avg:O(n${String.fromCharCode(178)})`,
    });
  };

  const bubbleSortHandler = () => {
    const copyDiagram = Diagram.slice();
    const result = bubbleSortAnimations(copyDiagram);
    setResultDiagram(result.Array);
    animationHandler(result.animations);
    setPrompt({
      algorithm: "Bubble Sort",
      Best: `Best:O(n)`,
      Worst: `Worst:O(n${String.fromCharCode(178)})`,
      Avg: `Avg:O(n${String.fromCharCode(178)})`,
    });
  };

  const insertionSortHandler = () => {
    const copyDiagram = Diagram.slice();
    const result = insertionSortAnimations(copyDiagram);
    setResultDiagram(result.Array);
    animationHandler(result.animations);
    setPrompt({
      algorithm: "Insertion Sort",
      Best: `Best:O(n)`,
      Worst: `Worst:O(n${String.fromCharCode(178)})`,
      Avg: `Avg:O(n${String.fromCharCode(178)})`,
    });
  };

  // ----------------------------Animation Handler----------------------------

  function animationHandler(animations) {
    // 取得所有bar element array
    const allArrayBars = document.querySelectorAll(".DiagramBar");

    // 一個個將animation pair上色並交換高度
    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = allArrayBars[barOneIdx].style;
      const barTwoStyle = allArrayBars[barTwoIdx].style;

      // 啟動setTimeout的同時，將setTimeout的id放至timeouts中
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

          // 執行到一半的時候 顯示prompt
          if (i === Math.floor(animations.length / 2)) {
            const showPrompt = document.querySelector(".promptContainer");
            showPrompt.classList.add("promptContainer-showPrompt");
          }
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
      <ControllBar
        clearDiagram={clearDiagram}
        generateDiagram={generateDiagram}
        selectionSortHandler={selectionSortHandler}
        bubbleSortHandler={bubbleSortHandler}
        insertionSortHandler={insertionSortHandler}
      />

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

      <div className="promptContainer ">
        <h1>{prompt.algorithm}</h1>
        <h2>{prompt.Best}</h2>
        <h2>{prompt.Worst}</h2>
        <h2>{prompt.Avg}</h2>
      </div>
    </div>
  );
}

export default React.memo(SortingVisualizer);
