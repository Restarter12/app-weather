import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getWeather = createAsyncThunk(
	'weather/getWeather',
	async (cityName) => {

	try {	const coordinates = await axios.get(
			`/api/v1/search?name=${cityName}&count=1&language=ru&format=json`
		)

		let { latitude, longitude } = coordinates.data.results[0]




		let response = await axios.get(
			`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`
		) 

		let { temperature_2m } = response.data.hourly
		let temperature = []

		for (let i = 6; i <= 19; i += 3) {
			temperature.push({
				time: `${i}:00`,
				temp: temperature_2m[i],
			})
		}

		return temperature; 
	}catch(e) {
		throw new Error("Check the city name is correct")
	}
	}
)

const weatherSlice = createSlice({
	name: 'weather',
	initialState: {
		data: null,
	},
	extraReducers: (builder) => {
		builder.addCase(getWeather.fulfilled, (state, action) => {
			console.log("End loading");
			console.log(action.payload);
		});
		builder.addCase(getWeather.pending, (state, action) => {
			console.log("Start loading");
			
		})
		builder.addCase(getWeather.rejected, (state, action) => {
			console.log("End loading");
			console.log(action.error.message);
			
		})
	}
})

export const weatherReducer = weatherSlice.reducer
