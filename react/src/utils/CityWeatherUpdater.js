import {getCurrentWeather} from '../api/api';
import {CITY_UNTOUCHED, CITY_DONE} from './city.states';

const TIME_TO_OUTDATED = 24 * 60 * 60 * 1000;   // 1 day in ms

class CityWeatherUpdater {
    constructor(applyCityWeather) {
        this.loading = false;
        this.applyCityWeather = applyCityWeather.bind(this);
    }

    /**
     * Update city function
     * handle only 1 city per step to not DDOS API
     * @param {Array} list - List of saved user's cities
     * **/
    update(list = []) {
        if(this.loading) {
            console.log('busy, try to update later...');
            return;
        }

        if(list.length) {
            const cityUntouched = list.find(c => c.state === CITY_UNTOUCHED);
            if(cityUntouched) {
                this.updateCityWeather(cityUntouched);
                return;
            }

            const cityDone = list.find(c => c.state === CITY_DONE);
            if(cityDone && this.isOutdated(cityDone) ) {
                this.updateCityWeather(cityDone);
                return;
            }
        }
    }

    isOutdated(city) {
        return (Date.now() - city.updated > TIME_TO_OUTDATED)
    }

    updateCityWeather(city) {
        this.loading = true;
        getCurrentWeather(city.name)
            .then(r => this.applyCityWeather(r.data))
            .catch(e => {
                console.error(`Error during update city ${city.name} `, e);
            })
            .finally(() => {
            this.loading = false;
        })
    }
}

export default CityWeatherUpdater;
