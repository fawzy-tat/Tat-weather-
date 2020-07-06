import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";

import { fetchWeather } from "./api/fetchWeather";
import "./App.css";
import backgroundimg from "./assets/images/background.jpg";

const useStyles = makeStyles({
  mainContainer: {
    background: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.418) ), url(${backgroundimg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

const App = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);

      setWeather(data);
      setQuery("");
    }
  };

  return (
    <div className={classes.mainContainer}>
      <input
        type="text"
        className="search"
        placeholder="Type a city name ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
