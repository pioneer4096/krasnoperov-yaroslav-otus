import './CitiesAutocomplete.css'
import {Box, Form} from 'react-bulma-components';
import {useCallback, useState} from 'react';
import {debounce} from 'lodash';
import {CITY_UNTOUCHED} from '../../utils/city.states';
import {searchAutocomplete} from '../../api/api';
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
                });
            setAutoCompleteList(list)
        }
        else {
            setAutoCompleteList([])
        }
    }

    const delayedSearch = useCallback(
        debounce((value) => {
            searchAutocomplete(value)
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
            image: '/loading.gif',
            updated: null,  // last weather update time
            state: CITY_UNTOUCHED
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
