// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/login.html");
});


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});



const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = `
mongodb+srv://UserA3:${process.env.DBPASSWORD}@a3-cluster.gsvjm.azure.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true }, {useUnifiedTopology: true});

let collection = null;
client.connect(err => {
  collection = client.db("datatest").collection("test")
});

app.post("/add", bodyParser.json(), function(request, response) {
  console.log('body:', request.body);
  collection.insertOne( request.body ).then( dbresponse => {
    console.log( dbresponse )
    response.json(dbresponse.ops[0])
  })
})

app.post("/delete", bodyParser.json(), function(request, response){
  console.log('delete body:', request.body);
    collection
    .deleteOne({ _id:mongodb.ObjectID( request.body.id ) })
    .then( result => response.json( result ) )
})