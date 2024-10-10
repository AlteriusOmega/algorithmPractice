//////////// Data Structures ////////////

// Linked List
// Each node points to the next, not necessarily stored contiguously in memory
// Operations: insert, delete, search
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
