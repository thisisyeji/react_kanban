import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Wrapper = styled.div`
	border-radius: 5px;
	font-size: 24px;
	color: #fff;
	transition: 0.5s;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	right: 30px;
	top: 30px;

	&:hover {
		font-size: 28px;
		transform: rotate(360deg);
	}
`;

interface IBoardProps {
	boardId: string;
}

const DeleteBox = ({ boardId }: IBoardProps) => {
	return (
		<Droppable droppableId={boardId}>
			{(magic) => (
				<Wrapper ref={magic.innerRef} {...magic.droppableProps}>
					<FontAwesomeIcon icon={faTrashCan} />
				</Wrapper>
			)}
		</Droppable>
	);
};

export default DeleteBox;
