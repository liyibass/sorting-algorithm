import React, { useState, useEffect } from "react";
import "./SortingVisualizer.style.scss";
import DiagramBar from "../DiagramBar/DiagramBar.component";

import {
  selectionSortAnimations,
  bubbleSortAnimations,
  insertionSortAnimations,
  mergeSortAnimations,
} from "../../sortingAlgorithm/sortingAlgorithm";
import ControllBar from "../ControllBar/ControllBar.component";

function SortingVisualizer() {
  const [BarDiagram, setBarDiagram] = useState([]);
  const [resultBarDiagram, setResultBarDiagram] = useState([]);
  const [prompt, setPrompt] = useState({});
  const [timeouts, setTimeouts] = useState([]); // 儲存動畫的setTimeouts id，讓我們可以在reset時可以停止動畫
  const EXECUDE_TIME_INTERVAL = 8; //步驟執行時間

  // 初始創建
  useEffect(() => {
    generateDiagram();
  }, []);

  // ----------------------------Initial Control----------------------------
  // 定義Bar物件
  function Bar(index, value) {
    this.index = index;
    this.value = value;
  }

  const generateDiagram = () => {
    // 計算螢幕寬度以及bar數量，依此建立DiagramArray
    const screenWidth = document.body.clientWidth;
    const barNumber = Math.floor(screenWidth / 10);
    let DiagramArray = [];
    let BarArray = [];
    for (let i = 0; i < barNumber; i++) {
      BarArray[i] = new Bar(i, Math.floor(Math.random() * 100));
      DiagramArray[i] = Math.floor(Math.random() * 100);
    }
    // 更新顯示畫面

    setBarDiagram(BarArray);
    setResultBarDiagram([]);
  };

  useEffect(() => {
    // 多次sort+re-generate後 bar的style會小概率觸發丟失bug
    // 所以在每一次Diagram更新時 都需要重置bar的style確保數值一致
    const allArrayBars = document.querySelectorAll(".DiagramBar");
    allArrayBars.forEach((bar, index) => {
      // 如果數值不一致，就重新賦予
      if (`${BarDiagram[index].value}%` !== bar.style.height) {
        // console.log(false);
        bar.style.height = `${BarDiagram[index].value}%`;
      } else {
        // console.log(true);
      }

      // 順便重置顏色
      bar.style.backgroundColor = "#4d88e0";
    });
  }, [BarDiagram]);

  const clearDiagram = () => {
    // 停止所有的setTimeout
    for (var i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
    setTimeouts([]);

    // 關掉prompt
    const showPrompt = document.querySelector(".promptContainer");
    showPrompt.classList.remove("promptContainer-showPrompt");

    setBarDiagram([]);
    setResultBarDiagram([]);
    setPrompt({});
    generateDiagram();
  };

  // ----------------------------Algorithm Handler----------------------------
  const selectionSortHandler = () => {
    // 為防止Diagram被更動 硬拷貝Diagram並將結果送去algorithm計算
    const copyBarDiagram = BarDiagram.slice();
    const result = selectionSortAnimations(copyBarDiagram);
    // 顯示背景成果畫面、開啟動畫
    setResultBarDiagram(result.Array);
    animationHandler(result.animations);
    setPrompt({
      algorithm: "Selection Sort",
      Best: `Best:O(n${String.fromCharCode(178)})`,
      Worst: `Worst:O(n${String.fromCharCode(178)})`,
      Avg: `Avg:O(n${String.fromCharCode(178)})`,
    });
  };

  const bubbleSortHandler = () => {
    const copyBarDiagram = BarDiagram.slice();
    const result = bubbleSortAnimations(copyBarDiagram);
    setResultBarDiagram(result.Array);
    animationHandler(result.animations);
    setPrompt({
      algorithm: "Bubble Sort",
      Best: `Best:O(n)`,
      Worst: `Worst:O(n${String.fromCharCode(178)})`,
      Avg: `Avg:O(n${String.fromCharCode(178)})`,
    });
  };

  const insertionSortHandler = () => {
    // const copyArr = [];
    // BarDiagram.forEach((bar) => copyArr.push(bar.value));
    const copyBarDiagram = BarDiagram.slice();
    const result = insertionSortAnimations(copyBarDiagram);
    setResultBarDiagram(result.Array);
    animationHandler(result.animations);
    setPrompt({
      algorithm: "Insertion Sort",
      Best: `Best:O(n)`,
      Worst: `Worst:O(n${String.fromCharCode(178)})`,
      Avg: `Avg:O(n${String.fromCharCode(178)})`,
    });
  };

  const mergeSortHandler = () => {
    const copyBarDiagram = BarDiagram.slice();
    const result = mergeSortAnimations(copyBarDiagram);
    setResultBarDiagram(result.Array);
    mergeSortAnimationHandler(result.animations);
    setPrompt({
      algorithm: "Merge Sort",
      Best: `Best:O(n ${String.fromCharCode(0x33d2)} n)`,
      Worst: `Worst:O(n ${String.fromCharCode(0x33d2)} n)`,
      Avg: `Avg:O(n ${String.fromCharCode(0x33d2)} n)`,
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
  function mergeSortAnimationHandler(animations) {
    const allArrayBars = document.querySelectorAll(".DiagramBar");

    for (let i = 0; i < animations.length; i++) {
      // if if else、if if else......循環
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = allArrayBars[barOneIdx].style;
        const barTwoStyle = allArrayBars[barTwoIdx].style;
        // 第一輪：紅色  第二輪：恢復原來顏色
        const color = i % 3 === 0 ? "red" : "#4d88e0";
        timeouts.push(
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;

            // 執行到一半的時候 顯示prompt
            if (i === Math.floor(animations.length * 0.75)) {
              const showPrompt = document.querySelector(".promptContainer");
              showPrompt.classList.add("promptContainer-showPrompt");
            }
          }, i * 10)
        );
        // 第三輪：覆蓋高度
      } else {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = allArrayBars[barOneIdx].style;

        timeouts.push(
          setTimeout(() => {
            barOneStyle.height = `${newHeight.value}%`;
          }, i * 10)
        );
      }
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
        mergeSortHandler={mergeSortHandler}
      />

      <div className="DiagramContainer">
        {BarDiagram.map((bar, index) => {
          return <DiagramBar key={index} value={bar.value} />;
        })}
      </div>

      <div className="DiagramContainer sortResult">
        {resultBarDiagram.map((bar, index) => {
          return <DiagramBar key={index} value={bar.value} />;
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
