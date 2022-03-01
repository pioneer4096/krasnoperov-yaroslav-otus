import '../styles/Home.css';
import {useLocalStorage} from '../utils/use.local.storage';
import CitiesAutocomplete from '../components/CitiesAutocomplete/CitiesAutocomplete';
import MyCitiesList from '../components/MyCitiesList/MyCitiesList';

function Home() {
    const [addedCities, setAddedCities] = useLocalStorage('added-cities', []);

    /*useEffect(() => {
        const interval = setInterval(() => {
            updateTemperature(addedCities)
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    function updateTemperature(cities) {
        const updatedCities = cities.map(city => {
            return {
                ...city,
                temperature: random(-50, 50)
            }
        });
        setAddedCities(updatedCities)
    }*/


    return (
        <div className="page-home">
            <CitiesAutocomplete
                citiesList={addedCities}
                updateCitiesList={setAddedCities}
            />

            <br/><br/>

            <MyCitiesList
                citiesList={addedCities}
                updateCitiesList={setAddedCities}
            />
        </div>
    );
}

export default Home;
