// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import { app } from "./app.js";
import mongoose from "mongoose";
import{ DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: './ env'
})

connectDB()
.then(() => {
    app.listen(process.env.port || 8000,()=> {
        console.log(` Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ",err);
})

/*
import express from "express"
const app = express()

;( async () => {
    try{
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror",(error)=>{
            console.log("ERRR: ",error);
            throw error
        })
        app.listen(process.env.port, ()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }
    catch(error){
        console.error("ERROR: ",error)
        throw err
    }
})()
*/