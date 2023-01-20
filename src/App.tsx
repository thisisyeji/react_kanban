import { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './Components/Board';
import DeleteBox from './Components/DeleteBox';

const Wrapper = styled.div`
	min-height: 100vh;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px 0;
`;

const InputBox = styled.div`
	position: absolute;
	top: 20px;
`;

const Boards = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-wrap: wrap;
	width: 100%;
	gap: 10px;
`;

const BoardBox = styled(Board)`
	min-width: 300px;
`;

const App = () => {
	const [name, setName] = useState('');
	const [toDos, setToDos] = useRecoilState(toDoState);

	const onDragEnd = (info: DropResult) => {
		console.log(info);
		const { destination, source } = info;
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
		<Wrapper>
			<InputBox>
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
			</InputBox>

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId={'boards'} type='boards'>
					{(magic) => (
						<Boards ref={magic.innerRef} {...magic.droppableProps}>
							{Object.keys(toDos).map((boardId, index) => (
								<BoardBox
									key={boardId}
									boardId={boardId}
									toDos={toDos[boardId]}
									index={index}
								/>
							))}
						</Boards>
					)}
				</Droppable>

				<DeleteBox boardId='trashBin' />
			</DragDropContext>
		</Wrapper>
	);
};

export default App;
