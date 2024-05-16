import React, { useEffect, useState } from "react";
import axios from "axios";
import './Home.css';

const Home = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!search) {
            axios.get("http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=cdaa18fd93ca3834cf015a2a3461208a")
                .then((response) => {
                    setWeatherData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching weather data:', error);
                });
        } else {
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=cdaa18fd93ca3834cf015a2a3461208a`)
                .then((response) => {
                    setWeatherData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching weather data:', error);
                    setWeatherData(null);
                });
        }
    }, [search]);

    return (
        <div className="Container">
            <div className="Title">
                <h1>Weather
                    <img src={`http://openweathermap.org/img/wn/02d.png`} alt="01d Weather Icon" />
                </h1>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div>
                {weatherData && (
                    <div>
                        <p>Name: {weatherData.name}</p>
                        <p>Temperature: {weatherData.main.temp} °C</p>
                        <p>Pressure: {weatherData.main.pressure} hPa</p>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Wind:{weatherData.wind.speed}</p>
                        <p>Description: {weatherData.weather[0].description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
