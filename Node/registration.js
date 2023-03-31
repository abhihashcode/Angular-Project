const express = require('express');
const router=express.Router();
const db=require('./config/db.js');
const multer = require('multer')
const path = require('path')
const {exeCommand} =require('./config/cmdExecution.js');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(file);
    //   var filepath = `./uploads`
      var filepath = `\\\\192.168.1.123\\ngdata\\kazyplayimages\\profile_img\\`;
  console.log('filepath',filepath);
      if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath, {recursive: true});
        cb(null, filepath);
      } else {
        cb(null, filepath);
      }
    },
  
    filename: function (req, file, cb) {
  
      // cb(null, file.originalname.split('_').splice(-1)[0])
      cb(null, file.originalname)
  
    }
  })
  
  const upload = multer({ storage: storage, preservePath: true})

  function fileupload(req,res,next){
      upload.array("image")(req,res,next);
      next();
      res.json('success')
  }
  
//    console.log(image);

router.post('/profile',fileupload,(req,res)=>{
    console.log('hit');
//    
});


router.get('/getUserData',(req,res)=>{
    const sql=`select *from abhishek`
     exeCommand(sql)
    .then(result=>res.json(result))
    .catch(err=>console.log(err));
});

router.post('/deleteUser',(req,res)=>{
    var id=req.body.id;
    const sql=`delete from abhishek where id='${id}' `
     exeCommand(sql)
    .then(result=>res.json('deleted'))
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
    console.log(image+"Update");
    
    var sssql=`update abhishek set name='${name}', email='${email}', username='${username}', password='${password}', age='${age}',image= '${image}'  where id='${id}'`;
     exeCommand(sssql)
    .then(result=>{res.json("updated")})
    .catch(err=>console.log(err));
});

router.post('/registrationSubmitData',(req,res)=>{
    var {name,email,username,password,age, filepath}=req.body;

    const sql=`insert into abhishek (name, email, username, password, age,image) values('${name}','${email}','${username}','${password}','${age}','${filepath}') `
     exeCommand(sql)
    .then(result=>{res.json('save')})
    .catch(err=>console.log(err));
});

module.exports=router;
