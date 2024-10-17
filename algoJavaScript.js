//////////// Data Structures ////////////

// Linked List
// Each node points to the next, not necessarily stored contiguously in memory
// Operations: insert, delete, search
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

//////////// Algorithms ////////////

//// Trees ////

// IT_OF_WAHAM tutorials definitions
// https://www.youtube.com/watch?v=TxDVtNCZlSk&list=PLdPTfo6Ung1BSNkJjEmWH8OGJ2jWCpGAR&index=3
// Time code 4:22

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    var newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  contains(value) {
    if (this.root === null) return false;
    let temp = this.root;
    while (temp) {
      if (value < temp.value) {
        temp = temp.left;
      } else if (value > temp.value) {
        temp = temp.right;
      } else {
        return true;
      }
    }
    return false;
  }

  // Breadth First Search
  // Has to be iterative, not recursive since uses a queue not a stack
  treeBFS() {
    let currentNode = this.root; // Start at top of tree at root node
    let results = [];
    // BFS uses queue which unlike stack, is first in first out like a line at a store
    // so for a queue you insert (into the right side) with push like normal, but you retrieve (from left) with shift
    // so the queue goes from right to left normally. You could make a left to right queue with unshift and pop though
    let queue = [];
    queue.push(currentNode); // Need to push root before loop so queue has some length

    while (queue.length > 0) {
      // While the queue is not empty
      currentNode = queue.shift(); // Grab the "current node" by pulling it from the left side of queue with shift()
      // Now we do the "meat" of our function code which is this case is simply adding this node value to the list
      results.push(currentNode.value);
      // Now we handle the children of the current node. Check if there is a left, and if so, push it to the queue, and same for right
      // If this were a graph we could just do a for loop to iterate through the children instead of explicitly left and right
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return results;
  }

  treeDFS() {
    let results = [];
    function recursiveDFS(currentNode) {
      results.push(currentNode.value);
      if (currentNode.left) recursiveDFS(currentNode.left);
      if (currentNode.right) recursiveDFS(currentNode.right);
    }
    recursiveDFS(this.root);
    return results;
  }

  treeDFSPure(currentNode, results = []) {
    results.push(currentNode.value);
    if (currentNode.left) this.treeDFSPure(currentNode.left, results);
    if (currentNode.right) this.treeDFSPure(currentNode.right, results);
    return results;
  }

  treeDFSPostOrderPure(currentNode, results = []) {
    // This order is weird, it basically does all the leaves first, going from the bottom of the tree up to the top at the end. Root is last
    // console.log(
    //   `In treeDFSPostOrderPure start and curretNode.value is ${currentNode.value}\n`
    // );

    if (currentNode.left) {
      this.treeDFSPostOrderPure(currentNode.left, results);
    }
    if (currentNode.right) {
      this.treeDFSPostOrderPure(currentNode.right, results);
    }
    results.push(currentNode.value);
    return results;
  }

  treeDFSInOrderPure(currentNode, results = []) {
    if (currentNode.left) this.treeDFSInOrderPure(currentNode.left, results);
    // We move the push to the center between the left and right calls so the parent node gets pushed between them in order of left to right
    results.push(currentNode.value);
    if (currentNode.right) this.treeDFSInOrderPure(currentNode.right, results);
    return results;
  }
}

// Create tree
let myTree = new BinarySearchTree();
myTree.insert(47);
myTree.insert(21);
myTree.insert(76);
myTree.insert(18);
myTree.insert(27);
myTree.insert(52);
myTree.insert(82);

// From BFS expect [47, 21, 76, 18, 27, 52, 82]
let treeBFSResult = myTree.treeBFS();
console.log(
  "In tree breadth first, expect [47, 21, 76, 18, 27, 52, 82] and treeBFSResult is \n",
  treeBFSResult
);

// Depth First Search Pre-Order (most common)
let treeDFSResult = myTree.treeDFS();
console.log(
  "In tree depth first, expect [47, 21, 18, 27, 76, 52, 82] and treeDFSResult is \n",
  treeDFSResult
);

// Pure recursive version
let treeDFSPureResult = myTree.treeDFSPure(myTree.root);
console.log(
  "In tree depth first pure, expect [47, 21, 18, 27, 76, 52, 82] and treeDFSPureResult is \n",
  treeDFSPureResult
);

// Depth First Search Post-Order
let treeDFSPostOrder = myTree.treeDFSPostOrderPure(myTree.root);
console.log(
  "In tree depth first pure, expect [18, 27, 21, 52, 82, 76, 47] and treeDFSPureResult is \n",
  treeDFSPostOrder
);

// Depth First Search In-Order
let treeDFSInOrder = myTree.treeDFSInOrderPure(myTree.root);
console.log(
  "In tree depth first pure, expect [18, 21, 27, 47, 52, 76, 82] and treeDFSPureResult is \n",
  treeDFSInOrder
);

// Leetcode binary tree node definition
// This may look like a class method, but it's not, this is a "constructor function" which basically was a hacky way to get the
// Functionality of classes before actual classes were introduced to JavaScript in ES6.
// When you use this function with "new TreeNode", js will create an empty object, set "this" to refer to it,
// then it will create the val, left, and right properties in it, and return "this" at the end
// Note that it is named with PascalCase, which is a clue that its a constructor function. Classes and CFs use Pascal

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
  // There is an implicit "return this" right here
}

function makeTree(treeArray, index = 0) {
  // Base case is when value is null (or when we go out of bounds)
  if (index >= treeArray.length || treeArray[index] === null) return null;
  // Make our node
  const node = new TreeNode(treeArray[index]);
  // Remember to get leftIndex from parentIndex, it's parentIndex * 2 + 1
  node.left = makeTree(treeArray, index * 2 + 1);
  // To get rightIndex we do parentIndex * 2 + 2
  node.right = makeTree(treeArray, index * 2 + 2);
  return node;
}

let makeTreeTest = makeTree([1, 2, 3, null, 4, 5]);
console.log(makeTreeTest);

function printTree(treeNode) {
  // Want to print in level-order aka BFS so use queue
  console.log("In printTree start and tree is \n", treeNode);
  let queue = [];
  let currentNode = treeNode;
  let spacingPerLevel = "  ";
  queue.push(currentNode);
  while (queue.length) {
    // console.log(spacingPerLevel);
    // First thing to do is always shift/pop from the queue/stack to get the current node
    currentNode = queue.shift(); // Use shift since it's a queue right to left
    // Handle the current node
    console.log(currentNode.val);
    // Now handle the children
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
  }
}

printTree(makeTreeTest);

// Re-order tree to in-order traversal
// https://leetcode.com/problems/binary-tree-inorder-traversal/solutions/4380456/js-simple-oneliner/?envType=problem-list-v2&envId=binary-tree

var inorderTraversal = function (currentNode, inOrderList = []) {
  if (!currentNode) return [];
  if (currentNode.left) inorderTraversal(currentNode.left, inOrderList);
  inOrderList.push(currentNode.val);
  if (currentNode.right) inorderTraversal(currentNode.right, inOrderList);
  return inOrderList;
};

//// Backtracking ////
// N Queen
const N = 5;

function solveNQueens(n) {
  col = new Set();
  pos_diag = new Set();
  neg_diag = new Set();
}

//// Graphs ////

// freeCodeCamp tutorial https://www.youtube.com/watch?v=tWVWeAqZ0WU&t=1s

// Has path problem
// Time = O(e) = O(n^2) since # edges = nodes^2
// Space = O(n)
let adjacencyList1 = {
  f: ["g", "i"],
  g: ["h"],
  h: [],
  i: ["g", "k"],
  j: ["i"],
  k: [],
};

function hasPathDFS(graph, currentNode, target) {
  // Base case
  if (currentNode === target) return true; // We found the target node!

  console.log("In hasPathDFS and currentNode is \n", currentNode);
  // Since its a graph, it can have many neighbors so we loop through them with a for loop
  for (let neighbor of graph[currentNode]) {
    if (hasPathDFS(graph, neighbor, target) === true) return;
  }
  return false;
}

function hasPathBFS(graph, root, target) {
  const queue = [];
  queue.push(root);
  while (queue.length) {
    // Always start by getting our current node from the queue using shift
    const currentNode = queue.shift();
    if (currentNode === target) return true;
    // Add all the neighbors to the queue
    for (let neighbor of graph[currentNode]) {
      queue.push(neighbor);
    }
  }
  return false;
}

let edges1 = [
  ["i", "j"],
  ["k", "i"],
  ["m", "k"],
  ["k", "l"],
  ["o", "n"],
];

function convertEdgesToAdjacency(edgeList) {
  // For undirected graph (all edges go both ways)
  // Create adjacency object
  const adjacency = {};
  // Iteratively walk through all the edges in the edge list
  for (let edge of edgeList) {
    // Edge is an array with two items in it so break them into two variables
    const [nodeA, nodeB] = edge;
    // Check if this node is not already in our adjacency object, and if not, add it and set its value to empty list
    if (!(nodeA in adjacency)) adjacency[nodeA] = []; // Parenthesis are necessary here
    if (!(nodeB in adjacency)) adjacency[nodeB] = [];
    // Now we know that it has to be in the adjacency object so now we can add both edges since its undirected
    adjacency[nodeA].push(nodeB);
    adjacency[nodeB].push(nodeA);
  }
  return adjacency;
}

const undirectedPath = (edges, nodeA, nodeB) => {
  const adjacency = convertEdgesToAdjacency(edges);
  return hasPathUndirectedDFS(adjacency, nodeA, nodeB, new Set());
};

function hasPathUndirectedDFS(adjacency, currentNode, target, visited) {
  // Base case
  if (currentNode === target) return true;
  // Undirected graph so we need to watch out for infinite loops using visited Set!
  if (visited.has(currentNode)) return false;
  visited.add(currentNode);
  // Add neighbors
  for (let neighbor of adjacency[currentNode]) {
    if (hasPathUndirectedDFS(adjacency, neighbor, target, visited) === true)
      return true;
  }
  return false;
}

console.log(
  "convertEdgesToAdjacency(edges1)  is \n",
  convertEdgesToAdjacency(edges1)
);

// Connected Component Count
// https://www.structy.net/problems/connected-components-count

const garphConnectedComponentsCount = {
  0: [8, 1, 5],
  1: [0],
  5: [0, 8],
  8: [0, 5],
  2: [3, 4],
  3: [2, 4],
  4: [3, 2],
}; // -> 2

function connectedComponentsCount(graph) {
  // We need to count all the different components so we need to iterate through everything keeping track of a global count so add count arg
  // DFS recursive
  const visited = new Set();
  let count = 0;
  for (let nodeKey in graph) {
    // use of...in because we just want the keys which are the node name
    if (explore(graph, nodeKey, visited) === true) count++;
  }
  return count;
}

function explore(graph, currentNode, visited) {
  // console.log("At start of explore and visited is", visited);
  // Note we convert to Number for the set because otherwise the set will contain 8 and '8', messing up our .has check
  // We could alternately convert to String both times. The only thing that matters is that we don't have both numbers and strings in the set
  if (visited.has(Number(currentNode))) return false;
  visited.add(Number(currentNode));
  // Handle neighbors
  for (let neighbor of graph[currentNode]) {
    explore(graph, neighbor, visited);
  }
  return true; // Must have already finished exploring all its neighbors because the for loop above is done
}

console.log(
  "connectedComponentsCount(garphConnectedComponentsCount) should be 2 and is \n",
  connectedComponentsCount(garphConnectedComponentsCount)
);

// Largest Component
// https://www.structy.net/problems/largest-component
// Need to find the largest component (island) so take similar tack to previous problem
// We want the number of nodes in the component, but just the very largest so need a global max variable

const graphLargestComponent = {
  0: ["8", "1", "5"],
  1: ["0"],
  5: ["0", "8"],
  8: ["0", "5"],
  2: ["3", "4"],
  3: ["2", "4"],
  4: ["3", "2"],
}; // -> 4

const largestComponent = (graph) => {
  // Undirected so again need visited set
  const visited = new Set();
  let max = 0;
  for (let nodeKey in graph) {
    const currentComponentSize = exploreLargest(graph, nodeKey, visited, 0);
    if (currentComponentSize > max) max = currentComponentSize;
  }
  return max;
};

function exploreLargest(graph, currentNode, visited) {
  if (visited.has(Number(currentNode))) return 0; // Don't want to double count nodes, so if its in visited, return 0 to count
  visited.add(Number(currentNode));
  let size = 1; // Start at 1 since we haven't visited this node yet
  for (let neighbor of graph[currentNode]) {
    size += exploreLargest(graph, neighbor, visited);
  }
  // Once we finish the for loop, that means we've completed exploring all the neighbors of this component so size should be done
  // Needs to return the size of this component
  return size;
}

console.log(
  "largestComponent(graphLargestComponent) should be 4 and is \n",
  largestComponent(graphLargestComponent)
);

// Shortest Path
// https://www.structy.net/problems/shortest-path

const edgesShortestPath = [
  ["w", "x"],
  ["x", "y"],
  ["z", "y"],
  ["z", "v"],
  ["w", "v"],
];

const shortestPath = (edges, start, destination) => {
  const graph = convertEdgesToAdjacency(edges);
  console.log("In shortestPath and graph is \n", graph);
  // Shortest path is best done with BFS since we're essentially creating circles that expand out until they hit the shortest path
  let queue = [];
  // Queue will contain the node AND the distance
  queue.push([start, 0]); // Start distance at 0 in the queue
  // Undirected so need visited
  const visited = new Set();
  while (queue.length) {
    const [currentNode, distance] = queue.shift(); // Gives us an array with the node and the distance
    if (currentNode === destination) return distance; // If this isn't true, need to keep searching
    // Handle neighbors
    for (let neighbor of graph[currentNode]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]); // Increment distance because neighbor is 1 over
      }
    }
  }
  return -1; // If we haven't found a path yet then it must not exist so we return -1
};

console.log(
  "shortestPath(edgesShortestPath) should be 2 and is \n",
  shortestPath(edgesShortestPath, "w", "z")
);

// Island Count
// Grid graph
// https://www.structy.net/problems/island-count
// Use row, col to get cell, think of cell as a node in a grid and its adjacent cells as neighbors (up, down, left, right)

const gridIslandCount = [
  ["W", "L", "W", "W", "W"],
  ["W", "L", "W", "W", "W"],
  ["W", "W", "W", "L", "W"],
  ["W", "W", "L", "L", "W"],
  ["L", "W", "W", "L", "L"],
  ["L", "L", "W", "W", "W"],
]; // Should be 3

const islandCount = (grid) => {
  // grid is an array of arrays
  // Iterate through row and column
  // visited will serve two functions as a global variable, keeping us from infinite cycles, and keeping track of if island is new
  const visited = new Set();
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      // exploreIsland should return a boolean of whether or not this is a new island (not visited yet)
      if (exploreIsland(grid, row, col, visited) === true) count += 1;
    }
  }
  return count;
};

function exploreIsland(grid, row, col, visited) {
  // console.log(`In exploreIsland and row is ${row} and col is ${col} \n`);
  // Check if we are in bounds before doing anything
  const rowInbounds = 0 <= row && row < grid.length;
  const colInbounds = 0 <= col && col < grid[0].length;
  if (!rowInbounds || !colInbounds) return false; // Out of bounds position can't be island, return false
  if (grid[row][col] === "W") return false; // Water is not new island, return false

  const currentPosition = `${row},${col}`;
  if (visited.has(currentPosition)) return false; // We have been here before so its not a new island, return false
  visited.add(currentPosition);

  // Recursive call on neighbors
  // Don't "look before you leap". row - 1 may be out of bounds but we don't check for it here
  // since it's already covered by our out of bounds base case
  exploreIsland(grid, row - 1, col, visited); // Up
  exploreIsland(grid, row + 1, col, visited); // Down
  exploreIsland(grid, row, col - 1, visited); // Left
  exploreIsland(grid, row, col + 1, visited); // Right

  // Now we are done with all neighbors so we must have just finished traversing a new island, so return true
  return true;
}

console.log(
  "islandCount(gridIslandCount) should be 3 and is \n",
  islandCount(gridIslandCount)
);

// Minimum Island
// https://www.structy.net/problems/minimum-island

const gridMinimumIsland = [
  ["W", "L", "W", "W", "W"],
  ["W", "L", "W", "W", "W"],
  ["W", "W", "W", "L", "W"],
  ["W", "W", "L", "L", "W"],
  ["L", "W", "W", "L", "L"],
  ["L", "L", "W", "W", "W"],
]; // Should be 2

const minimumIsland = (grid) => {
  const visited = new Set();
  let minimum = Infinity; // Start min at infinity so anything we find will be smaller than that
  // Iterate through all the cells in the rows and columns
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      // exploreMinimumIsland should return the island size so we can check it against our global minimum
      const currentIslandSize = exploreMinimumIsland(grid, row, col, visited);
      console.log(
        `In minimumIsland and currentIslandSize is ${currentIslandSize}\n`
      );
      if (currentIslandSize > 0 && currentIslandSize < minimum)
        minimum = currentIslandSize;
    }
  }
  return minimum;
};

function exploreMinimumIsland(grid, row, col, visited) {
  // Base cases
  // Check if we are in bounds first
  const rowInbounds = 0 <= row && row < grid.length;
  const colInbounds = 0 <= col && col < grid[0].length;
  if (!rowInbounds || !colInbounds) return 0; // Out of bounds, don't increase count
  // Check if in water
  if (grid[row][col] === "W") return 0;
  // Check if we've been here before
  const currentPosition = row + "," + col;
  if (visited.has(currentPosition)) return 0;
  visited.add(currentPosition);
  // Must be in bounds and on new island
  // Handle neighbors
  let count = 1; // Doesn't need to be arg as children can return count up to parents with recursive call return
  count += exploreMinimumIsland(grid, row - 1, col, visited); // Up
  count += exploreMinimumIsland(grid, row + 1, col, visited); // Down
  count += exploreMinimumIsland(grid, row, col - 1, visited); // Left
  count += exploreMinimumIsland(grid, row, col + 1, visited); // Right

  // Now we must be done exploring a new island, return its count
  console.log(`In exploreMinimumIsland and count at end is ${count}\n`);
  return count;
}

console.log(
  "minimumIsland(gridMinimumIsland) should be 2 and is \n",
  minimumIsland(gridMinimumIsland)
);

//// Dynamic Programming (DP) ////

// freeCodeCamp Dynamic Programming tutorial
// https://www.youtube.com/watch?v=oBt53YbR9Kk

// Fibonacci sequence
function fibonacci(n) {
  console.log(`In fibonacci start and n is ${n}\n`);
  // Base cases
  // Have to handle both n=0 and n=1 because we are doing two recursive calls and we need to end both of them
  if (n === 0) return 0;
  if (n === 1) {
    console.log(
      "In fibonacci and hit base case, n is 1 so returning 1 finally!"
    );
    return 1;
  }
  // Recursive call
  // What is the sub problem? The fib of this index is fib(n-1) + fib(n-2)
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(`fibonacci(6) should be 8 and is ${fibonacci(6)}\n`);
// console.log(`fibonacci(1) should be 1 and is ${fibonacci(1)}\n`);
// console.log(`fibonacci(2) should be 1 and is ${fibonacci(2)}\n`);
console.log(`fibonacci(9) should be 34 and is ${fibonacci(9)}\n`);

function fibonacciMinimal(n) {
  // Combined base case for 0 and 1. This is really just hiding the double base case for 0 and 1
  if (n <= 1) return n; // Could also do if (n<=2) return 1 which saves us one call
  return fibonacciMinimal(n - 1) + fibonacciMinimal(n - 2);
}
console.log(`fibonacciMinimal(9) should be 34 and is ${fibonacciMinimal(9)}\n`);

function dib(n) {
  // This function creates a perfectly balanced binary tree
  // Every level is the previous level * 2 so for L layers it will be O(2^n) time complexity
  // Space complexity is layers over 2 so L/2 which equates to O(L) space complexity
  if (n <= 1) return;
  dib(n - 1);
  dib(n - 1);
}

function fibonacciDP(n, memo = {}) {
  // Fibonacci is very fractal-like so its very self-repeating. We can use that property to make it much more efficient using memoization
  // Create the memo in the argument with default value of empty object {}
  // The structure of this is just a linear chain of pairs, not a branching tree, so time complexity is just 2n = O(n) time and space
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  // The memo object in these recursive calls is a reference to the single memo that is created at the first call
  memo[n] = fibonacciDP(n - 1, memo) + fibonacciDP(n - 2, memo);
  return memo[n];
}

console.log(`fibonacciDP(9) should be 34 and is ${fibonacciDP(9)}\n`);
console.log(
  `fibonacciDP(50) should be 12,586,269,025 and is ${fibonacciDP(50)}\n`
); // This would take a VERY long time for the normal non-memoized version

// Tribonacci problem
// https://www.structy.net/problems/tribonacci

const tribonacci = (n) => {
  if (n <= 1) return 0;
  if (n === 2) return 1;
  return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
};

console.log(`tribonacci(7) should be 13 and is ${tribonacci(7)}\n`);
// console.log(
//   `tribonacci(37) should be 1132436852 but will take forever. ${tribonacci(37)}`
// );

const tribonacciDP = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n <= 1) return 0;
  if (n === 2) return 1;
  memo[n] =
    tribonacciDP(n - 1, memo) +
    tribonacciDP(n - 2, memo) +
    tribonacciDP(n - 3, memo);
  return memo[n];
};

console.log(`tribonacciDP(7) should be 13 and is ${tribonacciDP(7)}\n`);
console.log(
  `tribonacciDP(37) should be 1132436852 and will be quick and is ${tribonacciDP(
    37
  )}\n`
);

// Traveler on 2D grid problem
// You begin in the top left corner and goal is to travel to the bottom right but can only move down or right
// In how many ways can you travel to the goal on a grid of dimensions m * n?
// Non-memoized version is O(2^r+c) time and O(r + c) space
function gridTraveler(r, c) {
  // Grid graph? Also shrinking problem by using sub-grids. It's a binary tree structure
  // Base case 1x1 grid
  if (r === 0 || c === 0) return 0;
  if (r === 1 && c === 1) return 1;
  // Can only decrement r or c (the number of rows and columns, not the current row/col)
  // Going to the left of the tree represents going down, going to the right in the tree is going right in the grid
  // Walk through tree left or right
  // Go to left child / move down + go to right / move right
  return gridTraveler(r - 1, c) + gridTraveler(r, c - 1);
}

console.log(`gridTraveler(3, 3) should be 6 and is ${gridTraveler(3, 3)}\n`);

// Memoized version is O(r * n) time and O(r + c) space, so space is the same but time is way faster
function gridTravelerDP(r, c, memo = {}) {
  // Stringify r and c to use memo
  const rowColMemo = r + "," + c;
  if (rowColMemo in memo) return memo[rowColMemo];
  if (r === 0 || c === 0) return 0;
  if (r === 1 && c === 1) return 1;
  memo[rowColMemo] =
    gridTravelerDP(r - 1, c, memo) + gridTravelerDP(r, c - 1, memo);
  return memo[rowColMemo];
}

console.log(
  `gridTravelerDP(3, 3) should be 6 and is ${gridTravelerDP(3, 3)}\n`
);

console.log(
  `gridTravelerDP(18, 18) will be quick and should be 2333606220 and is ${gridTravelerDP(
    3,
    3
  )}\n`
);
