const express=require('express');
const app=require('./app');
let port=process.env.PORT||9999;
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://atlasMongoDb:4R2c9vlAeg0r9DyC@cluster0.1vudo.mongodb.net/nsspl', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open',()=>{
    console.log("Connection Establish with Database")
}).on('connectionError',(err)=>{
    console.log(err);
})
app.listen(port,()=>console.log(`Server Started on port ${port}` ));