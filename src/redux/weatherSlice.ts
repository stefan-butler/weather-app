import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherData } from '@/types/weather';

interface WeatherState {
  cities: WeatherData[];
}

const initialState: WeatherState = {
  cities: [],
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<WeatherData>) => {
      state.cities.push(action.payload);
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(city => city.location.name !== action.payload);
    },
    setCities: (state, action: PayloadAction<WeatherData[]>) => {
      state.cities = action.payload;
    }
  }
});

export const { addCity, removeCity, setCities } = weatherSlice.actions;
export default weatherSlice.reducer;