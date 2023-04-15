const { request, response } = require("express")
const express=require("express")
const productApp=express.Router()
const expressAsyncHandler=require("express-async-handler")

productApp.use(express.json())

productApp.get("/getProducts",expressAsyncHandler(async(request,response)=>{
    let productCollection=request.app.get("productCollection")
    let data=await productCollection.find().toArray();
    response.send({message:"product details",payload:data})
}))

productApp.post("/createProduct",expressAsyncHandler(async(request,response)=>{
    let newProduct=request.body;
    console.log(newProduct)
    let productCollection=request.app.get("productCollection")
    let data=await productCollection.insertOne(newProduct)
    response.send({message:"new product created"})
    console.log(newProduct)
}))
productApp.get("/getProduct/:product",expressAsyncHandler(async(request,response)=>{
    let product=request.params.product;
    let productCollection=request.app.get("productCollection")
    let data=await productCollection.find({name:product}).toArray()
    response.send({message:"search results",payload:data})
    console.log(product)
}))

productApp.put("/updateProduct",expressAsyncHandler(async(request,response)=>{
    let productCollection=request.app.get("productCollection")
    let newObj=request.body
    await productCollection.updateOne({name:newObj.name},{$set:{...newObj}})
    response.send({message:"product modified"})
}))

module.exports=productApp