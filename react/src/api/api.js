import axios from 'axios';
import env from 'react-dotenv';

const ENDPOINT = 'http://api.weatherapi.com/v1';
const API_KEY = env.REACT_APP_API_KEY;

export function getCurrentWeather(geoName) {
    return axios.get(`${ENDPOINT}/current.json?key=${API_KEY}&q=${geoName}&aqi=no`)
}

export function searchAutocomplete(query) {
    return axios.get(`${ENDPOINT}/search.json?key=${API_KEY}&q=${query}&lang=ru`)
}

export function getForecast(geoName) {
    return axios.get(`${ENDPOINT}/forecast.json?key=${API_KEY}&q=${geoName}&days=10&aqi=no&alerts=no`)
}
