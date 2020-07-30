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
export const mergeSortAnimations = (arr) => {
  const animations = [];
  const colorAnimations = [];

  // 合併
  const merge = (leftArray, rightArray) => {
    let result = [];
    let nowIndex = 0,
      leftIndex = 0,
      rightIndex = 0;
    const leftLength = leftArray.length;
    const rightLength = rightArray.length;

    // 如果左右兩邊都沒抓完，就看誰比較小抓誰
    while (leftIndex < leftLength && rightIndex < rightLength) {
      if (leftArray[leftIndex] < rightArray[rightIndex]) {
        result[nowIndex] = leftArray[leftIndex];
        nowIndex++;
        leftIndex++;
      } else {
        result[nowIndex] = rightArray[rightIndex];
        nowIndex++;
        rightIndex++;
      }
    }

    // 跑到這裡代表左右兩邊 至少其中一邊空了
    // 如果是左邊沒抓完，全部抓下來
    while (leftIndex < leftLength) {
      result[nowIndex] = leftArray[leftIndex];
      nowIndex++;
      leftIndex++;
    }

    // 右邊沒抓完，全部抓下來
    while (rightIndex < rightLength) {
      result[nowIndex] = rightArray[rightIndex];
      nowIndex++;
      rightIndex++;
    }

    // 把合併好的一個陣列直接傳回去
    return result;
  };
  const _mergeSort = (arr) => {
    const leftColorArray = [];
    const rightColorArray = [];

    const length = arr.length;
    // 如果這一邊只有一個元素 就原物直接返回
    if (length <= 1) return arr;

    // 切兩半
    const middle = Math.floor(length / 2);
    // 分成左邊、右邊Array
    const leftArray = _mergeSort(arr.slice(0, middle));

    const rightArray = _mergeSort(arr.slice(middle, length));
    for (let i = middle; i < length; i++) {
      rightColorArray.push(i);
    }
    // 兩者合併丟回去
    return merge(leftArray, rightArray);
  };
  // return _mergeSort(arr);

  let Array = _mergeSort(arr);

  return { Array, animations };
};
