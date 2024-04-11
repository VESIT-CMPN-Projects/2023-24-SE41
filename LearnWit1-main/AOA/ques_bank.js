const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb+srv://suryanarayan:gcnRb9hfQq*G7pb@cluster0.tgzu9tt.mongodb.net/';

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Access the database
    const database = client.db('test');

    // Access the collection
    const collection = database.collection('Question_bank');

    // Query the collection to get all documents
    const cursor = collection.find();

    // Iterate over the documents and print their contents
    await cursor.forEach(document => {
      console.log(document);
    });
  } finally {
    // Close the connection when you're done
    await client.close();
  }
}

main().catch(console.error);
