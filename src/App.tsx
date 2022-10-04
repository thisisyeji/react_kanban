import { useRecoilState } from 'recoil';
import { minutesState, hourSelector } from './atoms';

function App() {
	const [Minutes, setMinutes] = useRecoilState(minutesState);
	const [hours, setHours] = useRecoilState(hourSelector);
	const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
		setMinutes(+event.currentTarget.value);
	};
	const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
		setHours(+event.currentTarget.value);
	};
	return (
		<div>
			<input
				value={Minutes}
				onChange={onMinutesChange}
				type='number'
				placeholder='Minutes'
			/>
			<input
				value={hours}
				onChange={onHoursChange}
				type='number'
				placeholder='Hours'
			/>
		</div>
	);
}

export default App;
