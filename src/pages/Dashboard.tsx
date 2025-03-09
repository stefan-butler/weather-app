import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';

const Dashboard: React.FC = () => {
  const cities = useSelector((state: RootState) => state.weather.cities);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weather Dashboard</h1>
      <SearchBar />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.length === 0 ? (
          <p className="text-gray-600">No cities added. Please search for a city above.</p>
        ) : (
          cities.map((city) => (
            <WeatherCard key={city.location.name} city={city} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;