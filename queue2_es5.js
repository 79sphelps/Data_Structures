// ARRAY QUEUE

/*
http://blog.benoitvallon.com/data-structures-in-javascript/the-queue-data-structure/

A Queue is a particular kind of abstract data type or collection in which the entities
in the collection are kept in order and the principal operations are the addition of
entities to the rear terminal position, known as enqueue, and removal of entities from
the front terminal position, known as dequeue. This makes the Queue a First-In-First-Out
(FIFO) data structure. In a FIFO data structure, the first element added to the Queue
will be the first one to be removed.

Complexity
Average
Access	Search	Insertion	Deletion
O(n)	  O(n)	  O(1)	    O(n)
*/

function Queue() {
  this.queue = [];
}

Queue.prototype.enqueue = function(value) {
  this.queue.push(value);
};

Queue.prototype.dequeue = function() {
  return this.queue.shift();
};

Queue.prototype.peek = function() {
  return this.queue[0];
};

Queue.prototype.length = function() {
  return this.queue.length;
};

Queue.prototype.print = function() {
  console.log(this.queue.join(" "));
};

var queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.print(); // => 1 2 3
console.log("length is 3:", queue.length()); // => 3
console.log("peek is 1:", queue.peek()); // => 3
console.log("dequeue is 1:", queue.dequeue()); // => 1
queue.print(); // => 2 3
console.log("dequeue is 2:", queue.dequeue()); // => 2
console.log("length is 1:", queue.length()); // => 1
console.log("dequeue is 3:", queue.dequeue()); // => 3
queue.print(); // => ''
console.log("peek is undefined:", queue.peek()); // => undefined
console.log("dequeue is undefined:", queue.dequeue()); // => undefined
