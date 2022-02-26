import './CityWeather.css'

function CityWeather({minTemp, maxTemp, date, img, wind, precipation}) {
    return (
        <div className="city-weather">
            <div>
                {date}
            </div>
            <div>
                <img src={img} alt="Forecast" width="50" height="50"/>
            </div>
            <div>
                Температура: {minTemp}° - {maxTemp}°
            </div>
            <div>
                Ветер: {wind} км/ч
            </div>
            <div>
                Осадки: {precipation} мм
            </div>
        </div>
    )
}

export default CityWeather;
