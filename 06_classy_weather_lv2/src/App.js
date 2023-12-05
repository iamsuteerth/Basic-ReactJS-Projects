import { useEffect, useState } from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  console.log(codePoints);
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

function Input({ location, onChangeLocation }) {
  return (
    <input
      type="text"
      placeholder="Search from location..."
      value={location}
      onChange={onChangeLocation}
    />
  );
}

function Day({ date, min, max, code, key, isToday }) {
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; {Math.ceil(max)}&deg;
      </p>
    </li>
  );
}

function Weather({ weather, location }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  return (
    <div>
      <h2>Weather {location}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            date={date}
            min={min.at(i)}
            max={max.at(i)}
            code={codes.at(i)}
            key={date}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(
    function () {
      async function fetchWeather() {
        try {
          if (location.length < 2) {
            setWeather((weather) => (weather = {}));
            return;
          }
          setIsLoading(true);
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
          );
          const geoData = await geoRes.json();
          if (!geoData.results) throw new Error("Location not found");
    
          const { latitude, longitude, timezone, name, country_code } =
            geoData.results.at(0);
          setDisplayLocation(
            (displayLocation) => `${name} ${convertToFlag(country_code)}`
          );
    
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
          );
    
          const weatherData = await weatherRes.json();
    
          setWeather((weather) => weatherData.daily);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchWeather();
      localStorage.setItem("location", location);
    },
    [location]
  );

  

  function onChangeLocation(e) {
    setLocation((location) => e.target.value);
  }

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <div>
        <Input location={location} onChangeLocation={onChangeLocation} />
      </div>
      {isLoading && <p className="loader">Loading ...</p>}
      {weather.weathercode && (
        <Weather weather={weather} location={displayLocation} />
      )}
    </div>
  );
}
