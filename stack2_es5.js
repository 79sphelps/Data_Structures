// ARRAY STACK

/*
http://blog.benoitvallon.com/data-structures-in-javascript/the-stack-data-structure/

A Stack is an abstract data type that serves as a collection of elements, with two principal
operations: push, which adds an element to the collection, and pop, which removes the most
recently added element that was not yet removed. The order in which elements come off a
Stack gives rise to its alternative name, LIFO (for last in, first out)

Complexity
Average
Access	Search	Insertion	Deletion
O(n)	O(n)	O(1)	    O(1)

*/

function Stack() {
  this.stack = [];
}

Stack.prototype.push = function(value) {
  this.stack.push(value);
};
Stack.prototype.pop = function() {
  return this.stack.pop();
};
Stack.prototype.peek = function() {
  return this.stack[this.stack.length - 1];
};
Stack.prototype.length = function() {
  return this.stack.length;
};
Stack.prototype.print = function() {
  console.log(this.stack.join(" "));
};

var stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.print(); // => 1 2 3
console.log("length is 3:", stack.length()); // => 3
console.log("peek is 3:", stack.peek()); // => 3
console.log("pop is 3:", stack.pop()); // => 3
stack.print(); // => 1 2
console.log("pop is 2:", stack.pop()); // => 2
console.log("length is 1:", stack.length()); // => 1
console.log("pop is 1:", stack.pop()); // => 1
stack.print(); // => ''
console.log("peek is undefined:", stack.peek()); // => undefined
console.log("pop is undefined:", stack.pop()); // => undefined
