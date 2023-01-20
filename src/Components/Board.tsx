import { useForm } from 'react-hook-form';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ITodo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';
import DraggableCard from './DraggableCard';

const Wrapper = styled.div`
	width: 300px;
	min-height: 300px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	padding-top: 10px;

	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	text-align: center;
	margin-bottom: 10px;

	display: flex;
	justify-content: center;
	align-items: center;

	position: relative;

	h2 {
		max-width: 80%;
		color: #227623;
		font-weight: 600;
		font-size: 20px;
		letter-spacing: 2px;
		margin-right: 10px;
	}

	button {
		width: 20px;
		height: 20px;
		font-size: 12px;
		color: #fff;
		background-color: #a5cba7;
		border-radius: 50%;
		border: none;
		cursor: pointer;

		display: flex;
		justify-content: center;
		align-items: center;

		position: absolute;
		right: 5px;
	}
`;

interface IAreaProps {
	isDraggingFromThis: boolean;
	isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
	background-color: ${(props) =>
		props.isDraggingOver
			? '#dfe6e9'
			: props.isDraggingFromThis
			? '#ced1d3'
			: 'transparent'};
	flex-grow: 1;
	transition: background-color 0.3s ease-in-out;
	padding: 20px;
`;

const Form = styled.form`
	width: 100%;

	input {
		width: 100%;
		border: none;
		outline: none;
		padding: 10px;
	}
`;

interface IBoardProps {
	toDos: ITodo[];
	boardId: string;
	index: number;
}

interface IForm {
	toDo: string;
}

const Board = ({ toDos, boardId, index }: IBoardProps) => {
	const setToDos = useSetRecoilState(toDoState);
	const { register, setValue, handleSubmit } = useForm<IForm>();
	const onValid = ({ toDo }: IForm) => {
		const newToDo = {
			id: Date.now(),
			text: toDo,
		};
		setToDos((allBoards) => {
			return {
				...allBoards,
				[boardId]: [newToDo, ...allBoards[boardId]],
			};
		});
		setValue('toDo', '');
	};

	const deleteBoard = () => {
		setToDos((allBoards) => {
			const boardsCopy = { ...allBoards };
			delete boardsCopy[boardId];
			return {
				...boardsCopy,
			};
		});
	};

	return (
		<Draggable draggableId={boardId} index={index}>
			{(magic) => (
				<Wrapper ref={magic.innerRef} {...magic.draggableProps}>
					<Title {...magic.dragHandleProps}>
						<h2>{boardId.toUpperCase()}</h2>
						<button onClick={deleteBoard}>X</button>
					</Title>

					<Form onSubmit={handleSubmit(onValid)}>
						<input
							{...register('toDo', { required: true })}
							type='text'
							placeholder={`Add task on ${boardId} 😊`}
						/>
					</Form>
					<Droppable droppableId={boardId}>
						{(magic, info) => (
							<Area
								isDraggingOver={info.isDraggingOver}
								isDraggingFromThis={Boolean(info.draggingFromThisWith)}
								ref={magic.innerRef}
								{...magic.droppableProps}>
								{toDos.map((toDo, index) => (
									<DraggableCard
										key={toDo.id}
										index={index}
										toDoId={toDo.id}
										toDoText={toDo.text}
									/>
								))}
								{magic.placeholder}
							</Area>
						)}
					</Droppable>
				</Wrapper>
			)}
		</Draggable>
	);
};

export default Board;
