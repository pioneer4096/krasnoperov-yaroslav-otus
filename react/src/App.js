import 'bulma/css/bulma.min.css';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import {Home} from './views/Home';
import {CityForecast} from './views/CityForecast';
import {NotFound} from './views/NotFound';

function App() {
    return (
        <div className="App">
            <div className="content page-content">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="city/*">
                            <Route path=":id" element={<CityForecast />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
