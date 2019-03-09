/*
https://medium.com/@alexanderv/tries-javascript-simple-implementation-e2a4e54e4330

A trie is a tree. It’s an n-ary tree, designed for efficient retrieval.
How efficient is efficient? A trie allows us to search for a string in O(m),
where m is the number of characters in that string.

From Wiki:
A trie, also called digital tree and sometimes radix tree or prefix tree (as they can be searched by prefixes),
is an ordered tree data structure that is used to store a dynamic set or associative array where the keys are
usually strings. Unlike a binary search tree, no node in the tree stores the key associated with that node;
instead, its position in the tree defines the key with which it is associated. All the descendants of a node
have a common prefix of the string associated with that node, and the root is associated with the empty string.
Values are not necessarily associated with every node. Rather, values tend only to be associated with leaves,
and with some inner nodes that correspond to keys of interest.

Complexity
Average
Access	Search	Insertion	Deletion
O(k)	  O(k)	  O(k)	    O(k)
where k is the word length.

Use Cases for Trie:
My favorite use case of tries is you can use them to construct an inverted web index (say, if you're Google):

#1:
Given a list of web pages, create a symbol table of words contained in the web pages. Associate with each word
a list of web pages in which that word appears. Write a program that reads in a list of web pages, creates the
symbol table, and support single word queries by returning the list of web pages in which that query word appears.

#2
Your editor's spellchecker uses it to store dictionaries and lookup for words.

Functions:
- add
- search
- remove

*/
var node = {
  key: null,
  value: null,
  children: []
};

function Trie() {
  this.head = {
    key: "",
    children: {}
  };
}

Trie.prototype.add = function(key) {
  var curNode = this.head,
    newNode = null,
    curChar = key.slice(0, 1);

  key = key.slice(1);

  while (
    typeof curNode.children[curChar] !== "undefined" &&
    curChar.length > 0
  ) {
    curNode = curNode.children[curChar];
    curChar = key.slice(0, 1);
    key = key.slice(1);
  }

  while (curChar.length > 0) {
    newNode = {
      key: curChar,
      value: key.length === 0 ? null : undefined,
      children: {}
    };

    curNode.children[curChar] = newNode;

    curNode = newNode;

    curChar = key.slice(0, 1);
    key = key.slice(1);
  }
};

Trie.prototype.search = function(key) {
  var curNode = this.head,
    curChar = key.slice(0, 1),
    d = 0;

  key = key.slice(1);

  while (
    typeof curNode.children[curChar] !== "undefined" &&
    curChar.length > 0
  ) {
    curNode = curNode.children[curChar];
    curChar = key.slice(0, 1);
    key = key.slice(1);
    d += 1;
  }

  if (curNode.value === null && key.length === 0) {
    return d;
  } else {
    return -1;
  }
};

Trie.prototype.remove = function(key) {
  var d = this.search(key);
  if (d > -1) {
    removeH(this.head, key, d);
  }
};

function removeH(node, key, depth) {
  if (depth === 0 && Object.keys(node.children).length === 0) {
    return true;
  }

  var curChar = key.slice(0, 1);

  if (removeH(node.children[curChar], key.slice(1), depth - 1)) {
    delete node.children[curChar];
    if (Object.keys(node.children).length === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

let t = new Trie();
t.add("Steve");
console.log(t.search("Steve"));
t.add("Tim");
console.log(t.search("Tim"));
