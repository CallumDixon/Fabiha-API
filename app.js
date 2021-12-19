const express = require('express')
const path = require('path');
const app = express()
const port = 3500
app.use(express.json())
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://callum:Dicko941@192.168.0.68:27017/fabiha"
var itemsDB
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    itemsDB = db.db("fabiha").collection("pantry")
  })

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/root.html'))
})

app.get('/all', (req, res) => {
    itemsDB.find({}).toArray((err,result)=>{
        res.send(result)
    })
})

app.route('/items')
  .get((req, res) => {
    itemsDB.find({name:req.query.item}).toArray((err,result)=>{
        res.send(result)
    })
  })
  .post((req, res) => {
    if(req.body.hasOwnProperty('name') && req.body.hasOwnProperty('quantity')){

        if(req.body.quantity > 0){
            res.send("success")
            console.log(req.body.name)
            var myobj = { name: req.body.name, quantity: req.body.quantity}
            itemsDB.insertOne(myobj, (err, res) => {if (err) throw err})
        } 
    }
    else{
        res.send("failure")
    }

    //itemsDB.insertMany([{name: 'Crisps',quantity:'4'},{name: 'Bread',quantity:'1'}])
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/all`)
})
