import React, { useEffect, useState } from "react";
import "./style/weather.css";
import { BsCloud as Cloud } from "react-icons/bs";
import { IoRainyOutline as Rain } from "react-icons/io5";
import { BiSun as Sun } from "react-icons/bi";
import { RiMoonClearLine as ClearSky } from "react-icons/ri";
import { WiNightAltSnowThunderstorm as Thunderstorm } from "react-icons/wi";
import { IoSnow as Snow } from "react-icons/io5";
import { RiMistLine as Mist } from "react-icons/ri";
// http://api.openweathermap.org/data/2.5/weather?q=brahmanbaria&appid=5e6ece0ef64bdaa65fb4ddcf417eb6ef
export default function Weather() {
  const [search, setSearch] = useState("London");
  const [city, setCity] = useState(null);
  const [main, setMain] = useState(<Cloud />);
  const date = new Date();
  const api_key = "5e6ece0ef64bdaa65fb4ddcf417eb6ef";
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}`
      );
      setCity(await data.json());
    };
    fetchData();
  }, [search]);

  return (
    <>
      <div className="align-xy bg-bg-primary">
        <div className="box">
          <div className="input">
            <input
              className="inputField"
              type="search"
              placeholder="City"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <div className="info">
            <div className="date-time">
              <p>{date.toLocaleTimeString() + ", " + date.toDateString()}</p>
              <span>{search}</span>
            </div>

            <div className="status">
              {!city || !search || city.cod == "404" || search.length < 3 ? (
                <p>City not found</p>
              ) : (
                <div>
                  <div className="status-div-1">
                    <div className="weather-icon">{main}</div>
                    <div className="temp">
                      {Math.round(city.main.temp - 273.15)}
                      <span>°C</span>
                    </div>
                  </div>
                  <div className="status-div-2">
                    <h3>{city.weather[0].main}</h3>
                  </div>
                  <div className="status-div-3">
                    <div>
                      <p className="title">Humidity</p>
                      <p className="value">{city.main.humidity}%</p>
                    </div>
                    <div>
                      <p className="title">Wind speed</p>
                      <p className="value">{city.wind.speed}km</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
