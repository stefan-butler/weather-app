import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';
import { setCities } from './redux/weatherSlice'; 
import { RootState } from './redux/store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state: RootState) => state.weather.cities);

  // Load cities from localStorage on mount
  useEffect(() => {
    try {
      const savedCities = localStorage.getItem('cities');
      if (savedCities) {
        const parsedCities = JSON.parse(savedCities);
        if (Array.isArray(parsedCities) && parsedCities.length > 0) {
          dispatch(setCities(parsedCities));
        }
      }
    } catch (error) {
      console.error('Error loading cities from localStorage:', error);
      localStorage.removeItem('cities');
    }
  }, [dispatch]);

  // Save cities to localStorage when state changes
  useEffect(() => {
    try {
      if (cities && cities.length > 0) {
        localStorage.setItem('cities', JSON.stringify(cities));
      }
    } catch (error) {
      console.error('Error saving cities to localStorage:', error);
    }
  }, [cities]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Dashboard />
    </div>
  );
};

export default App;