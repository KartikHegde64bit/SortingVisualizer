// this will be the implementation of bfs algorithm in graph

/**
    @param adjacenyMatrix
    @param startNode
*/
const breadthFirstSearch = (adjacenyMatrix, startNode) => {
    let queue = [startNode],
        visited = new Set(),  
        result = [];
    visited.add(startNode);

    while(queue.length > 1) {
        let currentNode = queue.shift();
        result.push(currentNode);

        // iterate through the neighbours
        for(let currentNeighbour of adjacenyMatrix[currentNode]) {
            if(!visited.has(currentNeighbour)) {
                queue.push(currentNeighbour);
                visited.add(currentNeighbour);
            }
        }
    }

}

/**
 * 
 * @param {*} grid 
 * @param {*} startRow 
 * @param {*} startCol 
 * @returns 
 */
let breadthFirstSearchFor2DGrid = (grid, startRow, startCol) => {
    // Grid dimensions
    const rows = grid.length;
    const cols = grid[0].length;

    // Directions for movement: up, down, left, right
    const directions = [
        [-1, 0], // up
        [1, 0],  // down
        [0, -1], // left
        [0, 1]   // right
    ];

    const directionValidator = (row, col) => {
        return newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols;
    }

    // Queue to manage the BFS traversal
    let queue = [[startRow, startCol]];

    // Set to keep track of visited cells
    let visited = new Set();
    visited.add(`${startRow},${startCol}`);

    // Result array to store traversal order
    let result = [];

    while (queue.length > 0) {
        // Dequeue the front cell
        const [currentRow, currentCol] = queue.shift();
        result.push([currentRow, currentCol]);

        // Explore all possible directions
        for (const [dRow, dCol] of directions) {
            const newRow = currentRow + dRow;
            const newCol = currentCol + dCol;

            // Check if the new cell is within bounds ? and not visited ?
            if ( directionValidator(newRow, newCol) &&
                !visited.has(`${newRow},${newCol}`) &&
                grid[newRow][newCol] === 1 // Check if the cell is valid (e.g., `1` for traversable cells)
            ) {
                queue.push([newRow, newCol]);
                visited.add(`${newRow},${newCol}`);
            }
        }
    }

    return result;
}

