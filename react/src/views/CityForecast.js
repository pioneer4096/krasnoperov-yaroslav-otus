import React from "react";
import '../styles/CityForecast.css';
import CityWeather from '../components/CityWeather/CityWeather';
import {useState, useEffect} from 'react';
import BackToMain from '../components/BackToMain/BackToMain';
import axios from 'axios';
import env from 'react-dotenv';
import { useParams } from "react-router-dom";

function CityForecast() {
    const params = useParams();
    const [location, setLocation] = useState({});    // forecastResponse.location
    const [forecast, setForecast] = useState([]);    // forecastResponse.forecast.forecastday

    function setData(data) {
        setLocation(data?.location || {});
        setForecast(data?.forecast?.forecastday || [])
    }

    function resetData() {
        setLocation({});
        setForecast([]);
    }

    useEffect(() => {
        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${env.REACT_APP_API_KEY}&q=${params.id}&days=10&aqi=no&alerts=no`)
            .then(r => setData(r.data))
            .catch(e => {
                console.warn(e);
                resetData();
            })
    }, []);

    return (
        <div className="page-city-forecast">
            <BackToMain text="На главную"/>
            <h1>Погода в {location ? location.name : ''}</h1>
            <div className="city-forecast">
                {
                    forecast && forecast.length
                        ? forecast.map((f,index) => {
                            return <CityWeather
                                key={'city_weather_' + index}
                                index={index}
                                minTemp={f.day.mintemp_c}
                                maxTemp={f.day.maxtemp_c}
                                img={f.day.condition.icon}
                                wind={f.day.maxwind_kph}
                                precipation={f.day.totalprecip_mm}
                                date={f.date} />
                        })
                        : 'нет данных'
                }
            </div>
        </div>
    )
}

export default CityForecast;
