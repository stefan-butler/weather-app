import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCity } from "../redux/weatherSlice";
import { fetchWeather } from "../api/fetchWeather";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const SearchBar = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    if (!city) return;
    try {
      const data = await fetchWeather(city);
      dispatch(addCity(data));
      setCity("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("City not found.");
    }
  };

  return (
    <>
    <div className="flex max-w-md">
      <Input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="border p-2 rounded"
      />
      <Button onClick={handleSearch} className="ml-2 p-2 rounded bg-blue-500 text-white">
        Search
      </Button>
    </div>
    {message && <p className="text-red-500">{message}</p>}
    </>
  );
};

export default SearchBar;