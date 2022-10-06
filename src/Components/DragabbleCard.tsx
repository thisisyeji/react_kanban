import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
	border-radius: 5px;
	padding: 10px 10px;
	margin-bottom: 5px;
	background-color: ${(props) =>
		props.isDragging ? '#e4f2ff' : props.theme.cardColor};
	box-shadow: ${(props) =>
		props.isDragging ? '0px 2px 5px rgba(0, 0, 0, 0.05)' : 'none'};
`;

interface IDraggableCardProps {
	toDoId: number;
	toDoText: string;
	index: number;
}

function DragabbleCard({ toDoId, toDoText, index }: IDraggableCardProps) {
	return (
		// dnd에서는 key와 draggableId는 같아야함
		<Draggable draggableId={toDoId + ''} index={index}>
			{(magic, snapshot) => (
				<Card
					isDragging={snapshot.isDragging}
					ref={magic.innerRef}
					{...magic.dragHandleProps}
					{...magic.draggableProps}>
					{toDoText}
				</Card>
			)}
		</Draggable>
	);
}

export default React.memo(DragabbleCard);
