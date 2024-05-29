const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express(); 
const port = process.env.PORT || 5000; 


const corsOptions = {
  origin: [
      'http://localhost:5173',
      'https://car-and-you-67054.web.app',
      'https://car-and-you.netlify.app/'
      
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};



//middleware
app.use(cors(corsOptions)); 
app.use(express.json()); 


//MongoDB here
// const uri = `mongodb://localhost:27017`;

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
    const brandSliderDB = carAndYouDBCollections.collection('brandSlider');
    const companiesProductDB = carAndYouDBCollections.collection('companiesProduct'); 
    const siteUsersDB = carAndYouDBCollections.collection('siteUser'); 





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
          logo : modifyNameAndLogo.logo,
          details: modifyNameAndLogo.details
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
          image : modifyMoreNewCar.image,
        }
      }
      const result = await moreNewCarLaunchingDB.updateOne(filter, updateDoc, options); 
      res.send(result);
    })



    //brand Slider Operation 

    //get for brand slider

    app.get('/brandSlider', async(req, res)=> {
      const cursor = brandSliderDB.find(); 
      const result = await cursor.toArray(); 
      res.send(result);
    })



    //post for brand slider
    app.post('/brandSlider', async(req, res)=> {
      const newSlider = req.body; 
      const result = await brandSliderDB.insertOne(newSlider);  
      res.send(result);
    })


    //delete for brand slider
    app.delete('/brandSlider/:id', async(req, res)=> {
      const id = req.params.id; 
      const filter = {_id: new ObjectId(id)}; 
      const result = await brandSliderDB.deleteOne(filter); 
      res.send(result); 
    })


    //update for brand slider
    //find for update 
    app.get('/brandSlider/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)}; 

      const result = await brandSliderDB.findOne(filter); 
      res.send(result); 

      
    })

    //update brand slider
    app.put('/brandSlider/:id', async(req, res)=> {
      const id = req.params.id;
      const brandSlider = req.body; 

      const filter = {_id: new ObjectId(id)}; 
      const options = {upsert : true}; 
      const updateDoc = {
        $set: {
          companyName : brandSlider.companyName,
          slider : brandSlider.slider,
        }
      }
      const result = await brandSliderDB.updateOne(filter, updateDoc, options); 
      res.send(result);
    })



    //Company products or items -----------------------------------------------

    //get for companies Product

    app.get('/companiesProduct', async(req, res)=> {
      const cursor = companiesProductDB.find(); 
      const result = await cursor.toArray(); 
      res.send(result);
    })



    //post for companies Product
    app.post('/companiesProduct', async(req, res)=> {
      const newProduct = req.body; 
      const result = await companiesProductDB.insertOne(newProduct);  
      res.send(result);
    })


    //delete for companies Product
    app.delete('/companiesProduct/:id', async(req, res)=> {
      const id = req.params.id; 
      const filter = {_id: new ObjectId(id)}; 
      const result = await companiesProductDB.deleteOne(filter); 
      res.send(result); 
    })


    //update for companies Product
    //find for update 
    app.get('/companiesProduct/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)}; 

      const result = await companiesProductDB.findOne(filter); 
      res.send(result); 

      
    })

    //update companies Product
    app.put('/companiesProduct/:id', async(req, res)=> {
      const id = req.params.id;
      const companyItem = req.body; 

      const filter = {_id: new ObjectId(id)}; 
      const options = {upsert : true}; 
      const updateDoc = {
        $set: {
          companyName : companyItem.companyName,
          image : companyItem.image,
          description : companyItem.description,
          moreImages: companyItem.moreImage
        }
      }
      const result = await companiesProductDB.updateOne(filter, updateDoc, options); 
      res.send(result);
    })
    


    //user information DB

    //get for user
    app.get('/users', async(req, res)=> {
      const cursor = siteUsersDB.find(); 
      const result = await cursor.toArray(); 
      res.send(result);
    })
    


    //post for user 
    app.post('/users', async(req, res)=> {
      const newUser = req.body; 
      const result = await siteUsersDB.insertOne(newUser);  
      res.send(result);
    })

    //delete for user 
    app.delete('/users/:id', async(req, res)=> {
      const id = req.params.id; 
      const filter = {_id: new ObjectId(id)}; 
      const result = await siteUsersDB.deleteOne(filter); 
      res.send(result); 
    })

    //update for user 
    app.put('/users', async(req, res)=> {
      
      const createdAt = req.body; 
      console.log(createdAt);
      const filter = {createdAt : createdAt.createdAt}; 
      const options = {upsert : true}; 
      const updateDoc = {
        $set: {
          lastSignInTime : createdAt.lastSignInTime,
          displayName: createdAt.displayName,
          email : createdAt.email
        }
      }
      const result = await siteUsersDB.updateOne(filter, updateDoc, options); 
      res.send(result);
    })

    //patch for user
    app.patch('/users', async(req, res)=> {
      
      const userLoging = req.body; 
      const filter = {email : userLoging.email}; 
      const options = {upsert : true}; 
      const updateDoc = {
        $set: {
          lastSignInTime : userLoging.lastSignInTime,
         
        }
      }
      const result = await siteUsersDB.updateOne(filter, updateDoc, options); 
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