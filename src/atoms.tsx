import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface ITodo {
	id: number;
	text: string;
}

interface IToDoState {
	[key: string]: ITodo[];
}

/*
export const localStorageEffect =
	(key: string) =>
	({ setSelf, onSet }: any) => {
		const savedValue = localStorage.getItem(key);
		// setSelf -> Callbacks to set or reset the value of the atom.
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue));
		}

		// onSet -> Subscribe to changes in the atom value.
		onSet((newValue: any, _: any, isReset: boolean) => {
			isReset
				? localStorage.removeItem(key)
				: localStorage.setItem(key, JSON.stringify(newValue));
		});
	};
	*/

const { persistAtom } = recoilPersist();

export const toDoState = atom<IToDoState>({
	key: 'toDo',
	default: {
		ToDo: [],
		Doing: [],
		Done: [],
	},
	effects_UNSTABLE: [persistAtom],
});
