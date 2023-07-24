import React, { useEffect } from 'react';
import './App.css';

function App() {
  const API_KEY = "";
  const [data, setData] = React.useState(null);
  const [location, setLocation] = React.useState('');
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
        const responseData = await response.json();
        setData(responseData);
      } catch (e) {
        setError('error: ', e);
      }
    }
    if (location) {
      fetchData();
    }
  }, [location]);

  const handleChange = (e) => {
    setLocation(e.target.value);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
        <div>
          <p>{error}</p>
          <input type="text" value={location} onChange={handleChange} placeholder="Enter your location" />
          {data ? (
            <div>
              <h2>{data.name}</h2>
              <p>Temperature: {data?.main?.temp}°C</p>
              <p>Humidity: {data?.main?.humidity}%</p>
              <p>Description: {data?.weather?.[0]?.description}</p>
            </div>
            ) : (
            <p>No weather data available!</p>
            )}
        </div>
        <footer className="App-footer">
        <p>Powered by <a target="_blank" href="https://openweathermap.org">openweathermap.org</a></p>
        </footer>
    </div>
  );
}

export default App;
