import { Droppable } from 'react-beautiful-dnd';
import DragabbleCard from './DragabbleCard';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 300px;
	padding: 20px 10px;
	padding-top: 10px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 300px;

	display: flex;
	flex-direction: column;
`;

const Title = styled.h2`
	text-align: center;
	font-weight: 600;
	margin-bottom: 10px;
	font-size: 18px;
`;

interface IAreaProps {
	isDraggingOver: boolean;
	isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
	background-color: ${(props) =>
		props.isDraggingOver ? 'pink' : props.isDraggingFromThis ? 'red' : 'blue'};
	flex-grow: 1;
	transition: background-color 0.3s ease-in-out;
`;

interface IBoardProps {
	toDos: string[];
	boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
	return (
		<Wrapper>
			<Title>{boardId}</Title>
			<Droppable droppableId={boardId}>
				{(magic, info) => (
					<Area
						isDraggingOver={info.isDraggingOver}
						isDraggingFromThis={Boolean(info.draggingFromThisWith)}
						ref={magic.innerRef}
						{...magic.droppableProps}>
						{toDos.map((toDo, index) => (
							<DragabbleCard key={toDo} index={index} toDo={toDo} />
						))}

						{/* placeholder: 드래그 하는 동안 영역을 고정시킴 */}
						{magic.placeholder}
					</Area>
				)}
			</Droppable>
		</Wrapper>
	);
}

export default Board;