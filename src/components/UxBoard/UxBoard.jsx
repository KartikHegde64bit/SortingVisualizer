import React, { useMemo, useState } from 'react';
import './UxBoard.css';
import UxCell from '../UxCell/UxCell';
import { breadthFirstSearchFor2DGrid } from '../../algorithms/graph/bfs';
import { depthFirstSearchFor2DGrid } from '../../algorithms/graph/dfs';
import { useNavigate } from 'react-router-dom';

const UxBoard = ({ inpRowLen = 4, inpColLen = 4 }) => {
    const navigate = useNavigate();
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

    const [speed, setSpeed] = useState(200);
    const delay = useMemo(() => speed, [speed]);

    //setHighlightedCell(new Array(rows).fill(0).map(() => new Array(cols).fill(0)))

    const highlightCell = (row, col) => {
        const updatedHighlightedGrid = [...highlightedCellGrid];
        updatedHighlightedGrid[row][col] = true;
        setHighlightedCellGrid(updatedHighlightedGrid);
    };

    const randomiseMatrixValues = () => {
        const testMatrix = generateRandomMatrix(inputMatrix.length, inputMatrix[0].length);

        let newMatrix = JSON.parse(JSON.stringify(inputMatrix)); // Clone the current state

        // Update cells with a delay
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
        highlightCell(randomRow, randomCol);
    }

    const initiateAlgorithmOnGrid = (algorithm) => {
        switch(algorithm) {
            case "Breadth First Search":
                breadthFirstSearchFor2DGrid(inputMatrix, 0, 0, highlightCell, delay);
                break;
            case "Depth First Search":
                depthFirstSearchFor2DGrid(inputMatrix, 0, 0, highlightCell, delay);
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
        <div className='uxboard-wrapper'>
            <div className='uxboard-header'>
                <div>
                    <div className='uxboard-title'>Graph Traversal Visualizer</div>
                    <div className='uxboard-subtitle'>Currently showing: {selectedOption}</div>
                </div>
                <button className='home-button' onClick={() => navigate('/')}>Home</button>
            </div>

            <div className='uxboard-controls'>
                <div className='control-group'>
                    <label>Algorithm</label>
                    <select value={selectedOption} onChange={handleOptionChange}>
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='control-group'>
                    <label>Animation speed ({delay} ms)</label>
                    <input
                        type='range'
                        min='50'
                        max='800'
                        step='50'
                        value={speed}
                        onChange={(e) => setSpeed(parseInt(e.target.value, 10))}
                    />
                </div>
                <div className='control-actions'>
                    <button className='primary' onClick={randomiseMatrixValues}>Randomize Grid</button>
                    <button className='secondary' onClick={markRandomCell}>Mark Random Cell</button>
                    <button className='secondary' onClick={() => clearGrid()}>Clear Highlights</button>
                </div>
            </div>

            <div className='uxboard-grid-container'>
                <div className="uxboard-grid" style={{ "--rows": rows, "--cols": cols }}>
                    {inputMatrix.map((row, rowIndex) => 
                        row.map((cellValue, colIndex) => (
                            <UxCell key={`${rowIndex}-${colIndex}`} rowIndex={rowIndex} colIndex={colIndex} cellValue={cellValue} isHighlighted={highlightedCellGrid[rowIndex][colIndex]} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default UxBoard;
