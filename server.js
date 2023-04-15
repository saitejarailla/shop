
const express=require("express")

const app=express()
//import path module
const path=require('path')

//connect build of react with node js
app.use(express.static(path.join(__dirname,'./build')))

require('dotenv').config()
//mongodb url
const dbUrl=process.env.DATABASE_CONNECTION_URL
const PORT =process.env.PORT
//importing mongo db
const mClient=require("mongodb").MongoClient
mClient.connect(dbUrl)
.then((client)=>{
    console.log("database connection success")
    //database object
    let dbObj=client.db("testdb");
    //creating collection
    let userCollection=dbObj.collection("userCollection");
    let productCollection=dbObj.collection("productCollection")
    //sharing collection to apis
    app.set("userCollection",userCollection);
    app.set("productCollection",productCollection)
}
)
.catch(err=>console.log('error in db',err))
//dealing with page refreshing
app.use('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
})

// importing users api
const  userApp=require("./APIS/userApi")
const  productApp=require("./APIS/productsApi")
app.use(express.json())
//middleware using path 
app.use("/users",userApp)
app.use("/products",productApp)

//middleware to handle invalid path
app.use((request,response,next)=>{
    response.send({message:`invalid path ${request.url}`})
})


// middleware to handle errors
app.use((error,request,response,next)=>{
    response.send({message:"Error Occured",reason:`${error.message}`})
})

app.listen(PORT,()=>console.log(`server started on port ${PORT}...`))