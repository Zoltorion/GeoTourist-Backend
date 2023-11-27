import { addLocation } from './locations';
import { MongoClient } from 'mongodb';

jest.mock('mongodb', () => {
    const mClient = {
        db: jest.fn().mockReturnThis(),
        collection: jest.fn().mockReturnThis(),
        findOne: jest.fn(),
        insertOne: jest.fn(),
    };
    return { MongoClient: jest.fn(() => mClient) };
});

describe('Location Operations', () => {
    it('adds a location successfully', async () => {
        const client = new MongoClient();
        client.collection().findOne.mockResolvedValue(null);
        client.collection().insertOne.mockResolvedValue();

        const result = await addLocation(/* args */);
        expect(result).toBe(/* expected result */);
    });
});
