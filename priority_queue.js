
class Node {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
        this.next = null;
    }
}

class PriorityQueue {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    enqueue(element, priority) {
        let node = new Node(element, priority);

        if (this.head === null || node.priority < this.head.priority) {
            node.next = this.head;
            this.head = node;
        } else {
            let curr = this.head;

            while (curr.next != null && curr.next.priority <= node.priority) {
                curr = curr.next;
            }

            node.next = curr.next;
            curr.next = node;
        }

        this.size++;
    }

    dequeue() {
        let curr;
        if (this.head === null) {
            console.log('Priority queue is empty.');
        } else {
            curr = this.head;
            this.head = this.head.next;
            curr = null;
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
        if (this.head === null) {
            console.log('Priority queue is empty.');
        } else {
            let curr = this.head;
            let str = '';
            while (curr != null) {
                str += curr.element + ' | ' + curr.priority + '\n';
                curr = curr.next;
            }
            console.log(str);
        }
    }
}

let myPQ = new PriorityQueue();

myPQ.enqueue("Sumit", 2);
myPQ.enqueue("Gourav", 1);
myPQ.enqueue("Piyush", 1);

//console.log('Front: ' + myPQ.front());

myPQ.enqueue("Sunny", 2);
myPQ.enqueue("Sheru", 3);

myPQ.printQueue();

console.log('----------------')
myPQ.dequeue();

myPQ.printQueue();
console.log('----------------')
myPQ.dequeue();

myPQ.printQueue();
console.log('----------------')
myPQ.dequeue();

myPQ.printQueue();
console.log('----------------')
myPQ.dequeue();

myPQ.printQueue();

module.exports = PriorityQueue;