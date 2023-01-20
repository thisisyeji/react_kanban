import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
	border-radius: 5px;
	border: 1px solid #a2c08b;
	background-color: ${(props) =>
		props.isDragging ? '#e7f5db' : props.theme.cardColor};
	box-shadow: ${(props) =>
		props.isDragging ? '5px 5px 15px rgba(0,0,0,0.2)' : 'none'};
	padding: 10px;
	margin-bottom: 5px;
`;

interface IDraggableCardProps {
	toDoId: number;
	toDoText: string;
	index: number;
}

const DraggableCard = ({ toDoId, toDoText, index }: IDraggableCardProps) => {
	return (
		<Draggable draggableId={toDoId + ''} index={index}>
			{(magic, snapshot) => (
				<Card
					isDragging={snapshot.isDragging}
					ref={magic.innerRef}
					{...magic.draggableProps}
					{...magic.dragHandleProps}>
					{toDoText}
				</Card>
			)}
		</Draggable>
	);
};

export default React.memo(DraggableCard);
