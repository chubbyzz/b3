const axios = require('axios');

const key = 'XMGJW324QR4KXWQG';
const baseUrl = 'https://www.alphavantage.co/query';

module.exports = {
    async request(action, params) {
        const url = this.buildUrl(action, params);
        const response = await axios.get(url);
        return response.data;
    },
    buildUrl(action ,params) {
        if(action == undefined || action == null) {
            throw(`action could not be ${action}`);
        }
        return `${baseUrl}?function=${action}${this.formatParams(params)}&apikey=${key}`;
    },
    formatParams(params) {
        return Object.keys(params).map((key) => {
            if(params[key] == undefined || params[key] == null) {
                throw(`param value could not be ${params[key]}`);
            }
            return "&"+ key + "=" + params[key]
        }).join("");
    }
}