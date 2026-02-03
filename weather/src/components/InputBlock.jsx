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

	return (
		<div className="b">
			<input ref={inputRef} placeholder="City Name" />
			<button onClick={clickHandler}>Search</button>
		</div>
	)
}

export default InputBlock
