import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IconType } from '../utilities/IconType';

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (cityName) => {
    try {
      const coordinates = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=ru&format=json`
      )

      // ВАЖНО: Проверка на наличие результатов
      if (!coordinates.data.results || coordinates.data.results.length === 0) {
        throw new Error("Город не найден. Проверьте название.")
      }

      let { latitude, longitude } = coordinates.data.results[0]

      let response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,cloud_cover&timezone=auto&forecast_days=1`
      )

      let { temperature_2m, rain, cloud_cover } = response.data.hourly
      let temperature = [];
      
      const getIconType = (cloud_cover, rain) => {
        let iconType = '';
        iconType = 
          (cloud_cover > 50) ? IconType.HEAVY_CLOUD :
          (cloud_cover > 30) ? IconType.MODERATE_CLOUD : IconType.LIGHT_CLOUD;
        iconType = 
          (rain > 7.6) ? IconType.HEAVY_RAIN :
          (rain > 2.5) ? IconType.MODERATE_RAIN :
          (rain > 1) ? IconType.LIGHT_RAIN : iconType;
        return iconType
      }

      for (let i = 6; i <= 19; i += 3) {
        temperature.push({
          id: cityName + i,
          time: `${i}:00`,
          temp: temperature_2m[i],
          iconType: getIconType(cloud_cover[i], rain[i])
        })
      }

      return temperature
    } catch (e) {
      // Более понятное сообщение об ошибке
      if (e.response?.status === 404 || e.message.includes("not found")) {
        throw new Error("Город не найден. Проверьте название.")
      } else if (e.message.includes("network")) {
        throw new Error("Проблемы с сетью. Проверьте подключение.")
      } else {
        throw new Error("Ошибка при получении данных о погоде")
      }
    }
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    isLoading: false,
    error: '',
  },
  reducers: {
    // ВАЖНО: Добавьте редьюсер для очистки ошибки
    clearError: (state) => {
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload;
      state.error = ''; // Очищаем ошибку при успехе
    })
    builder.addCase(getWeather.pending, (state, action) => {
      state.isLoading = true
      state.error = ''; // Очищаем ошибку при начале нового запроса
    })
    builder.addCase(getWeather.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message || "Произошла неизвестная ошибка";
    })
  }
})

// Экспортируйте action creator для очистки ошибки
export const { clearError } = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer