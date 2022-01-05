const cities = ['Абакан', 'Астана', 'Белгород', 'Бердянск', 'Владимир', 'Вологда', 'Воронеж'].map(city => city.toLowerCase())


export default class CitiesList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            list: []
        }
    }

    filter() {
        let needle = this.props.needle || ''
        needle = needle.toLowerCase()
        const list = cities.filter(cityName => Boolean(cityName.includes(needle)))

        this.setState({
            list
        })
    }

    render() {
        return (
            <div>
                Список подходящих городов: {this.state.list.join(', ')}
            </div>
        )
    }
}
