import React, { useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "894a2e7aa7f46eeca5d8778f6faa5a5b";

  const iconMapping = {
    Clear: "CLEAR_DAY",
    Clouds: "CLOUDY",
    Rain: "RAIN",
    Drizzle: "SLEET",
    Snow: "SNOW",
    Thunderstorm: "WIND",
    Mist: "FOG",
    Smoke: "FOG",
    Haze: "FOG",
    Dust: "FOG",
    Fog: "FOG",
    Sand: "FOG",
    Ash: "FOG",
    Squall: "WIND",
    Tornado: "WIND",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setWeatherData(null);
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = response.data;
      setWeatherData({
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        icon: iconMapping[data.weather[0].main] || "CLEAR_DAY",
      });
    } catch (err) {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Weather Search Engine</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: "8px", marginRight: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>
          Search
        </button>
      </form>

      {loading && <p style={{ marginTop: "20px" }}>Fetching weather...</p>}

      {weatherData && !loading && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Temperature:</strong> {weatherData.temperature}℃
          </p>
          <p>
            <strong>Description:</strong> {weatherData.description}
          </p>
          <p>
            <strong>Humidity:</strong> {weatherData.humidity}%
          </p>
          <p>
            <strong>Wind:</strong> {weatherData.wind} m/s
          </p>

          <ReactAnimatedWeather
            icon={weatherData.icon}
            color="goldenrod"
            size={80}
            animate={true}
          />
        </div>
      )}

      {error && !loading && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
