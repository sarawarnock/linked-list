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

    //deleting items
    //by default, the function deletes all nodes with a given value, but if we pass true as the second arg. it will delete just the first ndoe with that value
    delete(value, deleteOne = false) {
        if (!this.head) return false;
        let deletedNode = null;

        //if the head needs to be deleted
        while (this.head && this.head.value === value) {
            this.size -= 1;
            deletedNode = this.head;
            this.head = this.head.next;
            if (deleteOne) return true;
        };

        let currentNode = this.head;

        //if any node except the head or tail needs to be deleted
        if (currentNode !== null) {
            while (currentNode.next) {
                if (currentNode.next.value === value) {
                    this.size -= 1;
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                    if (deleteOne) return true;
                }
                else {
                    currentNode = currentNode.next;
                };
            };
        };

        //if the tail needs to be deleted
        if (this.tail.value === value) {
            this.tail = currentNode;
        };

        if (deletedNode === null) {
            return false;
        }
        else {
            return true;
        };
    }

    //accessing entries - linear time complexity, need to iterate through the entire list

    //includes - accept either a value or an instance of the LinkedListNode class 
    //return true or false
    includes(value) {
        if (!this.head) return false;

        let isNode = value.constructor.name === 'LinkedListNode';
        if (isNode) value = value.value;

        let currentNode = this.head;

        while (currentNode) {
            if (value !== undefined && value === currentNode.value) {
                return true;
            };
            currentNode = currentNode.next;
        };

        return false;
    }

    //find - should return the value of the first element in the list that satisfies a provided callback function otherwise return undefined
    find(callback) {
        if (Object.prototype.toString.call(callback) !== '[object Function]') {
            return new TypeError(callback + ' is not a function');
        };

        if (!this.head) return undefined
        
        let currentNode = this.head;

        while (currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode;
            };
            currentNode = currentNode.next;
        };

        return undefined;
    }
}

module.exports = LinkedList;