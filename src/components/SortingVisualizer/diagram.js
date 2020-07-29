function LinkedList() {
  let Node = function (element) {
    this.element = element;
    this.next = null;
  };

  let length = 0;
  let head = null;

  this.append = function (element) {
    let node = new Node(element);

    //   LinkedList的第一個node
    if (head === null) {
      head = node;

      //   在LinkedList最末端添加新node
    } else {
      let current = head;

      //   找到最後一項node
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }

    length++;
  };
  this.insert = function (position, element) {};

  this.removeAt = function (position) {
    // 檢查position有無越界
    if (position < 0 || position > length || position === undefined)
      return null;

    let current = head, //current:第一個node
      previous,
      index = 0;

    // 若是刪除第一個
    if (position === 0) {
      head = current.next;
    }
    // 若是刪除第二個之後的
    else {
      // 從第一個開始 慢慢更新current 和上一個previous
      // 找到後 將previous改指向目標.next
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }

      previous.next = current.next;
    }
    length--;
    return current.element;
  };

  this.remove = function (element) {};
  this.indexOf = function (element) {};
  this.isEmpty = function () {};
  this.size = function () {};
  this.toString = function () {};
  this.print = function () {
    let current = head;

    while (current) {
      console.log(current.element);
      current = current.next;
    }
  };

  this.returnSingleNode = function (position) {};
}

export default LinkedList;
