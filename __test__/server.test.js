const server = require('../../b3/lib/server');
const mockAxios = require('./__mock__/axios');

describe('format params', () => {
    it('should generate params url', () => {
        const urlParams = server.formatParams({code: 'LREN3', interval: '5min'});
        expect(urlParams).toBe('&code=LREN3&interval=5min');
    });

    it('should generate params url even its not a string', () => {
        const urlParams = server.formatParams({code: 'LREN3', interval: 5});
        expect(urlParams).toBe('&code=LREN3&interval=5');
    });

    it('should error if params is undefined', () => {
        expect(() => {
            server.formatParams({code: 'LREN3', interval: undefined});
        }).toThrowError(new Error('param value could not be undefined'));
    });

    it('should error if params is null', () => {
        expect(() => {
            server.formatParams({code: 'LREN3', interval: null});
        }).toThrowError(new Error('param value could not be null'));
    });
});

describe('build url', () => {
    beforeAll(() => {
        server.formatParams = jest.fn().mockReturnValue('&symbol=LREN3.SAO&interval=5min');
    })
    it('should build a valid url', () => {
        const action = 'TIME_SERIES_INTRADAY';
        const url = server.buildUrl(action,  {symbol: 'LREN3.SAO', interval: '5min'});
        expect(url).toBe('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=LREN3.SAO&interval=5min&apikey=XMGJW324QR4KXWQG');
    })
    it('should throw error if action is null or undefined', () => {
        expect(() => {
            server.buildUrl(null, {symbol: 'LREN3', interval: '5min'});
        }).toThrowError(new Error('action could not be null'));
        expect(() => {
            server.buildUrl(undefined, {symbol: 'LREN3', interval: '5min'});
        }).toThrowError(new Error('action could not be undefined'));
    });
});

describe('b3 request', () => {
    it('should search a valid asset on b3', async () => {
        const response = await server.request('TIME_SERIES_INTRADAY', {symbol: 'LREN3.SAO', interval: '5min'});
        const expectResponse = require('./__mock__/lren_response.json');
        expect(response).toBe(expectResponse);
    });
});