import {Link} from 'react-router-dom';

function NotFound() {
    return (
        <div>
            <h1>Page not found | 404</h1>
            <div>Please check URL or go back to <Link to="/">Home</Link> </div>
        </div>
    )
}

export default NotFound;
