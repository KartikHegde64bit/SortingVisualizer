import React, { useMemo, useState } from 'react';
import './UxBoard.css';
import UxCell from '../UxCell/UxCell';
import { breadthFirstSearchFor2DGrid } from '../../algorithms/graph/bfs';
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
    const [startCell, setStartCell] = useState({ row: 0, col: 0 });

    const [speed, setSpeed] = useState(200);
    const [rowInput, setRowInput] = useState(inpRowLen);
    const [colInput, setColInput] = useState(inpColLen);
    const delay = useMemo(() => speed, [speed]);
    const cellSize = useMemo(() => {
        const largestSide = Math.max(rows, cols);
        return Math.max(56, Math.floor(440 / largestSide));
    }, [rows, cols]);

    //setHighlightedCell(new Array(rows).fill(0).map(() => new Array(cols).fill(0)))

    const highlightCell = (row, col) => {
        setHighlightedCellGrid((prevGrid) => {
            const updatedHighlightedGrid = prevGrid.map((gridRow) => [...gridRow]);
            updatedHighlightedGrid[row][col] = true;
            return updatedHighlightedGrid;
        });
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
        setStartCell({ row: randomRow, col: randomCol });
        highlightCell(randomRow, randomCol);
    }

    const initiateAlgorithmOnGrid = (algorithm) => {
        const { row, col } = startCell;
        switch(algorithm) {
            case "Breadth First Search":
                breadthFirstSearchFor2DGrid(inputMatrix, row, col, highlightCell, delay);
                break;
            case "Depth First Search":
                depthFirstSearchFor2DGrid(inputMatrix, row, col, highlightCell, delay);
                break;
        }
       
    }

    const [selectedOption, setSelectedOption] = useState('Breadth First Search'); 
    const options = ['Breadth First Search', 'Depth First Search'];

    const handleOptionChange = (event) => {
        const algorithm = event.target.value;

        clearGrid();
        setSelectedOption(algorithm);
    };

    const clearGrid = () => {
        //setHighlightedCellGrid(new Array(rows).fill(0).map(() => new Array(cols).fill(0)));
        setHighlightedCellGrid(Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0)));
    }

    const applyGridSize = () => {
        const nextRows = Math.min(8, Math.max(2, parseInt(rowInput, 10) || 4));
        const nextCols = Math.min(8, Math.max(2, parseInt(colInput, 10) || 4));

        const nextMatrix = generateRandomMatrix(nextRows, nextCols);
        setInputMatrix(nextMatrix);
        setHighlightedCellGrid(Array.from({ length: nextRows }, () => Array.from({ length: nextCols }, () => 0)));
        setStartCell({ row: 0, col: 0 });
        setRowInput(nextRows);
        setColInput(nextCols);
    };

    return ( 
        <div className='uxboard-wrapper'>
            <div className='uxboard-layout'>
                <div className='uxboard-left'>
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
                        <div className='control-group grid-customize'>
                            <label>Customize grid size</label>
                            <div className='grid-size-inputs'>
                                <div>
                                    <span>Rows</span>
                                    <input
                                        type='number'
                                        min='2'
                                        max='8'
                                        value={rowInput}
                                        onChange={(e) => setRowInput(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <span>Columns</span>
                                    <input
                                        type='number'
                                        min='2'
                                        max='8'
                                        value={colInput}
                                        onChange={(e) => setColInput(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className='secondary apply-grid' onClick={applyGridSize}>Apply Grid Size</button>
                        </div>
                        <div className='control-actions'>
                            <button className='primary' onClick={randomiseMatrixValues}>Randomize Grid</button>
                            <button className='secondary' onClick={markRandomCell}>Mark Random Cell</button>
                            <button className='secondary' onClick={() => clearGrid()}>Clear Highlights</button>
                            <button className='primary outline' onClick={() => initiateAlgorithmOnGrid(selectedOption)}>Start</button>
                        </div>
                    </div>
                </div>

                <div className='uxboard-right'>
                    <div className='uxboard-grid-container'>
                        <div className="uxboard-grid" style={{ "--rows": rows, "--cols": cols, "--cell-size": `${cellSize}px` }}>
                            {inputMatrix.map((row, rowIndex) => 
                                row.map((cellValue, colIndex) => (
                                    <UxCell key={`${rowIndex}-${colIndex}`} rowIndex={rowIndex} colIndex={colIndex} cellValue={cellValue} isHighlighted={highlightedCellGrid[rowIndex][colIndex]} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UxBoard;
