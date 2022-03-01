import './CitiesAutocomplete.css'
import {Box, Form} from 'react-bulma-components';
import {useCallback, useState} from 'react';
import axios from 'axios';
import {debounce} from 'lodash';
import env from 'react-dotenv';
const {Control, Input, Field} = Form;

function CitiesAutocomplete({citiesList, updateCitiesList}) {
    const [autoCompleteList, setAutoCompleteList] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    function updateAutocompleteDropdown(data) {
        if(Array.isArray(data)) {
            const excludeIds = citiesList.map(city => city.id);
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
            axios.get(`http://api.weatherapi.com/v1/search.json?key=${env.REACT_APP_API_KEY}&q=${value}&lang=ru`)
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
        updateCitiesList([...citiesList, newCity]);
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


    return (
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
    )
}

export default CitiesAutocomplete;
