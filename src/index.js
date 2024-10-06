// require(`dotenv`).config({path:'./env})
import dotenv from "dotenv"
import connectDB from './db/index.js'; // Specify the exact file
import express from "express";
import { app } from "./app.js";



dotenv.config({
    path:"./env"
})
console.log("satyam")
connectDB()
.then(()=>{
    app.listen(process.env.PORT ,()=>{
      console.log(`Server is running at port: ${process.env.PORT}`);
      console.log("1")
    })
})
.catch((err)=>{
     console.log("MONGODB connection failed !!!",err);
});





/*

import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
const app =express()
(async ()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("ERRR: ",error);
        throw error;
       })
       app.listen(process.env.PORT,()=>{
          console.log(`App is listening on port ${process.envv.PORT}`);
       })
    }catch(error){
        console.error("ERROR",error)
        throw err
    }
})()
*/