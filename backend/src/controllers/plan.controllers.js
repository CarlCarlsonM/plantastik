import { connectDB } from "../db.js";

export const searchMyPlans = async (req, res) => {
    const id = req.query.id;
    const connection = await connectDB();
    connection.query("SELECT `plan`.`name` AS `NombrePlan`,`user`.`name`,`description`,`address`,`avg_rating`, DATE_FORMAT(`date_time`, '%Y-%m-%d') AS `Fecha`,  TIME_FORMAT(`date_time`, '%H:%i') AS `Hora`, `image` FROM `plan`, `user` WHERE id_user_plan = ? and id_user = ?;", [id, id],
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


