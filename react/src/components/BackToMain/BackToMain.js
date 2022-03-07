import {Link} from 'react-router-dom';

export function BackToMain({text = 'Назад'}) {
    return (
        <Link to="/">{text}</Link>
    )
}
