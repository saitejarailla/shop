const express = require("express")
const userAPP = express.Router()
const expressAsyncHandler = require("express-async-handler")
//importing bcryptjs 
const bcryptjs = require('bcryptjs')
//impoting jsonwebtoken
const jwt = require('jsonwebtoken')
//extracting body using middleware
userAPP.use(express.json())
//importing env
require('dotenv').config()



userAPP.get("/login",expressAsyncHandler( async(request,response) =>{
    //extracting user Credentials
    let userObj = request.body;
    //Obtaining user Collection object
    const userCollection = request.app.get("userCollection")
    //obtaining user document from database 
    let dbUserObj = await userCollection.findOne({username:userObj.username})
    //validating username and password
    if(dbUserObj == null){
        response.send({message:"Invalid username"})
    }
    else{
        //comparing passwords from user Object and database User Object
        let valid = await bcryptjs.compare(userObj.password,dbUserObj.password);
        if(!valid){
            response.send({message:"invalid password"})
        }
        else{
            let token  =  jwt.sign({username:userObj.username},process.env.SECRET_KEY,{expiresIn:100})
            response.send({message:"valid password",payload:userObj,Token:token})
        }
    
    }
}))


//creating new user
userAPP.post("/create-user",expressAsyncHandler(async(request,response) =>{
    //obtaining user object from body
    let newUser = request.body
    console.log(newUser)
    //obtaining user collection object
    const userCollection = request.app.get("userCollection")
    //verify is username available or not
    let userAvailability = await userCollection.findOne({username:newUser.username})
    if(userAvailability != null){
        //send response that username is not available
        response.send({message:"username is not available"})
    }
    else{
        //hash the password using bcrypt
        let hashedPassword = await bcryptjs.hash(newUser.password,6);
        //update the password with hashed password
        newUser.password = hashedPassword;
        //inserting new user document into the user collection
        userCollection.insertOne(newUser);
        //send response with meaning full message
        response.send({message:"New user created"})
    }
}))
userAPP.put("/updateUser",expressAsyncHandler(async(request,response) =>{
    
}))

userAPP.delete("/deleteuser/:id",expressAsyncHandler(async(request,response) =>{
    
}))

module.exports = userAPP





