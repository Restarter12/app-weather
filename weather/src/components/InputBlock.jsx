import { useRef } from 'react'
import { getWeather } from "../store/weatherSlice"
import { useDispatch } from 'react-redux'

const InputBlock = () => {
	const inputRef = useRef(null)
	const dispatch = useDispatch()

	const clickHandler = () => {
		if (inputRef.current.value.trim()) {
			dispatch(getWeather(inputRef.current.value))
		}
	}

	const keyHandler = (event) => {
		if(event.key === 'Enter'){
			clickHandler();
			inputRef.current.focus();
		}
	}

	dispatch(getWeather('Москва'))

	return (
		<div className="flex justify-around rounded-lg shadow-xl p-5 bg-white/50" onKeyDownCapture={keyHandler}>
			<input
				className='capitalize outline-none text-xl w-3/4 bg-white/50 rounded-lg px-5 py-2'

				ref={inputRef}
				placeholder="City Name"
				defaultValue="Москва"
				autoFocus
			/>
			<button
				className='bg-white/50 rounded-lg px-5 py-2 text-xl'
				onClick={clickHandler}>
				Search
			</button>
		</div>
	)
}

export default InputBlock
