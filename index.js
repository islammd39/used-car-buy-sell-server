const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rbojs1n.mongodb.net/?retryWrites=true&w=majoritymongodb+srv://<username>:<password>@cluster0.rbojs1n.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// console.log(uri);

async function run (){
  try{
     const carCollection = client.db('secondHandCarCollection').collection('carCategories')

     app.get('/categories', async(req, res)=>{
      const query = {}
      const options = await carCollection.find(query).toArray();
      res.send(options)
     })

     app.get("/categories/:id", async(req, res)=>{
      const id = req.params.id
      const query = {_id: ObjectId(id)}
      const category =await carCollection.findOne(query)
      res.send(category)
     })

  }
  finally{

  }
}
run().catch(console.log)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})