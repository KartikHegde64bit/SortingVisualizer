import React, { useState } from 'react';
import './UxBoard.css';
import UxCell from '../UxCell/UxCell';
import {breadthFirstSearchFor2DGrid} from 'D:/Programming/Projects/sortingviz/src/algorithms/graph/bfs.js';
import { depthFirstSearchFor2DGrid } from '../../algorithms/graph/dfs';

const UxBoard = ({ inpRowLen = 4, inpColLen = 4 }) => {
    const [inputMatrix, setInputMatrix] = useState([
        [1, 1, 0, 1],
        [0, 1, 0, 1],
        [2, 0, 1, 0],
        [8, 4, 9, 0]
    ]);
    
    const rows = inputMatrix.length;
    const cols = inputMatrix[0].length;

    const [highlightedCellGrid, setHighlightedCellGrid] = useState(
        new Array(rows).fill(0).map(() => new Array(cols).fill(0))
    );

    //setHighlightedCell(new Array(rows).fill(0).map(() => new Array(cols).fill(0)))

    const highlightCell = (row, col) => {
        const updatedHighlightedGrid = [...highlightedCellGrid];
        updatedHighlightedGrid[row][col] = true;
        setHighlightedCellGrid(updatedHighlightedGrid);
    };

    const randomiseMatrixValues = () => {
        console.log("it's running");
        const testMatrix = generateRandomMatrix(inputMatrix.length, inputMatrix[0].length);

        let newMatrix = JSON.parse(JSON.stringify(inputMatrix)); // Clone the current state

        // Update cells with a delay
        let delay = 200; // 200 ms interval

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                setTimeout(() => {
                    newMatrix[i][j] = testMatrix[i][j];
                    // Update the inputMatrix after updating all cells
                    setInputMatrix([...newMatrix]);
                }, delay * (i * cols + j)); // Calculate delay based on the cell position
            }
        }
    }

    const generateRandomMatrix = (rowLen, colLen) => {
        let returnArray = [];
        for(let i=0; i < rowLen; i++) {
            returnArray.push([]);
            for(let j=0; j < colLen; j++) {
                returnArray[i].push(Math.floor(Math.random() * 10));
            }
        }
        return returnArray;
    }

    const markRandomCell = () => {
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * cols);
        //setHighlightedCell({ rowIndex: randomRow, colIndex: randomCol });
        highlightCell(randomRow, randomCol);
        
    }

    const initiateAlgorithmOnGrid = (algorithm) => {
        switch(algorithm) {
            case "Breadth First Search":
                breadthFirstSearchFor2DGrid(inputMatrix, 0, 0, highlightCell); // since this is not a class based react component,
            break;                                                               // component scope need not be passed separately with the
                                                                               // callback function
            case "Depth First Search":
                depthFirstSearchFor2DGrid(inputMatrix, 0, 0, highlightCell);
            break;
        }
       
    }

    const [selectedOption, setSelectedOption] = useState('Breadth First Search'); 
    const options = ['Breadth First Search', 'Depth First Search', 'coming soon..'];

    const handleOptionChange = (event) => {
        const algorithm = event.target.value;
    
        // Clear the grid and initiate the algorithm only after the grid is cleared
        clearGrid(() => {
            setSelectedOption(algorithm);
            initiateAlgorithmOnGrid(algorithm);
        });
    };

    const clearGrid = () => {
        //setHighlightedCellGrid(new Array(rows).fill(0).map(() => new Array(cols).fill(0)));
        setHighlightedCellGrid(Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0)));
    }

    return ( 
        <div className='uxboard-grid-container'>
            <div className="uxboard-grid" style={{ "--rows": rows, "--cols": cols }}>
                {inputMatrix.map((row, rowIndex) => 
                    row.map((cellValue, colIndex) => (
                        <UxCell key={`${rowIndex}-${colIndex}`} rowIndex={rowIndex} colIndex={colIndex} cellValue={cellValue} isHighlighted={highlightedCellGrid[rowIndex][colIndex]} />
                    ))
                )}
            </div>
            <button className='run-button' onClick={randomiseMatrixValues}>Randomise</button>

            <button className='mark-button' onClick={markRandomCell}>Mark Random Cell</button>
            <select value={selectedOption} onChange={handleOptionChange}>
                {options.map((option) => (
                    <option key={option} value={option}>
                    {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default UxBoard;
