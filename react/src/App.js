import React, {useState, useEffect, useCallback} from 'react';
import 'bulma/css/bulma.min.css';
import env from "react-dotenv";
import { debounce } from "lodash"
import {Box, Card, Form} from 'react-bulma-components';
import axios from 'axios';
import {useLocalStorage} from './utils/use.local.storage';
const {Control, Input, Field, Label} = Form;


function App() {
    const [autoCompleteList, setAutoCompleteList] = useState([]);
    const [searchInput, setSearchInput] = useState('')
    const [addedCities, setAddedCities] = useLocalStorage('added-cities', [])

    function updateAutocompleteDropdown(data) {
        if(Array.isArray(data)) {
            const list = data.map(d => {
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
            axios.get(`http://api.weatherapi.com/v1/search.json?key=${env.API_KEY}&q=${value}`)
                .then(r => updateAutocompleteDropdown(r.data))
                .catch(e => console.warn(e))
        }, 500),
        []
    );

    function handleCitySearchChange(event) {
        const value = event.target.value
        setSearchInput(value);
        if(value) {
            delayedSearch(value)
        }
        else {
            updateAutocompleteDropdown([])
        }

    }

    function handleAutocompleteClick(cityData) {
        const newCity = makeCityData(cityData)
        setAddedCities([...addedCities, newCity]);
        setAutoCompleteList([])
        setSearchInput('')
    }

    function makeCityData(city) {
        return {
            ...city,
            temperature: '+5',
            image: 'https://img.favpng.com/14/1/19/drawing-cartoon-png-favpng-LDPbKDBZUZnHi1kaG9xNwdWrA.jpg'
        }
    }

    return (
        <div className="App">
            <div className="content">
                <Box style={{ width: 600, margin: 'auto' }}>
                    <div className="add-city">
                        <Field>
                            <Label>
                                Добавить город
                            </Label>
                            <Control>
                                <Input type="text" placeholder="Имя города" value={searchInput} onInput={handleCitySearchChange} />
                            </Control>
                        </Field>

                        {
                            autoCompleteList.length ?
                                <div>
                                    {
                                        autoCompleteList.map((city, index) => (
                                            <div key={index} className="autocomplete-item" onClick={() => handleAutocompleteClick(city)}>{city.fullName}</div>
                                        ))
                                    }
                                </div> : ''
                        }
                    </div>
                </Box>

                <br/><br/>

                <div className="added-cities-list" style={{ width: '600px', margin: '0 auto'}}>
                    <h4>Добавленные города</h4>

                    <div className="cities-cards" style={{display: 'flex'}}>
                        {
                            addedCities.length ?
                                addedCities.map((city, index) => (
                                    <Card key={'city-card-mini-' + index} className="mt-1 mr-3" style={{width: 250}}>
                                        <Card.Content>
                                            {
                                                city.image &&
                                                <img
                                                    align="right"
                                                    width="64"
                                                    height="64"
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
                                ))
                            : <div>нет городов</div>
                        }
                    </div>


                </div>
            </div>
        </div>
    );
}

export default App;
