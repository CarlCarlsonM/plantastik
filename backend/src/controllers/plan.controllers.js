import { connectDB } from "../db.js";

export const searchMyPlans = async (req, res) => {
    const id = req.query.id;
    updateStatePlan()
    const connection = await connectDB();
    connection.query("SELECT `plan`.`id_plan`,`plan`.`name` AS `NombrePlan`,`user`.`name`,`description`,`address`,`avg_rating`, DATE_FORMAT(`date_time`, '%Y-%m-%d') AS `Fecha`,  TIME_FORMAT(`date_time`, '%H:%i') AS `Hora`, `image` FROM `plan`, `user` WHERE id_user_plan = ? and id_user = ?;", [id, id],
        (err, result) => {
            if (err) {
                connection.end();
                console.log(err);
            } else {
                connection.end();

                res.send(result)
                
            }
        }
    );
};

export const searchAllPlans = async (req, res) => {
    const id = req.query.id;
    updateStatePlan()
    const connection = await connectDB();
    connection.query("SELECT `plan`.`id_plan`, `plan`.`name` AS `NombrePlan`, `user`.`name`, `description`, `address`, `avg_rating`, DATE_FORMAT(`date_time`, '%Y-%m-%d') AS `Fecha`, TIME_FORMAT(`date_time`, '%H:%i') AS `Hora`, `image`, COALESCE(NumComentarios, 0) AS NumComentarios FROM `plan` JOIN `user` ON `plan`.`id_user_plan` = `user`.`id_user` LEFT JOIN (SELECT id_plan_rating, count(*) as NumComentarios FROM `rating` GROUP BY id_plan_rating) as cuenta ON id_plan = id_plan_rating", [id, id],
        (err, result) => {
            if (err) {
                connection.end();
                console.log(err);
            } else {
                connection.end();
                
                res.send(result)
                
            }
        }
    );
};

export const searchPlanByName = async (req, res) => {
    const name = req.params.name;
    console.log(name);
    updateStatePlan()
    const connection = await connectDB();
    connection.query("SELECT `plan`.`id_plan`, `plan`.`name` AS `NombrePlan`, `user`.`name`, `description`, `address`, `avg_rating`, DATE_FORMAT(`date_time`, '%Y-%m-%d') AS `Fecha`, TIME_FORMAT(`date_time`, '%H:%i') AS `Hora`, `image`, COALESCE(NumComentarios, 0) AS NumComentarios FROM `plan` JOIN `user` ON `plan`.`id_user_plan` = `user`.`id_user` LEFT JOIN (SELECT id_plan_rating, count(*) as NumComentarios FROM `rating` GROUP BY id_plan_rating) as cuenta ON id_plan = id_plan_rating WHERE `plan`.`name` = ?", [name],
        (err, result) => {
            if (err) {
                connection.end();
                console.log(err);
            } else {
                connection.end();
                console.log(result);
                res.send(result)
                
            }
        }
    );
};

//consulta para los detalles de un plan
export const DetailPlan = async (req, res) => {
    const id = req.query.id;
    updateStatePlan()
    const connection = await connectDB();
    connection.query("SELECT `image`,`avg_rating`,`plan`.`name` as planName,`user`.`name`,`description`, DATE_FORMAT(`date_time`, '%Y-%m-%d') AS `date`, TIME_FORMAT(`date_time`, '%H:%i') AS `time`,`min_price`,`max_price`,`address` FROM `plan` JOIN `user` ON id_user_plan = id_user WHERE id_plan = ?", [id],
        (err, result) => {
            
            if (err) {
                connection.end();
                console.log(err);
            } else {
                console.log(result);
                connection.end();
                res.send(result) 
            }
        }
    );
};

export const listarData = async (req, res) => {
    const {idplan} = req.body;

    const connection = await connectDB();

    await connection.query('SELECT `name`, `comment`, `rating` FROM `user` JOIN  `rating` ON ( id_user  = id_user_rating) AND id_plan_rating = ? ',
        [idplan],
        
        (err,result) =>{
            if (err) {
                connection.end();
                console.log(err);
            } else {
                
                connection.end();
                res.send(result) 
            }
        }
    )
}

export const updateRating = async(req, res) =>{

    const {idplan}=req.body;
    const connection = await connectDB();

    await connection.query('UPDATE `plantastik_db`.`plan` SET  `avg_rating` = ( SELECT AVG(`rating`)/5 as promedio FROM `rating` WHERE `id_plan_rating`= ? ) WHERE `id_plan`= ? ', 
    [idplan,idplan],
    
    (err, result) =>{

        if (err) {
            connection.end();
            console.log(err);
        } else {
            connection.end();
            return res.json({ message: "succesful_insert" });
        }
    }
    ) 
}

export const ratingPlan = async(req, res) =>{
    const {idplan, iduser,rating,comment}=req.body;

    const connection = await connectDB();

    await connection.query('INSERT INTO `plantastik_db`.`rating` (`id_plan_rating`, `id_user_rating`,`rating`,`comment`) VALUES (?,?,?,?)', 
    [idplan,iduser,rating,comment],

    (err, result)=>{
        if (err) {
            connection.end();
            console.log(err);
        } else {
            connection.end();
            return res.json({ message: "succesful_insert" });
        }
    }

    )

}

export const userCommentsValidation = async(req, res) =>{
    const {idplan, iduser}=req.body;

    const connection = await connectDB();

    await connection.query('SELECT count(`id_user_rating`) as conteo FROM `plantastik_db`.`rating` WHERE `id_plan_rating`= ? AND `id_user_rating`= ? ',
    [idplan,iduser],

        (err,result) =>
        {
            if (err) {
                connection.end();
                console.log(err);
            } else {
                
                connection.end();
                res.send(result) 
            }
        }
        
    )

}

//consulta para saber si un usuario esta interesado en un plan
export const Interested = async (req, res) => {
    const { idplan, iduser } = req.query;
    updateStatePlan()

    const connection = await connectDB();

    await connection.query('SELECT * FROM `user_has_plans` WHERE id_user_uhp = ? AND id_plan_uhp = ?',
        [iduser, idplan],
        
        (err, result) => {
            
            if (err) {
                connection.end();
                return res.json({ message: "Failed" });
            } 
            
            if(result.length > 0) {
                connection.end();
                return res.json({ message: "Interested", userData: result[0] });
            }else{
                connection.end();
                return res.json({ message: "notInterested" });
            }
        }
    );
};


//borrar registro en la tabla de usuarios interesados, si se deja estar interesado

export const NotInterested = async (req, res) => {

    const { idplan, iduser } = req.query;
    const connection = await connectDB();
    await connection.query('DELETE FROM `user_has_plans` WHERE `id_user_uhp` = ? AND `id_plan_uhp` = ?', [iduser,idplan],
        (err, result) => {
            if (err) {
                connection.end();
                console.log(err);
            } else {
                connection.end();
                return res.json({ message: "succesful_delete" });
            }
        }
    );
};

//agregar registro en la tabla de usuarios interesados, si se esta interesado

export const BeInterested = async (req, res) => {
    const { idplan, iduser } = req.body;

    const connection = await connectDB();
    await connection.query('INSERT INTO `plantastik_db`.`user_has_plans` (`id_user_uhp`, `id_plan_uhp`) VALUES (?,?)', [iduser,idplan],
        (err, result) => {
            if (err) {
                connection.end();
                console.log(err);
            } else {
                connection.end();
                return res.json({ message: "succesful_add" });
            }
        }
    );
};


//Actualizar un plan
export const updatePlan = async (req, res) => {
    const { name, description, date, time, min_price, max_price, address, id_plan, id_user_plan } = req.body;
    const date_time = `${date} ${time}:00`
    const id_plan_number = Number(id_plan) 
    const connection = await connectDB();
    await connection.query('UPDATE `plan` SET `name` = ?, `description` = ?, `date_time` = ?, `min_price` = ?, `max_price` = ?, `address` = ? WHERE `id_plan` = ? AND `id_user_plan` = ?',
        [name, description, date_time, min_price, max_price, address,id_plan, id_plan_number,id_user_plan],
        (err, result) => {
            if (err) {
                connection.end();
                console.log("error");
                return res.json({ message: "Failed" })
            } else {
                connection.end();
                console.log(result)
                return res.json({ message: "Update_Plan" })
            }
        }
    );
};

export const createMyPlan = async (req, res) => {
    const {name, description, address, avgRating, date, time, state, minPrice, maxPrice, image, id_user} = req.body;
    const date_time = `${date} ${time}:00`
    const connection = await connectDB();
    connection.query("INSERT INTO `plan` (`id_user_plan`, `name`, `description`, `address`, `avg_rating`,`date_time` , `state`, `min_price`, `max_price`, `image`) VALUES (?,?,?,?,?,?,?,?,?,?);",
    [id_user,name,description,address,avgRating,date_time,state,minPrice,maxPrice,image],
        (err, result) => {
            if (err) {
                connection.end();
                console.log(err);
            } else {
                connection.end();
                res.send(result)
                
            }
        }
    );
};
 
export const updateStatePlan = async () => {
    const connection = await connectDB();

    await connection.query("SELECT * FROM plan",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                result.forEach((row) => {
                    const fechaPlan = new Date(row.date_time)
                    const id_plan = row.id_plan
                    const fecha = new Date();
                    const state = "Finalizado"
                    if (fechaPlan < fecha) {
                        connection.query('UPDATE `plan` SET `state` = ? WHERE `id_plan` = ?',
                            [state, id_plan],
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                            }
                        )
                    }
                })
            }
        }
    );
};
