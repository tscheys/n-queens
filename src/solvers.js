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

window.traverseRows = function(validator, n){

  var solutionCount = 0;
  var board = new Board({n:n})

  var helper = function(row){
    // stop case
    // if row === n
    if(row === n){
      //increment solutionCount
      solutionCount++;
      //return      
      return;
    }
        
    // (for loop) iterate each column
    for(var col = 0; col < n; col++){
      // toggle at [row][col]
      board.togglePiece(row, col);
      // if !validator (no conflicts)
      // if(!board[validator]()){
      if(!board[validator](row, col)){
        // recursive helper to helper(row+1)
        helper(row+1);        
      }
      board.togglePiece(row, col);  
      // untoggle at [row][col]      
    }  
  }

  helper(0);
  return solutionCount;

}

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return traverseRows("optimizedColConflict", n); 

};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //global board = initialize to empty board
  var board = new Board({n: n});
  var found = false;

  var helper = function(row){
    //base case
    //if row === n
    if(row === n){
      //return board
      found = true;
      return;
    }

    //for loop over columns
    for(var col = 0; col < n; col++){
      //toggle at [row][col]
      board.togglePiece(row, col);
      //if !validator (no conflicts)
      if(!board.hasAnyQueensConflicts()){
        //return helper(row+1)
        helper(row+1);
      }
      //untoggle at [row][col]
      if(found) {
        return;
      } else {
        board.togglePiece(row, col);
      } 
    }
  }

  board = helper(0) || board;
  return board.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return traverseRows("optimizedQueenConflicts", n); 
};
