import CityWeather from '../components/CityWeather/CityWeather';
import {forecastResponse} from '../data/response.js';
import {useState} from 'react';
import BackToMain from '../components/BackToMain/BackToMain';

function City() {
    const [location] = useState(forecastResponse.location)
    const [forecast] = useState(forecastResponse.forecast.forecastday)

    return (
        <>
            <BackToMain text="На главную"/>
            <h1>Погода в {location ? location.name : ''}</h1>
            <div className="city-forecast">
                {
                    forecast && forecast.length
                        ? forecast.map((f,index) => {
                            return <CityWeather
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
        </>
    )
}

export default City;
