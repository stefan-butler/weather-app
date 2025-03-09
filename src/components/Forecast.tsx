import React from 'react';
import { WeatherData, ForecastDay } from '@/types/weather';

const Forecast: React.FC<{city: WeatherData}> = ({city}) => {

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
    });
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      {city.forecast.forecastday.map((day: ForecastDay) => (
        <div 
          key={day.date} 
          className="flex flex-col items-center text-center p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <p className="text-xs font-medium mb-1">{formatDate(day.date)}</p>
          {day.day.condition && (
            <img 
              src={day.day.condition.icon} 
              alt={day.day.condition.text} 
              className="w-10 h-10 object-contain my-1"
            />
          )}
          <p className="text-sm font-bold">{day.day.avgtemp_c}°C</p>
          <p className="text-xs text-gray-500">{day.day.avghumidity}%</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;