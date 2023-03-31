const express = require('express');
const router=express.Router();
const db=require('./config/db.js');
const {exeCommand} =require('./config/cmdExecution.js');

router.post('/loginUser',(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
    const sql=`select *from abhishek where email='${email}' and password='${password}' `
     exeCommand(sql)
    .then(result=>{
        if(result.length>0)
        {
            res.json("valid")
        }
        else{
            res.json('invalid')
        }
    })
    .catch(err=>console.log(err));
});

module.exports = router;