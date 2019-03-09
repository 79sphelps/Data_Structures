"use strict";

/*
Functions:

bubbleSort
selectionSort
insertionSort / sortedInsert
quickSort / quickSortRecur / getTail
mergeSort / mergeSortRecur / merging

insertInOrder
insertAtEnd
insertAt

searchNonRecurs
searchRecursWrapper / searchRecurs

removeFrom
removeElement

segregateEvenOdd
moveLastNodeToFront
pairWiseSwap
swapNodes
removeDuplicatesFromSorted
removeDuplicatesFromUnsorted
reverseList
indexOf
isEmpty
size_of_list
getListLengthNonRecurs
getListLengthRecursWrapper / getListLengthRecurs
printList
printMiddleElement
removeDuplicates
destroyList
findNthFromLast
detectLoopUsingSet
detectLoopUsingPtrs
countNodes / countNodesInLoop

*/

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor(list) {
    this.head = list || null;
    this.size = 0;
  }

  bubbleSort(direction) {
    if (this.head === null) {
      console.log("List is empty.");
      return;
    }

    for (let curr = this.head; curr != null; curr = curr.next) {
      for (let save = curr.next; save != null; save = save.next) {
        if (direction == "asc") {
          if (curr.element > save.element) {
            let tmp = save.element;
            save.element = curr.element;
            curr.element = tmp;
          }
        } else if (direction == "dec") {
          if (curr.element < save.element) {
            let tmp = curr.element;
            curr.element = save.element;
            save.element = tmp;
          }
        }
      }
    }
  }

  selectionSort(direction) {
    let tmp;
    let min;
    if (!this.head) {
      console.log("List is empty.");
      return;
    }
    for (let curr = this.head; curr != null; curr = curr.next) {
      min = curr;
      for (let curr2 = min.next; curr2 != null; curr2 = curr2.next) {
        if (direction == "asc") {
          if (curr2.element < min.element) {
            min = curr2;
          }
        } else if (direction == "dec") {
          if (curr2.element > min.element) {
            min = curr2;
          }
        }
      }

      tmp = min.element;
      min.element = curr.element;
      curr.element = tmp;
    }
  }

  //----------------------------------------------------
  // Insertion Sort

  insertionSort() {
    let sorted = new LinkedList();
    let curr = this.head;

    while (curr != null) {
      let next = curr.next;
      sorted.sortedInsert(sorted, curr);
      curr = next;
    }

    this.head = sorted.next;
  }

  sortedInsert(head, newNode) {
    let curr;
    if (head == null || head.element >= newNode.element) {
      newNode.next = head;
      head = newNode;
    } else {
      curr = head;
      while (curr.next != null && curr.next.element < newNode.element) {
        curr = curr.next;
      }
      newNode.next = curr.next;
      curr.next = newNode;
    }
    return head;
  }

  //----------------------------------------------------
  // Quick Sort

  quickSort(direction) {
    this.quickSortRecur(this.head, this.getTail(this.head), direction);
  }

  quickSortRecur(begin, end, direction) {
    if (begin == null || end == null) {
      return;
    }

    if (begin == end) {
      return;
    }

    let pslow = begin;
    let pfast = begin.next;

    while (pfast != null) {
      if (direction == "asc") {
        if (pfast.element < begin.element) {
          pslow = pslow.next;

          // Swap pslow and pfast
          let tmp = pslow.element;
          pslow.element = pfast.element;
          pfast.element = tmp;
        }
      } else if (direction == "dec") {
        if (pfast.element > begin.element) {
          pslow = pslow.next;

          // Swap pslow and pfast
          let tmp = pslow.element;
          pslow.element = pfast.element;
          pfast.element = tmp;
        }
      }
      pfast = pfast.next;
    }

    // Swap pslow and begin
    let tmp = pslow.element;
    pslow.element = begin.element;
    begin.element = tmp;

    // quicksort from begin to pslow
    this.quickSortRecur(begin, pslow, direction);

    // quicksort from pslow.next to the end
    this.quickSortRecur(pslow.next, end, direction);
  }

  getTail(head) {
    let curr = head;
    while (curr != null && curr.next != null) {
      curr = curr.next;
    }

    return curr;
  }

  quickSortNonRecursive() {
    // See the C version
  }

  //----------------------------------------------------
  // Merge Sort

  mergeSort(direction) {
    let res = this.mergeSortRecur(this.head, direction);
    this.head = res;
    return;
  }

  mergeSortRecur(list, direction) {
    if (list.next === null) {
      return list;
    }
    let count = 0;
    let countList = list;
    let leftPart = list;
    let leftPointer = list;
    let rightPart = null;
    let rightPointer = null;

    // Counting the nodes in the received linkedlist
    while (countList.next !== null) {
      count++;
      countList = countList.next;
    }

    // counting the mid of the linked list
    let mid = Math.floor(count / 2);
    let count2 = 0;

    // separating the left and right part with
    // respect to mid node in tke linked list
    while (count2 < mid) {
      count2++;
      leftPointer = leftPointer.next;
    }

    rightPart = new LinkedList(leftPointer.next);
    leftPointer.next = null;

    // Here are two linked list which
    // contains the left most nodes and right
    // most nodes of the mid node
    let left = this.mergeSortRecur(leftPart, direction);
    let right = this.mergeSortRecur(rightPart.head, direction);
    let res = this.merging(left, right, direction);

    return res;
  }

  merging(left, right, direction) {
    let result = new LinkedList();

    let resultPointer = result.head;
    let pointerLeft = left;
    let pointerRight = right;

    // If true then add left most node value in result,
    // increment left pointer else do the same in
    // right linked list.
    // This loop will be executed until pointer's of
    // a left node or right node reached null
    while (pointerLeft && pointerRight) {
      let tempNode = null;

      // Check if the right node's value is greater than
      // left node's value
      if (direction == "asc") {
        if (pointerLeft.element > pointerRight.element) {
          tempNode = pointerRight.element;
          pointerRight = pointerRight.next;
        } else {
          tempNode = pointerLeft.element;
          pointerLeft = pointerLeft.next;
        }
      } else if (direction == "dec") {
        if (pointerLeft.element < pointerRight.element) {
          tempNode = pointerRight.element;
          pointerRight = pointerRight.next;
        } else {
          tempNode = pointerLeft.element;
          pointerLeft = pointerLeft.next;
        }
      }

      if (result.head == null) {
        result.head = new Node(tempNode);
        resultPointer = result.head;
      } else {
        resultPointer.next = new Node(tempNode);
        resultPointer = resultPointer.next;
      }
    }

    // Add the remaining elements in the last of resultant
    // linked list
    resultPointer.next = pointerLeft;

    while (resultPointer.next) {
      resultPointer = resultPointer.next;
    }

    resultPointer.next = pointerRight;

    // Result is  the new sorted linked list
    return result.head;
  }

  //----------------------------------------------------
  // Insertion Functions

  insertInOrder(element) {
    let node = new Node(element);

    if (this.head === null || this.head.element >= node.element) {
      node.next = this.head;
      this.head = node;
    } else {
      let curr = this.head;

      while (curr.next !== null && curr.next.element < node.element) {
        curr = curr.next;
      }

      node.next = curr.next;
      curr.next = node;
    }
    this.size++;
  }

  insertAtEnd(element) {
    let node = new Node(element);

    if (this.head === null) {
      this.head = node;
    } else {
      let curr = this.head;

      while (curr.next) {
        curr = curr.next;
      }

      curr.next = node;
    }
    this.size++;
  }

  insertAtFront(elem) {
    let n = new Node(elem);
    if (this.head === null) {
      this.head = n;
    } else {
      n.next = this.head;
      this.head = n;
    }
  }

  insertAt(element, index) {
    if (index > 0 && index > this.size) {
      let node = new Node(element);
      let curr, prev;

      curr = this.head;

      if (index == 0) {
        node.next = head;
        this.head = node;
      } else {
        curr = this.head;
        let it = 0;

        while (it < index) {
          it++;
          prev = curr;
          curr = curr.next;
        }

        node.next = curr;
        prev.next = node;
      }
      this.size++;
    }
  }

  //----------------------------------------------------
  // Search Functions

  searchNonRecurs(data) {
    let curr = this.head;
    while (curr != null) {
      if (curr.element == data) {
        return true;
      }
      curr = curr.next;
    }
    return false;
  }

  searchRecursWrapper(data) {
    let status = this.searchRecurs(this.head, data);
    return status;
  }

  searchRecurs(head, data) {
    if (head == null) {
      return false;
    }
    if (head.element == data) {
      return true;
    }
    return this.searchRecurs(head.next, data);
  }

  //----------------------------------------------------
  // Removal Functions

  removeFrom(index) {
    if (index > 0 && index > this.size) {
      return -1;
    } else {
      let curr,
        prev,
        it = 0;
      curr = this.head;
      prev = curr;

      if (index == 0) {
        this.head = curr.next;
      } else {
        while (it < index) {
          it++;
          prev = curr;
          curr = curr.next;
        }
        prev.next = curr.next;
      }
      this.size--;
      return curr.element;
    }
  }

  removeElement(element) {
    let curr = this.head;
    let prev = null;

    if (curr != null && curr.element == element) {
      this.head = curr.next;
      curr = null;
      return true;
    }

    while (curr != null && curr.element != element) {
      prev = curr;
      curr = curr.next;
    }

    if (curr == null) return;

    prev.next = curr.next;
    curr = null;

    return true;

    //---------------------------------
    /*
        while (curr != null) {
            if (curr.element === element) {
                if (prev == null) {
                    this.head = curr.next;
                } else {
                    prev.next = curr.next;
                }
                curr = null;
                this.size--;
                return true;
            }
            prev = curr;
            curr = curr.next;
        }

        return false;
        */
  }

  //----------------------------------------------------------
  // Utility Functions

  segregateEvenOdd() {
    let end = this.head;
    let prev = null;
    let curr = this.head;

    // Get pointer to last node
    while (end.next != null) {
      end = end.next;
    }

    let newEnd = end;

    /* Examine all odd nodes before the first even node
           and move them after the end */
    while (curr.element % 2 != 0 && curr != end) {
      newEnd.next = curr; // add new node to new end
      curr = curr.next; // advance curr to next node
      newEnd.next.next = null; // set the new end next to null
      newEnd = newEnd.next; // set the new end node
    }

    // Do following steps only if there are any even nodes
    if (curr.element % 2 == 0) {
      // Change the head pointer to point to the first even node
      this.head = curr;

      // Now, curr points to the first even node
      while (curr != end) {
        if (curr.element % 2 == 0) {
          prev = curr;
          curr = curr.next;
        } else {
          // Break the link between prev and curr
          prev.next = curr.next;

          // Make next of curr point to null
          curr.next = null;

          // Move curr to end
          newEnd.next = curr;

          // Make curr as new end of list
          newEnd = curr;

          // Update curr pointer to next of the moved node
          curr = prev.next;
        }
      }
    } else {
      // We must have prev set before executing lines following this statement
      prev = curr;
    }

    /* If there are more than 1 odd nodes and the end of the original list
        is odd then move this node to the end to maintain same order of odd
        numbers in the modified list */
    if (newEnd != end && end.element % 2 != 0) {
      prev.next = end.next;
      end.next = null;
      newEnd.next = end;
    }

    return;
  }

  // Move last element to front of list
  moveLastNodeToFront() {
    if (this.head == null || this.head.next == null) {
      return;
    }

    let secLast = null;
    let last = this.head;

    /* After this loop secLast contains address of 2nd to last
        node and last contains address of the last node in the LL. */
    while (last.next != null) {
      secLast = last;
      last = last.next;
    }

    // Set the next of 2nd to last as null
    secLast.next = null;

    // Set next of last as head node
    last.next = this.head;

    // Change the head pointer to point to the last node now
    this.head = last;
  }

  // Pairwise swap elements of two nodes
  pairWiseSwap() {
    let curr = this.head;
    let tmp = null;

    // Traverse further only if there are at least 2 nodes left
    while (curr != null && curr.next != null) {
      tmp = curr.element;
      curr.element = curr.next.element;
      curr.next.element = tmp;

      // Move temp by 2 for the next pair
      curr = curr.next.next;
    }
  }

  // Swap nodes without swapping data (sometimes expensive)
  swapNodes(head, x, y) {
    if (x == y) {
      return;
    }

    // Search for x (keep track of prevX and CurrX)
    let prevX = null,
      currX = head;
    while (currX && currX.element != x) {
      prevX = currX;
      currX = currX.next;
    }

    // Search for y (keep track of prevY and CurrY)
    let prevY = null,
      currY = head;
    while (currY && currY.element != y) {
      prevY = currY;
      currY = currY.next;
    }

    // If either x or y is not present, nothing to do
    if (currX == null || currY == null) {
      return;
    }

    // If x is not head of linked list
    if (prevX != null) {
      prevX.next = currY;
    } else {
      // Else make y as new head
      head = currY;
    }

    // If y is not head of linked list
    if (prevY != null) {
      prevY.next = currX;
    } else {
      // Else make x as new head
      head = currX;
    }

    let tmp = currY.next;
    currY.next = currX.next;
    currX.next = tmp;
  }

  // For 'sorted' list
  removeDuplicatesFromSorted(start) {
    let curr = start;
    let nextNext;

    if (curr == null) {
      return;
    }

    while (curr.next != null) {
      if (curr.element == curr.next.element) {
        nextNext = curr.next.next; // save placeholder
        curr.next = null; // remove node
        curr.next = nextNext; // relink to placeholder
      } else {
        curr = curr.next; /* This is tricky: only advance if no deletion */
      }
    }
  }

  // For 'unsorted' list
  removeDuplicatesFromUnsorted(start) {
    let curr, ptr, dup;
    curr = start;

    while (curr != null && curr.next != null) {
      ptr = curr;

      while (ptr.next != null) {
        if (curr.element == ptr.next.element) {
          dup = ptr.next;
          ptr.next = ptr.next.next;
          dup = null;
        } else {
          ptr = ptr.next; /* This is tricky */
        }
      }
      curr = curr.next;
    }
  }

  reverseList() {
    if (this.head === null) {
      console.log("List is empty.");
      return;
    }

    let curr = this.head;
    let prev = null;
    let next = null;

    while (curr != null) {
      next = curr.next; // Store next
      curr.next = prev; // Reverse curr node's pointer
      prev = curr; // Advance prev one position
      curr = next; // Advance curr one position
    }
    this.head = prev;
  }

  reverseList_rec = function(head) {
    if (!head || !head.next) return head;
    let p = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return p;
}

  indexOf(element) {
    let cnt = 0;
    let curr = this.head;

    while (curr != null) {
      if (curr.element === element) {
        return cnt;
      }
      cnt++;
      curr = curr.next;
    }
    return -1;
  }

  isEmpty() {
    return this.size == 0;
  }

  size_of_list() {
    console.log(this.size);
  }

  getListLengthNonRecurs() {
    let count = 0;
    let curr = this.head;
    while (curr != null) {
      count++;
      curr = curr.next;
    }
    return count;
  }

  getListLengthRecursWrapper() {
    let count = this.getListLengthNonRecurs(this.head);
    return count;
  }
  getListLengthRecurs(head) {
    if (head == null) {
      return 0;
    }
    return 1 + this.getListLengthRecurs(head.next);
  }


  /*
  How to Print List with 1 or 2 lines:

  While Loop:
  let t = head;
  while (t = t.next) console.log(t.val);

  For Loop:
  for (let t = head; t; t = t.next) console.log(t.val);

  */

  printList() {
    let curr = this.head;
    let str = "";
    while (curr != null) {
      str += curr.element + " ";
      curr = curr.next;
    }
    console.log(str);
  }

  printMiddleElement() {
    let pslow = this.head;
    let pfast = this.head;
    if (this.head != null) {
      while (pfast != null && pfast.next != null) {
        pfast = pfast.next.next;
        pslow = pslow.next;
      }
      return pslow.element;
    }
  }

  destroyList() {
    let curr = this.head;
    let next = null;
    while (curr != null) {
      next = curr.next;
      curr = null;
      curr = next;
    }
    this.head = null;
  }

  findNthFromLast(num) {
    let len = 0;
    let temp = this.head;
    while (temp != null) {
      temp = temp.next;
      len++;
    }

    if (len < num) {
      return;
    }

    // Get the (len - num + 1)th node from the beginning
    temp = this.head;
    for (let i = 1; i < len - num + 1; i++) {
      temp = temp.next;
    }

    return temp.element;
  }

  detectLoopUsingSet() {
    let curr = this.head;
    let mySet = new Set();
    while (curr != null) {
      let stat = mySet.has(curr.element);
      console.log("elem exists: " + stat);
      if (stat) {
        return true;
      }
      mySet.add(curr.element);
      curr = curr.next;
    }
    return false;
  }

  // Floyd's Cycle-Finding Alg.
  detectLoopUsingPtrs() {
    let pslow = this.head;
    let pfast = this.head;
    while (pslow && pfast && pfast.next) {
      pslow = pslow.next; // advance one
      pfast = pfast.next.next; // advance two
      if (pslow == pfast) {
        return true;
      }
    }
    return false;
  }

  // Count number of nodes in a cycle
  countNodes(start) {
    let res = 1;
    let temp = start;
    while (temp.next != start) {
      res++;
      temp = temp.next;
    }
    return res;
  }

  countNodesInLoop() {
    let pslow = this.head;
    let pfast = this.head;
    while (pslow && pfast && pfast.next) {
      pslow = pslow.next;
      pfast = pfast.next.next;

      if (pslow == pfast) {
        return this.countNodes(pslow);
      }
    }
    return 0;
  }
}

//---------------------------------------------------
// creating an object for the
// Linkedlist class
var ll = new LinkedList();

for (let i = 0; i < 16; i++) {
  //ll.insertInOrder(Math.floor(Math.random() * 15) + 1);
  ll.insertAtEnd(Math.floor(Math.random() * 16) + 1);
}
ll.printList();

//ll.reverseList();

//ll.bubbleSort('dec');

//ll.selectionSort('asc');

//ll.quickSort('dec');

//ll.mergeSort('dec');

ll.insertionSort();

//ll.removeDuplicatesFromSorted(ll.head);

//ll.swapNodes(ll.head, 3, 6);

//ll.pairWiseSwap()

//ll.moveLastNodeToFront();

//ll.segregateEvenOdd();

//ll.reverseList();

//ll.destroyList();

//console.log('5th element from last is: ' + ll.findNthFromLast(5));

//console.log(ll.getListLengthNonRecurs());
//console.log(ll.getListLengthRecursWrapper());

//console.log('contains 5: ' + ll.searchNonRecurs(5));
//console.log('contains 5: ' + ll.searchRecursWrapper(5));

//console.log('middle element: ' + ll.printMiddleElement());

//ll.head.next.next.next.next = ll.head;
//console.log('Loop exists? ' + ll.detectLoopUsingSet());
//console.log('Loop exists? ' + ll.detectLoopUsingPtrs());
//console.log('Num nodes in loop: ' + ll.countNodesInLoop());

ll.removeElement(5);
ll.printList();

//--------------------------------------------
/*
// testing isEmpty on an empty list
// returns true
console.log(ll.isEmpty());

// adding element to the list
ll.insertAtEnd(10);

// prints 10
ll.printList();

// returns 1
console.log(ll.size_of_list());

// adding more elements to the list
ll.insertAtEnd(20);
ll.insertAtEnd(30);
ll.insertAtEnd(40);
ll.insertAtEnd(50);

// returns 10 20 30 40 50
ll.printList();

// prints 50 from the list
console.log("is element removed ?" + ll.removeElement(50));

// prints 10 20 30 40
ll.printList();

// returns 3
console.log("Index of 40 " + ll.indexOf(40));

// insert 60 at second positon
// ll contains 10 20 60 30 40
ll.insertAt(60, 2);

ll.printList();

// returns false
console.log("is List Empty ? " + ll.isEmpty());

// remove 3rd element from the list
console.log(ll.removeFrom(3));


// prints 10 20 60 40
ll.printList();
*/

module.exports = LinkedList;
