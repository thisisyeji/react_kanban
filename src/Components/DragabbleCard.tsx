import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
	border-radius: 5px;
	padding: 10px 10px;
	margin-bottom: 5px;
	background-color: ${(props) => props.theme.cardColor};
`;

interface IDraggableCardProps {
	toDo: string;
	index: number;
}

function DragabbleCard({ toDo, index }: IDraggableCardProps) {
	return (
		// dnd에서는 key와 draggableId는 같아야함
		<Draggable key={toDo} draggableId={toDo} index={index}>
			{(magic) => (
				<Card
					ref={magic.innerRef}
					{...magic.dragHandleProps}
					{...magic.draggableProps}>
					{toDo}
				</Card>
			)}
		</Draggable>
	);
}

export default React.memo(DragabbleCard);
