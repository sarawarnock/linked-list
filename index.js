const LinkedListNode = require('./LinkedListNode');
const LinkedList = require('./LinkedList')


let list = new LinkedList([1, 2, 3]);

console.log(new LinkedListNode(3));
console.log(new LinkedListNode(3, 10));
console.log(new LinkedListNode('string', true))
//console.log(new list.append(1))

console.log(list.toArray());
console.log(list.toArray(true));