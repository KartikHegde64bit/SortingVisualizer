import React from 'react'
import './UxCell.css'
const UxCell = (props) => {
	const { rowIndex, colIndex, cellValue, isHighlighted } = props;
	const cellStyle = {
		backgroundColor: isHighlighted ? 'var(--accent)' : 'var(--surface-muted)',
		border: '2px solid var(--border)',
		color: 'var(--text-primary)',
	};

	return (
		<div className='uxcell' style={cellStyle}>
			<div className='matrix-index'>({rowIndex},{colIndex})</div>
			<div className='cell-value'>{cellValue}</div>
		</div>
	)
}

export default UxCell