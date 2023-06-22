let express = require('express');
let app= express();
let port=9120;
let Mongo = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
let { dbConnect,getData,postData,updateOrder,deleteOrder } = require('./controller/dbController')


//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())

//get all brands
app.get('/brands', async(req,res) => {
    let query={};
    if(req.query.brandId){
        query={id:Number(req.query.brandId)}
    }
    else{
        query={};
    }
    let collection="brand"
    let output=await getData(collection,query)
    res.send(output)
})

//get all categories
app.get('/category', async(req,res) => {
    let query={};
    if(req.query.categoryId){
        query={id:Number(req.query.categoryId)}
    }
    else{
        query={};
    }
    let collection="category"
    let output=await getData(collection,query)
    res.send(output)
})

app.get('/filter/:category', async(req,res) => {
    let query={};
    let categoryId = Number(req.params.categoryId);
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    if(categoryId){
        query ={category_id: Number(req.query.categoryId)}
    }
    else if(lcost && hcost){
        query = {
            category_id:categoryId,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    else{
        query={};
    }
    let collection="products"
    let output=await getData(collection,query)
    res.send(output)
})


//details of clothes or accessories
app.get('/products/:id',async(req,res)=>{
    let id = Number(req.params.id);
    let query={category_id:id};
    let collection="products";
    let output=await getData(collection,query);
    res.send(output)
})

app.get('/orders',async(req,res) => {
    let email = req.query.email;
    if(email){
        query={email:email}
    }
    let query = {};
    let collection = "orders";
    let output = await getData(collection.query)
    res.send(output)
})


//placeOrder
app.post('/placeOrder',async(req,res) => {
    let data = req.body;
    let collection = "orders";
    let response = await postData(collection,data)
    res.send(response)
})

//update
app.put('/updateOrder',async(req,res) => {
    let collection = 'orders';
    let condition = {"_id": new Mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "status":req.body.status
        }
    }
    let output = await updateOrder(collection,condition,data)
    res.send(output)
})

//delete order
app.delete('/deleteOrder',async (req,res) => {
    let collection = 'orders';
    let condition = {"_id":new Mongo.ObjectId(req.body._id)}
    let output = await deleteOrder(collection,condition)
    res.send(output)
})

app.listen(port,(err)=>{
    dbConnect()
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})