import './CityCardMini.css'

function CityCardMini({cityName}) {
    return (
        <div className="city-card-mini">
            {cityName} <button>X</button>
        </div>
    )
}

export default CityCardMini
