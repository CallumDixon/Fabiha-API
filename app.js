const express = require('express')
const app = express()
const port = 3500

var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://callum:Dicko941@192.168.0.69:27017/test"
var itemsDB
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    itemsDB = db.db("test").collection("items")
    /* var myobj = { name: 'i'};
    dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err
    }) */


    //itemsDB.insertMany([{name: 'Crisps',quantity:'4'},{name: 'Bread',quantity:'1'}])
  })

app.get('/all', (req, res) => {
    itemsDB.find({}).toArray((err,result)=>{
        res.send(result)
    })
})

app.get('/items',function(req,res){
    itemsDB.find({name:req.query.item}).toArray((err,result)=>{
        res.send(result)
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
