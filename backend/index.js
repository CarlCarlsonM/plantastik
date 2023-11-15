const express = require('express')
const app = express();
const mysql = require("mysql")
const cors = require("cors");


const dbPasswordSergio = "123456";
const dbPasswordCarlos = "password";
const dbPasswordNicolas = "root";


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({

  host: "localhost",
  user: "root",
  password: dbPasswordNicolas,
  database: "plantastik_db",

});


app.post("/create",(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;
    const age = req.body.age;
    const role = req.body.role; 
    db.query('INSERT INTO `user`(`name`, `email`, `password`, `gender`, `age`, `role`) VALUES (?, ?, ?, ?, ?,"USER")',
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

app.post("/login",(req,res)=>{
    
    const email = req.body.email;
    const password = req.body.password;
    
    db.query('SELECT * FROM `user` WHERE `email` = ? AND `password` = ?',
    [email,password],
    (err,result) =>{

        if(err){
            console.log(err)
        }

        if (result.length > 0){
            return res.json({message: "Success", userData: result[0]});
        }else{
            return res.json({message: "Failed"});
        }

    }
    );
})

app.post("/searchUser",(req,res)=>{
    
    const id = req.body.id;
    
    
    db.query('SELECT * FROM `user` WHERE `id_user` = ?;',
    [id],
    (err,result) =>{

        if(err){
            console.log(err)
        }

        if (result.length > 0){
            return res.json({message: "Success", userData: result[0]});
        }else{
            return res.json({message: "Failed"});
        }

    }
    );
})
 


app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});

app.get("/searchMyPlans", (req,res)=>{
    const id = req.query.id;
    db.query("SELECT `plan`.`name` AS `NombrePlan`,`user`.`name`,`description`,`address`,`avg_rating`, DATE_FORMAT(`date_time`, '%Y-%m-%d') AS `Fecha`,  TIME_FORMAT(`date_time`, '%H:%i') AS `Hora`, `image` FROM `plan`, `user` WHERE id_user_plan = ? and id_user = ?;", [id, id], 
    (err, result) =>{
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

