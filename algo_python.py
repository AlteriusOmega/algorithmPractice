# N Queen
class Solution:
    def solveNQueens(self, n):
        col = set()
        pos_diag = set()
        neg_diag = set()
        valid_boards = []
        current_board = [['.'] *n    for i in range(n)] # Makes array of arrays of .s
        print(f'initial current_board is {current_board}')
        def backtrack(r):
            if r == n: # Last row, we're done
                current_board_str = [ ''.join(row) for row in current_board]
                valid_boards.append(current_board_str)
                return
            
            for c in range(n):
                if c in col or (r+c) in pos_diag or (r-c) in neg_diag:
                    # Not valid position
                    continue
                
                col.add(c)
                pos_diag.add(r+c)
                neg_diag.add(r-c)
                current_board[r][c] = "Q"
                
                backtrack(r+1)
                
                # Reset everythning for backtracking to ry next possible valid board
                col.remove(c)
                pos_diag.remove(r+c)
                neg_diag.remove(r-c)
                current_board[r][c] = "."
                
        backtrack(0)
        return valid_boards
    
 
            
solution = Solution()
valid_boards = solution.solveNQueens(5)
for i, board in enumerate(valid_boards):
    print(f'Board {i+1}:')
    for row in board:
        print(row)
        

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Unique Binary Search Trees II
# https://leetcode.com/problems/unique-binary-search-trees-ii/description/?envType=problem-list-v2&envId=binary-tree
# Solution video https://www.youtube.com/watch?v=m907FlQa2Yc
def generateTrees(self, n: int):
    def generate(left, right):
        
        cache = {} # Not necessary, just makes it more efficient since we re-use sub-trees
        
        # # Case just have a single node. This is actually redundant because our nested for loops will handle this case so comment it out
        # if left == right:
        #     return [TreeNode(left)] # Could be right, doesn't matter since they match
        
        # Eventually the pointers will cross so left will be greater than right (which it shouldn't be in a BST)
        if left > right:
            # Have to return None here rather than [] because a node might not have left children but does have right children and 
            # we need to be able to make it to the second (inner) for loop
            return [None]
        
        if (left, right) in cache:
            return cache[(left, right)]
        
        trees = []
        # Iterate through all possible values first
        for val in range(left, right + 1): # Have to add + 1 since Python in non-inclusive
            # Need every possible combination of these sub-trees (brute force, so use nested for loops)
            # Left side is going to be everything to the left of val so left to val - 1
            for leftTree in generate(left, val - 1):
                # Right side is everything to the right of val so val + 1 to right
                for rightTree in generate(val + 1, right):
                    # Create a node 
                    node = TreeNode(val, leftTree, rightTree)
                    trees.append(node)
        cache[(left, right)] = trees
        return trees
    return generate(1, n) 