import React from 'react'
import './UxCell.css'
const UxCell = (props) => {
	let rowIndex = props.rowIndex;
	let colIndex = props.colIndex;
	let cellValue = props.cellValue;
	let isHighlighted = props.isHighlighted;
	let cellStyle = {
		backgroundColor: isHighlighted ? "red": "#eae4e4",
		border: '5px solid #3a2b2b',
		position: 'relative',
		width: '70px',
		height: '70px',
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center'
	};

	return (
		<div className='uxcell' style={cellStyle}>
			<div className='matrix-index'>({rowIndex},{colIndex})</div>
			<div className='cell-value'>{cellValue}</div>
		</div>
	)
}

export default UxCell