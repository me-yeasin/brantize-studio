import { MongoClient } from 'mongodb';

async function testConnection() {
  const uri = 'mongodb+srv://brandtizestudio:zxcvbnm123@brandtizecloud.g75wkgy.mongodb.net/brandtize-studio?retryWrites=true&w=majority&appName=BrandtizeCloud';
  const client = new MongoClient(uri);
  
  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    console.log('Connected successfully to MongoDB');
    await client.db().command({ ping: 1 });
    console.log('MongoDB is responsive');
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await client.close();
  }
}

testConnection();
