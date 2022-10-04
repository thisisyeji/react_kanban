import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 480px;
	width: 100%;
	height: 100vh;
	margin: 0 auto;
`;

const Boards = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(3, 1fr);
`;

const Board = styled.div`
	padding: 20px 10px;
	padding-top: 30px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 200px;
`;

const Card = styled.div`
	border-radius: 5px;
	padding: 10px 10px;
	margin-bottom: 5px;
	background-color: ${(props) => props.theme.cardColor};
`;

const toDos = ['a', 'b', 'c', 'd', 'e', 'f'];

function App() {
	const onDragEnd = () => {};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					<Droppable droppableId='one'>
						{(magic) => (
							<Board ref={magic.innerRef} {...magic.droppableProps}>
								{toDos.map((toDo, index) => (
									<Draggable draggableId={toDo} index={index}>
										{(magic) => (
											<Card
												ref={magic.innerRef}
												{...magic.dragHandleProps}
												{...magic.draggableProps}>
												{toDo}
											</Card>
										)}
									</Draggable>
								))}
								{/* placeholder: 드래그 하는 동안 영역을 고정시킴 */}
								{magic.placeholder}
							</Board>
						)}
					</Droppable>
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
}

export default App;
