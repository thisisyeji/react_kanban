import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
	border-radius: 5px;
	background-color: ${(props) =>
		props.isDragging ? '#74b9ff' : props.theme.cardColor};
	box-shadow: ${(props) =>
		props.isDragging ? '0px 2px 15px rgba(0,0,0,0.05)' : 'none'};
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
