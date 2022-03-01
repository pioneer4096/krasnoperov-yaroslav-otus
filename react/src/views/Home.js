import '../styles/Home.css';
import {useLocalStorage} from '../utils/use.local.storage';
import CitiesAutocomplete from '../components/CitiesAutocomplete/CitiesAutocomplete';
import MyCitiesList from '../components/MyCitiesList/MyCitiesList';
import ListWeatherUpdater from '../utils/ListWeatherUpdater';

function Home() {
    const [citiesList, updateCitiesList] = useLocalStorage('added-cities', []);
    const weatherUpdater = new ListWeatherUpdater();

    useEffect(() => {
        const interval = setInterval(() => {
            weatherUpdater.update()
        }, 10000);

        return () => clearInterval(interval);
    }, []);


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
