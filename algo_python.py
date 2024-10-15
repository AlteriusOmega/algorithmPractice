# N Queen
class Solution:
  def solveNQueens(self, n):
    col = set()
    pos_diag = set()
    neg_diag = set()
    valid_boards = []
    current_board = [['.'] *n  for i in range(n)] # Makes array of arrays of .s
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
      
queenSolution = Solution()
valid_boards = queenSolution.solveNQueens(5)
for i, board in enumerate(valid_boards):
  print(f'Board {i+1}:')
  for row in board:
    print(row)