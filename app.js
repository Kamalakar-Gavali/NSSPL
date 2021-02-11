const express=require('express');
const app=express();
const cors=require('cors')
app.use(cors());
const bodyParser=require('body-parser');
const path=require('path');
const userModel=require('./Models/userModel');
const TaskModel = require('./Models/TaskModel');
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

const nullOrUndefined=(value)=> value===null ||value==='' ||value===undefined ?true:false;

app.post('/signup',async(req,res)=>{
    const data=req.body;
    const response=await userModel.findOne({email:data.email})
    console.log(response);
    if(nullOrUndefined(response))
    {
        const newUser=new userModel(data);
         await newUser.save();
         res.status(200).send({"ok":true,"msg":"Successfully Signup"});
         console.log("created");

    }else
    { 
        //console.error("Username Already exist"+data.email);
        res.status(401).send({"msg":"Username Already exist"});
        
    }
    
})

app.post('/login',async(req,res)=>{

    const data=req.body;
    console.log(data.password)
    const response=await userModel.findOne({email:data.email})
    console.log(response);
    if(!nullOrUndefined(response))
    {
        console.log(response.password)
        if(response.password==data.password)
        {
            res.send({"ok":true,"msg":"successfully login","currentUser":data.email,"groupId":response.groupId});
        }
        else
        {
            res.status(404).send({"msg":"Please Enter Correct Password"});
        }

    }
    else
    {
        
        res.status(401).send({"msg":`${req.body.email} dosent' exist,Signup first`});
    }
})
app.post('/addTask',async(req,res)=>{
    const data=req.body;
    const response=await TaskModel.findOne({taskTitle:data.taskTitle}) ;
    
    if(nullOrUndefined(response))
    {
    console.log(data);
     const newTask=new TaskModel(data);
     await newTask.save();
     res.status(201).send({"ok":true,"msg":"Task Added Successfully",newData:data})
    }
    else
    {
        res.status(404).send({"msg":"Title Alredy exists,Please Choose Another"})
    }

})
app.get('/tasks',async(req,res)=>{
      const response=await TaskModel.find();
      res.send(response);
})
app.post('/users',async (req,res)=>{
    const response=await userModel.find({groupId:{$gte:Number(req.body.groupId)}});
    console.log(response);
    res.send(response);
})
app.get('/users',async(req,res)=>{
    const data=await userModel.find();
    res.send(data);
})
app.put('/tasks',async(req,res)=>{

       const data= await TaskModel.findByIdAndUpdate(req.body.id,{assignedTo:req.body.newAssignedUser},(err,result)=>{
        console.log(result);
       })
        
        res.status(200).send({msg:`Task is taken away from ${req.body.prevUserEmail} and Assigned To ${req.body.newAssignedUser}`})

})
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

module.exports=app;