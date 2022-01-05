import React from 'react'

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const value = event.target.value
        this.setState({value});
        console.log('setState val = ', value)
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Введите город" onInput={this.handleChange}/>
            </div>
        )
    }
}
