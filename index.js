const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express(); 
const port = process.env.PORT || 5000; 

//middleware
app.use(cors()); 
app.use(express.json()); 


//MongoDB here

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zmeeuxc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const carAndYouDBCollections = client.db('carAndYouDB'); 
    const bannerAndHeadLineDB = carAndYouDBCollections.collection('bannerAndHeader'); 
    const companiesNameAndLogoDB = carAndYouDBCollections.collection('companiesNameAndLogo'); 
    const moreNewCarLaunchingDB = carAndYouDBCollections.collection('moreNewCarLaunching'); 




    // get for bannner and header 
    app.get('/bannerAndHeader', async(req, res)=> {
      const cursor = bannerAndHeadLineDB.find(); 
      const result = await cursor.toArray(); 
      res.send(result);
    })


    // post for Banner and header
    app.post('/bannerAndHeader', async(req, res)=> {
      const bannerAndHeader = req.body; 
      const result = await bannerAndHeadLineDB.insertOne(bannerAndHeader);  
      res.send(result);
    })

    //delete for banner and header 

    app.delete('/bannerAndHeader/:id', async(req, res)=> {
      const id = req.params.id; 
      const filter = {_id: new ObjectId(id)}; 
      const result = await bannerAndHeadLineDB.deleteOne(filter); 
      res.send(result); 
    })

    // find for banner and header 
    app.get('/bannerAndHeader/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)}; 

      const result = await bannerAndHeadLineDB.findOne(filter); 
      res.send(result); 

      
    })

    // update banner and header 
    app.put('/bannerAndHeader/:id', async(req, res)=> {
      const id = req.params.id;
      const newBannerAndHeader = req.body; 

      const filter = {_id: new ObjectId(id)}; 
      const options = {upsert : true}; 
      const updateDoc = {
        $set: {
          banner : newBannerAndHeader.banner,
          header : newBannerAndHeader.header
        }
      }
      const result = await bannerAndHeadLineDB.updateOne(filter, updateDoc, options); 
      res.send(result);
    })



    // company name and logo --------------------------------------------------


    // get for name and logo
    app.get('/companiesNameAndLogo', async(req, res)=> {
      const cursor = companiesNameAndLogoDB.find(); 
      const result = await cursor.toArray(); 
      res.send(result);
    })


    // post for name and logo
    app.post('/companiesNameAndLogo', async(req, res)=> {
      const companiesNameAndLogo = req.body; 
      const result = await companiesNameAndLogoDB.insertOne(companiesNameAndLogo);  
      res.send(result);
    })


     //delete for name and logos

     app.delete('/companiesNameAndLogo/:id', async(req, res)=> {
      const id = req.params.id; 
      const filter = {_id: new ObjectId(id)}; 
      const result = await companiesNameAndLogoDB.deleteOne(filter); 
      res.send(result); 
    })

    //find for update company name and logos

    app.get('/companiesNameAndLogo/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)}; 

      const result = await companiesNameAndLogoDB.findOne(filter); 
      res.send(result); 

      
    })

    // update for name and logo
    app.put('/companiesNameAndLogo/:id', async(req, res)=> {
      const id = req.params.id;
      const modifyNameAndLogo = req.body; 

      const filter = {_id: new ObjectId(id)}; 
      const options = {upsert : true}; 
      const updateDoc = {
        $set: {
          name : modifyNameAndLogo.name,
          logo : modifyNameAndLogo.logo
        }
      }
      const result = await companiesNameAndLogoDB.updateOne(filter, updateDoc, options); 
      res.send(result);
    })
   

    // new operation More new Car Launching


    //get for new mor car Launchign

    app.get('/moreNewCarLaunching', async(req, res)=> {
      const cursor = moreNewCarLaunchingDB.find(); 
      const result = await cursor.toArray(); 
      res.send(result);
    })



    //post for new car launching
    app.post('/moreNewCarLaunching', async(req, res)=> {
      const moreNewCars = req.body; 
      const result = await moreNewCarLaunchingDB.insertOne(moreNewCars);  
      res.send(result);
    })


    //delete for new car launching
    app.delete('/moreNewCarLaunching/:id', async(req, res)=> {
      const id = req.params.id; 
      const filter = {_id: new ObjectId(id)}; 
      const result = await moreNewCarLaunchingDB.deleteOne(filter); 
      res.send(result); 
    })


    //update for new car launhing
    //find for update 
    app.get('/moreNewCarLaunching/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)}; 

      const result = await moreNewCarLaunchingDB.findOne(filter); 
      res.send(result); 

      
    })

    //update new car 
    app.put('/moreNewCarLaunching/:id', async(req, res)=> {
      const id = req.params.id;
      const modifyMoreNewCar = req.body; 

      const filter = {_id: new ObjectId(id)}; 
      const options = {upsert : true}; 
      const updateDoc = {
        $set: {
          about : modifyMoreNewCar.about,
          image : modifyMoreNewCar.image
        }
      }
      const result = await moreNewCarLaunchingDB.updateOne(filter, updateDoc, options); 
      res.send(result);
    })





   
    



















    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res)=> {
    res.send('Car & You Server is Running'); 
})


app.listen(port, ()=> {
    console.log(`Car and You server is running on PORT : ${port}`); 
})