import { MongoClient } from 'mongodb';
jest.mock('mongodb');

describe('MongoClient', () => {
    let client;

    beforeAll(() => {
        MongoClient.connect.mockResolvedValue({
            db: jest.fn().mockReturnThis(),
            collection: jest.fn().mockReturnThis(),
            find: jest.fn().mockReturnThis(),
            toArray: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
        });
        client = new MongoClient(process.env.MONGO_URI);
    });

    it('should find items correctly', async () => {
        const db = await client.connect();
        await db.collection('test').find({}).toArray();
        expect(db.collection).toHaveBeenCalledWith('test');
        expect(db.find).toHaveBeenCalledWith({});
    });

    it('should find one item correctly', async () => {
        const db = await client.connect();
        await db.collection('test').findOne({});
        expect(db.collection).toHaveBeenCalledWith('test');
        expect(db.findOne).toHaveBeenCalledWith({});
    });
});
