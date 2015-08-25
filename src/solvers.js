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



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // debugger;
  var solutionCount = 0; 
  var board = new Board({'n': n});
  var rooks = 0;
  var uniqueBoards = {};

  var helper = function(board) {
    if(rooks === n) {
      uniqueBoards[JSON.stringify(board.rows())] = board.rows();
      return;        
    }
    for(var row = 0; row < board.rows().length; row++) {
      for(var col = 0; col < board.rows().length; col++) {
        if(!Boolean(board.rows()[row][col])) {
          board.togglePiece(row, col);
          rooks++;
          if(board.hasAnyRooksConflicts()) {
            board.togglePiece(row,col);
            rooks--;
          } else {
            helper(board);
            board.togglePiece(row, col);
            rooks--;
          }
        } 
      }
    }
   // return solutionCount; 
  }

  helper(board);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return Object.keys(uniqueBoards).length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
