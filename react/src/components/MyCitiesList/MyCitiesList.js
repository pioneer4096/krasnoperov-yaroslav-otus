import './MyCitiesList.css'
import {Link} from 'react-router-dom';
import {Card} from 'react-bulma-components';
import CloseButton from '../CloseButton/CloseButton';

function MyCitiesList({citiesList, updateCitiesList}) {
    function deleteCity({id}) {
        const newCities = citiesList.filter(city => city.id !== id);
        updateCitiesList(newCities);
    }

    return (
        <div className="added-cities-list">
            <h4>Мои города</h4>

            <div className="cities-cards" style={{display: 'flex'}}>
                {
                    citiesList.length ?
                        citiesList.map((city, index) => (
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

                                        <div className="city-name" title={city.name}>
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
    )
}

export default MyCitiesList;
