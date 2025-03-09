
import { render, screen } from '@testing-library/react';
import WeatherCard from '@/components/WeatherCard';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '@/redux/weatherSlice';
import { describe, test, expect } from 'vitest';
import { WeatherData } from '@/types/weather';
const store = configureStore({
  reducer: { weather: weatherReducer },
});

const mockCity = {
  location: {
    name: 'Test City',
    country: 'Test Country',
    localtime: '2025-03-09 10:00',
  },
  current: {
    condition: {
      text: 'Sunny',
      icon: 'https://example.com/sunny.png',
    },
    temp_c: 25,
    humidity: 50,
    wind_kph: 15,
    feelslike_c: 27,
    uv: 5,
  },
  forecast: {
    forecastday: [
      {
        date: '2025-03-10',
        day: {
          maxtemp_c: 30,
          mintemp_c: 20,
          condition: {
            text: 'Partly cloudy',
            icon: 'https://example.com/partlycloudy.png',
          },
        },
      },
    ],
  },
};

describe('WeatherCard Component', () => {
  test('renders correctly with given city data', () => {
    render(
      <Provider store={store}>
        <WeatherCard city={mockCity as unknown as WeatherData} />
      </Provider>
    );

    // Verify if the city name is rendered
    expect(screen.getByText('Test City')).toBeInTheDocument();

    // Verify if the country is rendered
    expect(screen.getByText('Test Country')).toBeInTheDocument();

    // Verify if temperature is displayed
    expect(screen.getByText('25°C')).toBeInTheDocument();

    // Verify if the weather condition text is displayed
    expect(screen.getByText('Sunny')).toBeInTheDocument();
  });
});