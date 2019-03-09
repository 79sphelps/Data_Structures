'use strict';

/*
Functions:
- push
- pop
- printItems
- peek
- isEmpty

*/

class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    push(element) {
        let node = new Node(element);

        if (this.head === null) {
            this.head = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.size++;
    }

    pop() {
        if (this.head === null) {
            console.log('empty stack');
            return;
        } else {
            let tmp = this.head.next;
            this.head = null;
            this.head = tmp;
        }
        this.size--;
    }

    printItems() {
        if (this.head === null) {
            console.log('Stack is empty.');
            return;
        }

        let curr = this.head;
        let str = '';
        while (curr != null) {
            str += curr.element + ' ';
            curr = curr.next;
        }
        console.log(str);
    }

    peek() {
        console.log(this.head.element);
    }

    isEmpty() {
        return this.head == null ? true : false;
    }
}

let myStack = new Stack();

myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(4);
myStack.push(5);
myStack.printItems();

myStack.pop();
myStack.printItems();

myStack.peek();

console.log('is empty? ' + myStack.isEmpty());

module.exports = Stack;