import { useRef } from 'react'
import './App.css'
import { getWeather } from './store/weatherSlice'
import { useDispatch } from 'react-redux'



function App() {

  let inputRef = useRef(null)
  const dispatch = useDispatch()
  const clickHandler = () => {
    dispatch(getWeather(inputRef.current.value))
  }

  return (
    <div>
      <input ref={inputRef} placeholder='City Name' />
      <button onClick={clickHandler}>Search</button>
    </div>
  )
}

export default App
