const express = require('express')
const app = express();
const mysql = require("mysql")
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:'123456',
    database:'plantastik_db'
});


app.post("/create",(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;
    const age = req.body.age;
    const role = req.body.role;

    
    db.query('INSERT INTO `user`(`name`, `email`, `password`, `gender`, `age`, `role`) VALUES (?, ?, ?, ?, ?,?)',
    [name,email,password,gender,age,role],
    (err,result) =>{

        if(err){
            console.log(err)
        }else{
            res.send("Usuario registrado")
        }

    }
    );
})
 

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})