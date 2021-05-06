import { useEffect, useState } from 'react';
// Styles
import './App.css';
// Library for countries
import countries from 'i18n-iso-countries';
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState(null);
  const [state, setState] = useState(null);
  // API key from openweathermap
  const apiKey = process.env.REACT_APP_API_KEY;
  // API URL from https://openweathermap.org
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}&units=imperial`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>React Weather App</h1>
      </div>

      <div className="city-search-form">
        <label for="location-name">Enter a city :</label>

        <input
          type="text"
          id="location-name"
          class="form-control"
          onChange={inputHandler}
          value={getState}
        />

        <button className="btn-search" onClick={submitHandler}>
          Search
        </button>
      </div>

      <div className="weather-results">
        {apiData.main ? (
          <div>
            <img
              src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
              alt="weather status icon"
              className="weather-icon"
            />

            <h1 className="main-temp">{apiData.main.temp}&deg; F</h1>

            <h2 className="city-name">
              <strong>City: {apiData.name}</strong>
            </h2>

            <h3 className="low-temp">
              <strong>Low: {apiData.main.temp_min}&deg; F</strong>
            </h3>
            <h3 className="high-temp">
              <strong>High: {apiData.main.temp_max}&deg; F</strong>
            </h3>

            <h3 className="weather-condition">
              <strong>{apiData.weather[0].main}</strong>
            </h3>
            <h3 className="country">
              <strong>
                {countries.getName(apiData.sys.country, 'en', {
                  select: 'official',
                })}
              </strong>
            </h3>
          </div>
        ) : (
          <h1>Enter a City</h1>
        )}
      </div>
    </div>
  );
}

export default App;
