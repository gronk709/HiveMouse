const express = require('express'); // express framework for simple webapps
const bodyParser = require('body-parser');
const app = express();

//database connection code
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://pete:Ngc6656%21@augfrontdev.ya42f.mongodb.net/hivemouse_dev?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//the thing that parses your html for data
app.use(bodyParser.urlencoded({extended: true})) 

app.listen(3000, function(){
  console.log('HiveMouse is listening on port 3000.....')
});

//what to do at the page root location with no routes
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
});
app.get('/hivemouse', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
});
app.get('/hives', (req, res) => {
  res.sendFile(`${__dirname}/hives.html`)
});

//connect to the hives collection
client.connect(err => {
  const hives_collection = client.db("hivemouse_dev").collection("hives");
  console.log('Connected to Database')
  
  // perform actions on the hives collection
  app.post('/hives', (req, res) => {
    hives_collection.insertOne(req.body)
      .then(result => {
        console.log(result)
      })
      .catch(error => console.error(error))
  });
  client.close();
  console.log('Connected to Database Closed')
});
//close the database connection
