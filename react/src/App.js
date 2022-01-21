import './App.css';
import React, {useState, useEffect} from 'react';
import CityCardMini from './components/CityCardMini/CityCardMini'

const autoCompletePool = ['Абакан', 'Астана', 'Белгород', 'Бердянск', 'Владимир', 'Вологда', 'Воронеж'].map(city => city.toLowerCase())

function App() {
    const [autoCompleteList, setAutoCompleteList] = useState([]);
    const [searchInput, setSearchInput] = useState('')
    const [addedCities, setAddedCities] = useState(['Пермь', 'Красноярск'])

    useEffect(() => {
        updateAutocompleteDropdown(searchInput);
    }, [searchInput]);


    function updateAutocompleteDropdown(search) {
        const filteredList = search
            ? autoCompletePool.filter(cityName => Boolean(cityName.includes(search.toLowerCase())))
            : [];
        setAutoCompleteList(filteredList);
    }

    function handleCitySearchChange(event) {
        setSearchInput(event.target.value);
    }

    function handleAutocompleteClick(cityName) {
        setAddedCities([...addedCities, cityName]);
        setAutoCompleteList([])
        setSearchInput('')
    }

    return (
        <div className="App">
            <div className="content">
                <div className="add-city">
                    <div>
                        <input type="text" placeholder="Введите город" value={searchInput} onInput={handleCitySearchChange}/>
                    </div>

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
                <div className="added-cities-list">
                    <h4>Список добавленных городов</h4>

                    <div className="cities-cards">
                        {
                            addedCities.map((cityName, index) => (
                                <CityCardMini cityName={cityName} key={'city-card-mini-' + index} />
                            ))
                        }
                    </div>


                </div>
            </div>
        </div>
    );
}

export default App;
