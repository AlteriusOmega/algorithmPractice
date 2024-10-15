//////////// Data Structures ////////////

// Linked List
// Each node points to the next, not necessarily stored contiguously in memory
// Operations: insert, delete, search
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

//////////// Algorithms ////////////

//// Backtracking ////
// N Queen
const N = 5;

function solveNQueens(n) {
  col = new Set();
  pos_diag = new Set();
  neg_diag = new Set();
}
