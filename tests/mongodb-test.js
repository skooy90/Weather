const { MongoClient } = require('mongodb');

describe('MongoDB Connection', () => {
  let client;
  let db;

  beforeAll(async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI 환경 변수가 설정되지 않았습니다');
    }
    client = new MongoClient(uri);
    await client.connect();
    const dbName = new URL(uri).pathname.substring(1);
    db = client.db(dbName);
  });

  afterAll(async () => {
    await client.close();
  });

  test('should connect to MongoDB', async () => {
    expect(client).toBeTruthy();
    const collections = await db.listCollections().toArray();
    expect(collections).toBeDefined();
  });

  test('should create and read documents', async () => {
    const collection = db.collection('test');
    const testDoc = { name: 'test', value: 123 };
    
    await collection.insertOne(testDoc);
    const result = await collection.findOne({ name: 'test' });
    
    expect(result).toBeTruthy();
    expect(result.value).toBe(123);
    
    await collection.deleteOne({ name: 'test' });
  });
}); 