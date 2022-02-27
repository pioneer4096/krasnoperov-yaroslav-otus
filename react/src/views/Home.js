import '../styles/Home.css';
import {useCallback, useEffect, useState} from 'react';
import env from 'react-dotenv';
import {debounce, random} from 'lodash';
import {Box, Card, Form} from 'react-bulma-components';
import axios from 'axios';
import {useLocalStorage} from '../utils/use.local.storage';
import CloseButton from '../components/CloseButton/CloseButton';
import {Link} from 'react-router-dom';

const {Control, Input, Field} = Form;

function Home() {
    const [autoCompleteList, setAutoCompleteList] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [addedCities, setAddedCities] = useLocalStorage('added-cities', []);

    useEffect(() => {
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
    }

    function updateAutocompleteDropdown(data) {
        if(Array.isArray(data)) {
            const excludeIds = addedCities.map(city => city.id);
            const list = data
                .filter(d => !excludeIds.includes(d.id)) // cant add already added
                .map(d => {
                    return {
                        id: d.id,
                        name: d.name,
                        fullName: `${d.name} (${d.region}, ${d.country})`
                    }
                })
            setAutoCompleteList(list)
        }
        else {
            setAutoCompleteList([])
        }
    }

    const delayedSearch = useCallback(
        debounce((value) => {
            axios.get(`http://api.weatherapi.com/v1/search.json?key=${env.REACT_APP_API_KEY}&q=${value}`)
                .then(r => updateAutocompleteDropdown(r.data))
                .catch(e => console.warn(e))
        }, 500),
        []
    );

    function handleCitySearchChange(event) {
        const value = event.target.value;
        setSearchInput(value);
        if(value) {
            delayedSearch(value)
        }
        else {
            updateAutocompleteDropdown([])
        }

    }

    function handleAutocompleteClick(cityData) {
        const newCity = makeCityData(cityData);
        setAddedCities([...addedCities, newCity]);
        setAutoCompleteList([]);
        setSearchInput('');
    }

    function makeCityData(city) {
        return {
            ...city,
            temperature: '-',
            image: 'https://img.favpng.com/14/1/19/drawing-cartoon-png-favpng-LDPbKDBZUZnHi1kaG9xNwdWrA.jpg'
        }
    }

    function deleteCity({id}) {
        const newCities = addedCities.filter(city => city.id !== id);
        setAddedCities(newCities);
    }

    return (
        <div className="page-home">
            <div>
                <h4>Добавить город</h4>
                <Box className="add-city-wrapper">
                    <div className="add-city">
                        <Field>
                            <Control>
                                <Input type="text" placeholder="Имя города" value={searchInput} onInput={handleCitySearchChange} />
                            </Control>
                        </Field>

                        {
                            autoCompleteList.length ?
                                <div className="autocomplete-wrapper">
                                    {
                                        autoCompleteList.map((city, index) => (
                                            <div key={index} className="autocomplete-item" onClick={() => handleAutocompleteClick(city)}>{city.fullName}</div>
                                        ))
                                    }
                                </div> : ''
                        }
                    </div>
                </Box>
            </div>

            <br/><br/>

            <div className="added-cities-list">
                <h4>Мои города</h4>

                <div className="cities-cards" style={{display: 'flex'}}>
                    {
                        addedCities.length ?
                            addedCities.map((city, index) => (
                                <Link to={`/city/${city.name}`} key={'city-card-mini-' + index}>
                                    <Card
                                        className="mt-1 mr-3 city-card-mini"
                                        style={{width: 250}}>
                                        <div className="tools-line">
                                            <CloseButton click={() => deleteCity(city)}/>
                                        </div>
                                        <Card.Content>
                                            {
                                                city.image &&
                                                <img
                                                    align="right"
                                                    width="64"
                                                    height="64"
                                                    alt="Солнечно"
                                                    src={city.image}
                                                />
                                            }

                                            <div className="city-name">
                                                {city.name}
                                            </div>
                                            {
                                                city.temperature &&
                                                <div className="city-temperature">
                                                    {city.temperature}°
                                                </div>
                                            }
                                        </Card.Content>
                                    </Card>
                                </Link>
                            ))
                            : <div>нет городов</div>
                    }
                </div>


            </div>
        </div>
    );
}

export default Home;
