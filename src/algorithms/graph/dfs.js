
export async function depthFirstSearchFor2DGrid(grid, startRow, startCol, callBackFunction){
    const rows = grid.length;
    const cols = grid[0].length;

    // Directions for movement: up, down, left, right
    const directions = [
        [-1, 0], // up
        [1, 0],  // down
        [0, -1], // left
        [0, 1]   // right
    ];

    let visited = new Set();

    const directionValidator = (row, col) => {
        return row >= 0 && row < rows && col >= 0 && col < cols;
    }
    
    dfsWithDelay(startRow, startCol, directions, directionValidator, visited, callBackFunction);
}

export async function dfsWithDelay(row, col, directions, directionValidator, visited, callBackFunction) {

    if (!directionValidator(row, col) || visited.has(`${row},${col}`)) {
      return;
    }
  
    visited.add(`${row},${col}`);
    callBackFunction(row, col);
  
    for (const [dRow, dCol] of directions) {
      await dfsWithDelay(
        row + dRow,
        col + dCol,
        directions,
        directionValidator,
        visited,
        callBackFunction
      );
      // Await the delay after each recursive call
      await new Promise(resolve => setTimeout(resolve, 500));
    }
}