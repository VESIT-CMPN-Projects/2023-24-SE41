const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')
const routes = require('./routes');
const path=require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const PORT = 5000;
app.use(cors())
app.use(bodyParser.json());
app.use('/api', routes);
mongoose.connect('mongodb+srv://suryanarayan:gcnRb9hfQq*G7pb@cluster0.tgzu9tt.mongodb.net/').then(()=>{
    console.log('DB Connected');
}).catch((e)=>{
    console.log(e.message)
})

app.listen(PORT, ()=>{
    console.log(`Server is up and running on PORT: ${PORT}`);
})
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../nodejs-tutorials-auth-api-jwt-mongo-project/AOA/AOA_level1.js'));
    })

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
    const cursor =  await collection.find().toArray();
console.log(cursor);
return cursor;
    // Iterate over the documents and print their contents
    // await cursor.forEach(document => {
    //   console.log(document);
    // });
  } finally {
    // Close the connection when you're done
    await client.close();
  }
}

// main();
app.get('/api/data',async (req,res)=>{
    // res.send("hello")
    let data=await main()
    console.log( data)
    res.json(data);
    });
    
// app.listen(PORT, ()=>{
//     console.log(`Server is up and running on PORT: ${PORT}`);
// })