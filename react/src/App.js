import 'bulma/css/bulma.min.css';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import Home from './views/Home';
import City from './views/City';
import NotFound from './views/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="city/*">
                    <Route path=":id" element={<City />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
