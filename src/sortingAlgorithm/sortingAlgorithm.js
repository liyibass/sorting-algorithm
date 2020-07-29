export const selectionSortAnimations = (Array) => {
  const animations = [];

  for (let i = 0; i < Array.length; i++) {
    // 先假設第一個是最小值
    let min = Array[i];
    let minIndex = i;

    // 從第二個開始比對
    // 如果遇到更小的目標 就把目標丟到min中 並記下他的index
    for (let j = i + 1; j < Array.length; j++) {
      if (Array[j] < min) {
        min = Array[j];
        minIndex = j;
      }
    }
    // 第一輪比對完後 將min跟Array首項交換數值
    [Array[i], Array[minIndex]] = [Array[minIndex], Array[i]];
    animations.push([i, minIndex]);
  }
  return animations;
};

export const bubbleSortAnimations = (Array) => {
  const animations = [];

  // 總數Array.length 一共跑Array.length輪
  for (let i = 0; i < Array.length; i++) {
    // 每一輪會兩兩比對總數-1次（總數減1）
    // 每一輪又會比上一輪少比一次（總數減去i）
    for (let j = 0; j < Array.length - i - 1; j++) {
      if (Array[j] > Array[j + 1]) {
        [Array[j], Array[j + 1]] = [Array[j + 1], Array[j]];
        animations.push([j, j + 1]);
      }
    }
  }

  return animations;
};
