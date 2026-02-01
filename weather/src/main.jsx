import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"

import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { weatherReducer } from "./store/WeatherSlice"

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
