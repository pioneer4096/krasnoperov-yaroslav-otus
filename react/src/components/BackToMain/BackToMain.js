import {Link} from 'react-router-dom';

function BackToMain({text = 'Назад'}) {
    return (
        <Link to="/">{text}</Link>
    )
}


export default BackToMain;
