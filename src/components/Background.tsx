import React from "react";
import { useDrop } from 'react-dnd';
  
const style: React.CSSProperties = {
    backgroundColor: "yellow", width: "200px", height: "200px"
}

export interface BgProps {
	accept: string[]
	lastDroppedItem?: any
	onDrop: (item: any) => void
}

const Background: React.FC<BgProps> = ({
	accept,
	lastDroppedItem,
	onDrop,
}) => {
	const [{ isOver, canDrop }, drop] = useDrop({
		accept,
		drop: onDrop,
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	})

	const isActive = isOver && canDrop
	let backgroundColor = '#222'
	if (isActive) {
		backgroundColor = 'darkgreen'
	} else if (canDrop) {
		backgroundColor = 'darkkhaki'
	}

	return (
		<div ref={drop} style={{ ...style, backgroundColor }}>
			{isActive
				? 'Release to drop'
				: `This dustbin accepts: ${accept.join(', ')}`}

			{lastDroppedItem && (
				<p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
			)}
		</div>
	)
}

export default Background;