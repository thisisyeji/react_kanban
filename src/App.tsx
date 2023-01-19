import { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './Components/Board';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
`;

const Boards = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	gap: 10px;
`;

const DeleteBox = styled.div`
	width: 100px;
	height: 50px;
	background-color: white;
	border-radius: 5px;
	font-size: 24px;
	position: absolute;
	bottom: 20px;
	right: 20px;
	transition: 0.5s;

	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
		font-size: 28px;
	}
`;

const App = () => {
	const [name, setName] = useState('');
	const [toDos, setToDos] = useRecoilState(toDoState);
	const onDragEnd = (info: DropResult) => {
		console.log(info);
		const { destination, draggableId, source } = info;
		if (!destination) return;
		if (destination?.droppableId === source.droppableId) {
			// same board movement
			setToDos((allBoards) => {
				const boardCopy = [...allBoards[source.droppableId]];
				const taskObj = boardCopy[source.index];
				boardCopy.splice(source.index, 1);
				boardCopy.splice(destination?.index, 0, taskObj);
				return {
					...allBoards,
					[source.droppableId]: boardCopy,
				};
			});
		}
		if (
			destination.droppableId !== source.droppableId &&
			destination.droppableId !== 'trashBin'
		) {
			// cross board movement
			setToDos((allBoards) => {
				const sourceBoard = [...allBoards[source.droppableId]];
				const taskObj = sourceBoard[source.index];
				const destinationBoard = [...allBoards[destination.droppableId]];
				sourceBoard.splice(source.index, 1);
				destinationBoard.splice(destination?.index, 0, taskObj);
				return {
					...allBoards,
					[source.droppableId]: sourceBoard,
					[destination.droppableId]: destinationBoard,
				};
			});
		}
		if (destination.droppableId === 'trashBin') {
			// delete toDo
			setToDos((allBoards) => {
				const sourceBoard = [...allBoards[source.droppableId]];
				sourceBoard.splice(source.index, 1);
				return {
					...allBoards,
					[source.droppableId]: sourceBoard,
				};
			});
		}
	};

	const onChange = (e: React.FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		setName(value);
	};

	const createNewBoard = () => {
		if (!name) return alert('Please write a name of board.');
		setToDos((allBoards) => {
			return {
				...allBoards,
				[name]: [],
			};
		});
		setName('');
	};

	return (
		<>
			<div>
				<input
					type='text'
					placeholder='Please write a name of board'
					onChange={onChange}
					value={name}
					onKeyUp={(e) => {
						if (e.key === 'Enter') createNewBoard();
					}}
				/>
				<button onClick={createNewBoard}>Create</button>
			</div>
			<DragDropContext onDragEnd={onDragEnd}>
				<Wrapper>
					<Boards>
						{Object.keys(toDos).map((boardId) => (
							<Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
						))}
					</Boards>
				</Wrapper>
				<Droppable droppableId='trashBin'>
					{(magic) => (
						<DeleteBox ref={magic.innerRef} {...magic.droppableProps}>
							<FontAwesomeIcon icon={faTrashCan} />
						</DeleteBox>
					)}
				</Droppable>
			</DragDropContext>
		</>
	);
};

export default App;
