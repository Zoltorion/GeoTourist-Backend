import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getElevation } from './helper';

describe('helper functions', () => {
    it('getElevation returns correct data', async () => {
        const mock = new MockAdapter(axios);
        const mockData = { /* mock response data */ };
        mock.onGet(/* mock URL */).reply(200, mockData);

        const elevation = await getElevation(/* args */);
        expect(elevation).toEqual(/* expected value */);
    });
});
