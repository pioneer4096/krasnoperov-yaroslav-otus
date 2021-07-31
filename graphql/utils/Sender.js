const parser = require('xml2json');
const axios = require('axios')
const errors = require('../reference/errors')

class Sender {
    async get(url) {
        let response = null
        try {
            response = await axios.get(url)
        }
        catch (e) {
            throw new Error(errors.CANT_GET_URL)
        }

        try {
            return parser.toJson(response.data, {object: true})
        }
        catch(e) {
            throw new Error(errors.CANT_PARSE_URL_RESPONSE)
        }


    }
}


module.exports = Sender
