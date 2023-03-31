const express =require('express');
const register=require('./registration.js');
const login=require('./loginUser.js');
const edit=require("./editUser.js");
var cors = require('cors');
const bodyparser = require('body-parser')
const app=express();
const PORT= 55000;


app.use(express.static("./public"))
 
// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))


app.use(express.json())
app.use(express.urlencoded())
app.use(cors());
app.use('/register',register);
app.use('/login',login);
app.use("/edit",edit)

app.listen(PORT,()=>{
    console.log("Server is listening on " , PORT);
});