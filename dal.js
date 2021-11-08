/*const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb+srv://admin:<kYGq6vU8IPCrQTui>@cluster0.qfhsi.mongodb.net/myproject?retryWrites=true&w=majority';
let db            = null;
 
// connect to mongo
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');
});*/

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<kYGq6vU8IPCrQTui>@cluster0.qfhsi.mongodb.net/myproject?retryWrites=true&w=majority"; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); 
client.connect(err => { const db = client.db("myproject") }); 
console.log("Database Connected");

/*const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
// Connection url
const url = 'mongodb+srv://admin:<kYGq6vU8IPCrQTui>@cluster0.qfhsi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// Database Name
const dbName = 'test';
// Connect using MongoClient
const mongoClient = new MongoClient(url);
mongoClient.connect(function(err, client) {
  const db = client.db(dbName);
  client.close();
});*/

/*const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:<kYGq6vU8IPCrQTui>@cluster0.qfhsi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, update, all};