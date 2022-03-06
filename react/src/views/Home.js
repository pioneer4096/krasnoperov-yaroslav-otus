import '../styles/Home.css';
import {useLocalStorage} from '../utils/use.local.storage';
import CitiesAutocomplete from '../components/CitiesAutocomplete/CitiesAutocomplete';
import MyCitiesList from '../components/MyCitiesList/MyCitiesList';
import CityWeatherUpdater from '../utils/CityWeatherUpdater';
import {useEffect} from 'react';
import {CITY_DONE} from '../utils/city.states';

function Home() {
    const [citiesList, updateCitiesList] = useLocalStorage('cities-list', []);
    const weatherUpdater = new CityWeatherUpdater(applyCityWeather);

    function applyCityWeather(weatherData) {
        const cityIndex = citiesList.findIndex(city => city.name === weatherData.location.name);
        if(cityIndex !== -1) {
            const cityContent = citiesList[cityIndex];
            const newList = [...citiesList];
            newList[cityIndex] = {
                ...cityContent,
                temperature: weatherData.current.temp_c,
                image: weatherData.current.condition.icon,
                updated: Date.now(),
                state: CITY_DONE
            };
            updateCitiesList(newList);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            weatherUpdater.update(citiesList)
        }, 10000);

        return () => clearInterval(interval);
    }, [citiesList]);


    return (
        <div className="page-home">
            <CitiesAutocomplete
                citiesList={citiesList}
                updateCitiesList={updateCitiesList}
            />

            <br/><br/>

            <MyCitiesList
                citiesList={citiesList}
                updateCitiesList={updateCitiesList}
            />
        </div>
    );
}

export default Home;
