//each node needs to hold its own value and the value of the next node in the list

class LinkedListNode {
    constructor(value, next) {
        this.value = value;
        this.next = next || null;
    }
}

module.exports = LinkedListNode