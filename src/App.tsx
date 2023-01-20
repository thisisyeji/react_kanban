import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
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

const InputBox = styled.form`
	position: absolute;
	top: 25px;

	input {
		width: 250px;
		height: 30px;
		font-size: 20px;
		font-style: italic;
		text-align: center;
		color: #fff;
		background-color: transparent;
		outline: none;
		border: none;
		border-bottom: 2px solid #fff;

		&::placeholder {
			color: #efefef;
			font-size: 20px;
		}
	}
`;

const Boards = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-wrap: wrap;
	width: 100%;
	gap: 10px;
	margin-top: 60px;
`;

const BoardBox = styled(Board)`
	min-width: 300px;
`;

interface ITitle {
	title: string;
}

const App = () => {
	const { register, handleSubmit, setValue } = useForm<ITitle>();
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

		// 보드 순서 변경 (보류)
	};

	const onCreate = ({ title }: ITitle) => {
		setToDos((allBoards) => {
			return {
				...allBoards,
				[title]: [],
			};
		});
		setValue('title', '');
	};

	return (
		<Wrapper>
			<InputBox onSubmit={handleSubmit(onCreate)}>
				<input
					{...register('title', { required: true })}
					type='text'
					placeholder='Add a board here! ✏️'
				/>
			</InputBox>

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='boards' type='boards'>
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
