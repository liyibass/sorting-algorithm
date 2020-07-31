// ----------------------------Selection Sort----------------------------
export const selectionSortAnimations = (Array) => {
  const animations = [];

  for (let i = 0; i < Array.length; i++) {
    // 先假設第一個是最小值
    let min = Array[i];
    let minIndex = i;

    // 從第二個開始比對
    // 如果遇到更小的目標 就把目標丟到min中 並記下他的index
    for (let j = i; j < Array.length; j++) {
      if (Array[j].value < min.value) {
        min = Array[j];
        minIndex = j;
        animations.push([minIndex, minIndex]);
      } else {
        animations.push([j, j]);
      }
    }
    // 第一輪比對完後 將min跟Array首項交換數值
    [Array[i], Array[minIndex]] = [Array[minIndex], Array[i]];
    animations.push([i, minIndex]);
  }

  return { Array, animations };
};
// ----------------------------Bubble Sort----------------------------
export const bubbleSortAnimations = (Array) => {
  const animations = [];

  // 總數Array.length 一共跑Array.length輪
  for (let i = 0; i < Array.length; i++) {
    // 每一輪會兩兩比對總數-1次（總數減1）
    // 每一輪又會比上一輪少比一次（總數減去i）
    for (let j = 0; j < Array.length - i - 1; j++) {
      if (Array[j].value > Array[j + 1].value) {
        [Array[j], Array[j + 1]] = [Array[j + 1], Array[j]];
        animations.push([j, j + 1]);
      }
    }
  }

  return { Array, animations };
};
// ----------------------------Insertion Sort----------------------------
export const insertionSortAnimations = (Array) => {
  const animations = [];

  // 首項i=0已排序好 i從1開始
  for (let i = 1; i < Array.length; i++) {
    // 被檢查項目的位置以及數值先存起來
    let position = i;
    let checkBar = Array[i];

    // 若前一項的大小比自己大 則交換兩者位置(position一定要大於0)
    while (position > 0 && Array[position - 1].value > checkBar.value) {
      [Array[position], Array[position - 1]] = [
        Array[position - 1],
        Array[position],
      ];
      animations.push([position, position - 1]);
      // positon若減成0 代表已經到最頭，不需要再比下去
      position--;
    }

    Array[position] = checkBar;
  }

  return { Array, animations };
};

// ----------------------------Merge Sort----------------------------
export const mergeSortAnimations = (Array) => {
  if (Array.length <= 1) return Array;
  const animations = [];
  const auxiliaryArray = Array.slice();
  seperateArray(Array, 0, Array.length - 1, auxiliaryArray);

  // 切割
  function seperateArray(mainArray, startIndex, endIndex, auxiliaryArray) {
    if (startIndex === endIndex) return;

    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    seperateArray(auxiliaryArray, startIndex, middleIndex, mainArray);
    seperateArray(auxiliaryArray, middleIndex + 1, endIndex, mainArray);
    doMerge(mainArray, startIndex, middleIndex, endIndex, auxiliaryArray);
  }

  // 合併
  function doMerge(
    mainArray,
    startIndex,
    middleIndex,
    endIndex,
    auxiliaryArray
  ) {
    let k = startIndex; //0
    let i = startIndex;
    let j = middleIndex + 1;
    while (i <= middleIndex && j <= endIndex) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i].value <= auxiliaryArray[j].value) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIndex) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIndex) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  return { Array, animations };
};
