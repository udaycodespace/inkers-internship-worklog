import { useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;

    try {
      setError("");

      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError("Unable to find weather for this city");
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>
            {weather.location.name}, {weather.location.country}
          </h2>

          <img
            src={weather.current.condition.icon}
            alt="weather icon"
          />

          <p className="temp">{weather.current.temp_c}°C</p>
          <p className="condition">
            {weather.current.condition.text}
          </p>

          <div className="details">
            <span>Humidity: {weather.current.humidity}%</span>
            <span>Wind: {weather.current.wind_kph} km/h</span>
          </div>
        </div>
      )}
    </div>
  );
}
