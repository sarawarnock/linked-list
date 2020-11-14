const LinkedListNode = require('./LinkedListNode')

class LinkedList {
    constructor(value) {
        this.size = 0;
        this.head = null;
        this.tail = null;

        //trrigger our fromArray method here in the constructor
        //if an array is passed, run the fromArray method
        if (value) {
            if (Array.isArray(value)) return this.fromArray(value);
            return new TypeError(value + ' is not iterable');
        };
    }

    //prepend method adds values to beginning of list (array.unshift)
    prepend(value) {
        this.size += 1;

        const newNode = new LinkedListNode(value, this.head);

        //head becomes the new node, if empty, the new node is also the tail
        this.head = newNode;
        if (!this.tail) this.tail = newNode;
        //returns the whole linked list
        return this;
    }

    //add elements to the end of the list (like array.push)
    append(value) {
        this.size += 1;

        const newNode = new LinkedListNode(value);
        //if its the first item in the list
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }

        this.tail.next = newNode;
        this.tail = newNode;
        return this;
    }

    //converting to and from an array
    fromArray(values) {
        values.forEach(value => this.append(value));
        return this;
    }

    //convert to an array
    //use nodes, when true will fill the array with each LinkedListNode object, rather than just the value
    toArray(useNodes = false) {
        const nodes = [];
        let currentNode = this.head;
        while (currentNode) {
            nodes.push(useNodes ? currentNode : currentNode.value);
            currentNode = currentNode.next;
        };
        return nodes;
    }
}

module.exports = LinkedList;