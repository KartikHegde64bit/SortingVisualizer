import React, { useState } from 'react';
import './UxBoard.css';
import UxCell from '../UxCell/UxCell';

const UxBoard = ({ inpRowLen = 4, inpColLen = 4 }) => {
    const [inputMatrix, setInputMatrix] = useState([
        [1, 1, 0, 1],
        [0, 1, 0, 1],
        [2, 0, 1, 0],
        [8, 4, 9, 0]
    ]);
    
    const rows = inputMatrix.length;
    const cols = inputMatrix[0].length;

    const runAlgorithm = () => {
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
    
    return ( 
        <div className='uxboard-grid-container'>
            <div className="uxboard-grid" style={{ "--rows": rows, "--cols": cols }}>
                {inputMatrix.map((row, rowIndex) => 
                    row.map((cellVal, colIndex) => (
                        <UxCell key={`${rowIndex}-${colIndex}`} rowIndex={rowIndex} colIndex={colIndex} cellValue={cellVal} />
                    ))
                )}
            </div>
            <button className='run-button' onClick={runAlgorithm}>Run</button>
        </div>
    );
};

export default UxBoard;
