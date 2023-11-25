import { connectDB } from "../db.js";

export const statsgender = async (req, res) => {
    const connection = await connectDB();
    connection.query("SELECT SUM(CASE WHEN gender = 'Femenino' THEN 1 ELSE 0 END) AS 'Femenino', SUM(CASE WHEN gender = 'Masculino' THEN 1 ELSE 0 END) AS 'Masculino', SUM(CASE WHEN gender = 'Bombastik' THEN 1 ELSE 0 END) AS 'Bombastik' FROM user WHERE role != 'ADMIN';",
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

export const statsage = async (req, res) => {
    const connection = await connectDB();
    connection.query("SELECT SUM(CASE WHEN age BETWEEN 18 AND 24 THEN 1 ELSE 0 END) AS '18-24', SUM(CASE WHEN age BETWEEN 25 AND 40 THEN 1 ELSE 0 END) AS '25-40', SUM(CASE WHEN age BETWEEN 41 AND 60 THEN 1 ELSE 0 END) AS '41-60', SUM(CASE WHEN age BETWEEN 61 AND 100 THEN 1 ELSE 0 END) AS '61-100', SUM(CASE WHEN age < 18 OR age > 100 THEN 1 ELSE 0 END) AS 'Otro' FROM user WHERE role!='ADMIN';",
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