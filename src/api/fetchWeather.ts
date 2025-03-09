import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

export const fetchWeather = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch weather data.');
  }
};