import './App.css';
import Search from './Search.js'
import CitiesList from './CitiesList.js'

function App() {
    return (
        <div className="App">
            <div className="content">
                <Search />

                <CitiesList />
            </div>
        </div>
    );
}

export default App;
