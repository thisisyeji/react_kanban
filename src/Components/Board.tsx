import { useForm } from 'react-hook-form';
import { Droppable } from 'react-beautiful-dnd';
import DragabbleCard from './DragabbleCard';
import styled from 'styled-components';
import { ITodo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

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
		margin-right: 10px;
		font-weight: 600;
		font-size: 18px;
	}

	button {
		width: 20px;
		height: 20px;
		font-size: 12px;
		color: #555;
		border-radius: 50%;
		border: 1px solid #555;

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
			? '#b2bec3'
			: 'transparent'};
	flex-grow: 1;
	transition: background-color 0.3s ease-in-out;
	padding: 20px;
`;

const Form = styled.form`
	width: 100%;

	input {
		width: 100%;
	}
`;

interface IBoardProps {
	toDos: ITodo[];
	boardId: string;
}

interface IForm {
	toDo: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
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
		<Wrapper>
			<Title>
				<h2>{boardId}</h2>
				<button onClick={deleteBoard}>X</button>
			</Title>

			<Form onSubmit={handleSubmit(onValid)}>
				<input
					{...register('toDo', { required: true })}
					type='text'
					placeholder={`Add task on ${boardId}`}
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
							<DragabbleCard
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
	);
};

export default Board;
