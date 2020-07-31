// ----------------------------Merge Sort----------------------------
export const mergeSortAnimations = (Array) => {
  if (Array.length <= 1) return Array;
  const animations = [];
  const auxiliaryArray = Array.slice();
  sortBeforeMerge(Array, auxiliaryArray, 0, Array.length - 1);

  // 切割
  function sortBeforeMerge(mainArray, auxiliaryArray, startIndex, endIndex) {
    if (startIndex === endIndex) return;

    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    sortBeforeMerge(auxiliaryArray, mainArray, startIndex, middleIndex);
    sortBeforeMerge(auxiliaryArray, mainArray, middleIndex + 1, endIndex);
    mergePair(mainArray, auxiliaryArray, startIndex, middleIndex, endIndex);
  }

  // 合併
  function mergePair(
    mainArray,
    auxiliaryArray,
    startIndex, //0
    middleIndex, //0
    endIndex //1
  ) {
    let k = startIndex; //0
    let i = startIndex; //0
    let j = middleIndex + 1; //1

    //-------兩兩比較排序後合併，每次比較都是取當時陣列中的第一個元素進行比較-------
    // 右兩邊都沒抓完，此時比較兩邊
    while (i <= middleIndex && j <= endIndex) {
      animations.push([i, j]);
      animations.push([i, j]);
      // 看此id對應的Bar，兩者誰的value比較小，將小的Bar放進主Array左側
      if (auxiliaryArray[i].value <= auxiliaryArray[j].value) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    // 此時代表左側還有東西 但右側空了
    // 將左側東西一一放進主Array左側
    while (i <= middleIndex) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }

    // 此時代表右側還有東西 但左側空了
    // 將右側東西一一放進主Array左側
    while (j <= endIndex) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  return { Array, animations };
};
