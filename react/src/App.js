import React, {useState, useEffect, useCallback} from 'react';
import 'bulma/css/bulma.min.css';
// import env from "react-dotenv";
import { debounce } from "lodash"
import {Box, Card, Form} from 'react-bulma-components';
const {Control, Input, Field, Label} = Form;

const autoCompletePool = ['Абакан', 'Астана', 'Белгород', 'Бердянск', 'Владимир', 'Вологда', 'Воронеж']

const cityData = [
    {
        title: 'Пермь',
        temperature: 30,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcMmJMRH00bF_7lmmFPQIzrIvS0fuWvxDbZxjSVTOpJGZSKCeDHof9Ie875hilO8iLfH0&usqp=CAU'
    },
    {
        title: 'Красноярск',
        temperature: 19,
        image: 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png'
    },
]

function App() {
    const [autoCompleteList, setAutoCompleteList] = useState([]);
    const [searchInput, setSearchInput] = useState('')
    const [addedCities, setAddedCities] = useState([cityData[0], cityData[1]])

    useEffect(() => {
        updateAutocompleteDropdown(searchInput);
    }, [searchInput]);


    function updateAutocompleteDropdown(search) {
        const addedCitiesNames = addedCities.map(city => city.title)

        const filteredList = search
            ? autoCompletePool
                .filter(cityName => Boolean((cityName.toLowerCase()).includes(search.toLowerCase())))
                .filter(cityName => !addedCitiesNames.includes(cityName))
            : [];
        setAutoCompleteList(filteredList);
    }

    const delayedSearch = useCallback(
        debounce((value) => {
            console.warn('debounce search = ', value)
        }, 500),
        []
    );

    function handleCitySearchChange(event) {
        setSearchInput(event.target.value);
        delayedSearch(searchInput)
    }

    function handleAutocompleteClick(cityName) {
        const newCity = makeCityData(cityName)
        setAddedCities([...addedCities, newCity]);
        setAutoCompleteList([])
        setSearchInput('')
    }

    function makeCityData(cityName) {
        return {
            title: cityName,
            temperature: '',
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
                                        autoCompleteList.map((cityName, index) => (
                                            <div key={index} className="autocomplete-item" onClick={() => {handleAutocompleteClick(cityName)}}>{cityName}</div>
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
                            addedCities.map((city, index) => (
                                <Card key={'city-card-mini-' + index} className="mt-1 mr-3" style={{width: 250}}>
                                    <Card.Content>
                                        <img
                                            align="right"
                                            width="64"
                                            height="64"
                                            src={city.image}
                                        />

                                        <div className="city-name">
                                            {city.title}
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
                        }
                    </div>


                </div>
            </div>
        </div>
    );
}

export default App;
