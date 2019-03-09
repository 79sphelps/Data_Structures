'use strict';

/*
Functions:
- enqueue
- dequeue
- front
- isEmpty
- printQueue

*/

class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    enqueue(element) {
        let node = new Node(element);

        if (this.tail === null) {
            this.tail = node;
            this.head = this.tail;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.size++;
    }

    dequeue() {
        if (this.head === null) {
            console.log('queue is empty');
            return;
        }
        if (this.head.next !== null) {
            let tmp = this.head.next;
            this.head = null;
            this.head = tmp;
        } else {
            this.head = null;
            this.tail = null;
        }
    }

    front() {
        if (this.isEmpty()) {
            return "No elements in queue";
        }
        return this.head.element;
    }

    isEmpty() {
        return this.head === null ? true : false;
    }

    printQueue() {
        if (this.head === null && this.tail === null) {
            console.log('Queue is empty.');
            return;
        }
        let curr = this.head;
        let str = '';
        while (curr !== null) {
            str += curr.element + ' ';
            curr = curr.next;
        }
        console.log(str);

    }
}

let myQueue = new Queue();

myQueue.enqueue(1);
myQueue.enqueue(2);
myQueue.enqueue(3);
myQueue.enqueue(4);
myQueue.enqueue(5);

myQueue.printQueue();


myQueue.dequeue();
myQueue.printQueue();

console.log(myQueue.front());

myQueue.enqueue(6);
myQueue.enqueue(7);

myQueue.printQueue();

myQueue.dequeue();
myQueue.dequeue();
myQueue.dequeue();

myQueue.printQueue();

module.exports = Queue;