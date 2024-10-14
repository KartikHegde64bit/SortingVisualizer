import React from 'react'
import './UxCell.css'
const UxCell = (props) => {
	let rowIndex = props.rowIndex;
	let colIndex = props.colIndex;
	let cellValue = props.cellValue;
	return (
		<div className='uxcell'>
			<div className='matrix-index'>({rowIndex},{colIndex})</div>
			<div className='cell-value'>{cellValue}</div>
		</div>
	)
}

export default UxCell