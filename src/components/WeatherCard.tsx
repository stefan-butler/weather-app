import React from "react"
import { useDispatch } from "react-redux"
import { removeCity } from "@/redux/weatherSlice"
import Forecast from "./Forecast"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WeatherData } from "@/types/weather"

const WeatherCard: React.FC<{ city: WeatherData }> = ({ city }) => {
  const dispatch = useDispatch();
  
  const weatherCondition = city.current.condition.text;
  const weatherIcon = city.current.condition.icon;
  
  const localTime = new Date(city.location.localtime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card className="overflow-hidden border-2 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500">
      <CardHeader className=" text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">{city.location.name}</CardTitle>
            <p className="text-sm opacity-90">{city.location.country}</p>
            <p className="text-sm mt-1">{localTime}</p>
          </div>
          <div className="flex flex-col items-center">
            <img 
              src={weatherIcon} 
              alt={weatherCondition} 
              className="w-16 h-16 object-contain"
            />
            <span className="text-sm text-center">{weatherCondition}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between gap-3 mb-4">
          <div className="text-center p-2 bg-gray-100 rounded-lg flex-grow">
            <p className="text-2xl font-bold">{city.current.temp_c}°C</p>
            <p className="text-xs text-gray-500">Temperature</p>
          </div>
          <div className="text-center p-2 bg-gray-100 rounded-lg flex-grow">
            <p className="text-2xl font-bold">{city.current.humidity}%</p>
            <p className="text-xs text-gray-500">Humidity</p>
          </div>
          <div className="text-center p-2 bg-gray-100 rounded-lg flex-grow">
            <p className="text-2xl font-bold">{city.current.wind_kph}</p>
            <p className="text-xs text-gray-500">Wind (km/h)</p>
          </div>
        </div>
        
        <div className="mt-2 pt-2 border-t">
          <h3 className="font-semibold mb-2 text-white">5-Day Forecast</h3>
          <div className="bg-gray-50 rounded-lg p-2">
            <Forecast city={city} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <div className="text-xs text-gray-100">
          <p>Feels like: {city.current.feelslike_c}°C</p>
          <p>UV Index: {city.current.uv}</p>
        </div>
        <Button 
          className="bg-gray-100 text-black hover:text-white" 
          size="sm"
          onClick={() => dispatch(removeCity(city.location.name))}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WeatherCard;
