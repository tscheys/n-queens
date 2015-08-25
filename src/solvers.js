/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution; 
  var board = new Board({'n': n});
  var rooks = 0;

  var helper = function(board) {
    if(rooks === n) {
      return board.rows();
    }
    for(var row = 0; row < board.rows().length; row++) {
      for(var col = 0; col < board.rows().length; col++) {
        if(!Boolean(board.rows()[row][col])) {
          board.togglePiece(row, col);
          if(board.hasAnyRooksConflicts()) {
            board.togglePiece(row,col);
          } else {
            rooks++;
            return helper(board);
          }
        } 
      }
    } 
  }

  solution = helper(board);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.traverseRows = function(board, validator){
  var solutionCount = 0;

  var helper = function (board, rowNumber) {
    for(var colNumber= 0; colNumber < board.rows().length; colNumber++) {
      board.togglePiece(rowNumber, colNumber);
      if(board[validator]()) {
        board.togglePiece(rowNumber, colNumber);
      } else {
        if(rowNumber < board.rows().length - 1) {
          var deepCopy = new Board(board.rows());
          var nextNumber = rowNumber + 1;
          helper(deepCopy, nextNumber);
        } else {
          solutionCount++;
        }
        board.togglePiece(rowNumber, colNumber);
      }
    }

  }
  helper(board, 0);
  return solutionCount;

}

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({'n': n});

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return traverseRows(board, "hasAnyRooksConflicts"); 

};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined;
  var board = new Board({'n': n})

  var helper = function (board, rowNumber) {
    for(var colNumber= 0; colNumber < board.rows().length; colNumber++) {
      board.togglePiece(rowNumber, colNumber);
      if(board.hasAnyQueensConflicts()) {
        board.togglePiece(rowNumber, colNumber);
      } else {
        if(rowNumber < board.rows().length - 1) {
          var deepCopy = new Board(board.rows());
          var nextNumber = rowNumber + 1;
          helper(deepCopy, nextNumber);
        } else {
          solution = new Board(board.rows().slice());
        }
        board.togglePiece(rowNumber, colNumber);
      }
    }
  }

  helper(board, 0);
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({'n': n});
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return traverseRows(board, "hasAnyQueensConflicts"); 
};
