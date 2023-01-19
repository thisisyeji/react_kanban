import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Wrapper = styled.div`
	border-radius: 5px;
	font-size: 24px;
	transition: 0.5s;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	right: 30px;
	top: 20px;

	&:hover {
		font-size: 28px;
	}
`;

interface IBoardProps {
	boardId: string;
}

const DeleteBox = ({ boardId }: IBoardProps) => {
	return (
		<Droppable droppableId={boardId} type='trashBin'>
			{(magic) => (
				<Wrapper ref={magic.innerRef} {...magic.droppableProps}>
					<FontAwesomeIcon icon={faTrashCan} />
					{/* {magic.placeholder} */}
				</Wrapper>
			)}
		</Droppable>
	);
};

export default DeleteBox;
