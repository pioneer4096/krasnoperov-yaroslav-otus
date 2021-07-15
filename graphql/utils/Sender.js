const parser = require('xml2json');
const axios = require('axios')

class Sender {
    async get(url) {
        const response = await axios.get(url)
        return parser.toJson(response.data)

    }
}


module.exports = Sender
