const express = require('express');
const router=express.Router();
const db=require('./config/db.js');
const {exeCommand} =require('./config/cmdExecution.js');

router.post('/editUser',(req,res)=>{
    var id=req.body.id;
    const sql=`select *from abhishek where id='${id}' `
   
     exeCommand(sql)
    .then(result=>{
        console.log(result)
        res.json(result)})
    .catch(err=>console.log(err));
});

router.post('/updateUser',(req,res)=>{
    var id=req.body.editform.id;
    var name=req.body.editform.fnname;
    var age=req.body.editform.agee;
    var email=req.body.editform.emmail;
    var password=req.body.editform.passsword;
    var username=req.body.editform.ussername;
    var image=req.body.editform.filepath;
    
    var sssql=`update abhishek set name='${name}', email='${email}', username='${username}', password='${password}', age='${age}', image='${image}'  where id='${id}'`;
     exeCommand(sssql)
    .then(result=>{res.json("updated")})
    .catch(err=>console.log(err));
});


module.exports = router;