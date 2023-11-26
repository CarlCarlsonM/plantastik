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
    connection.query("SELECT SUM(CASE WHEN age BETWEEN 18 AND 24 THEN 1 ELSE 0 END) AS 'EdadA', SUM(CASE WHEN age BETWEEN 25 AND 40 THEN 1 ELSE 0 END) AS 'EdadB', SUM(CASE WHEN age BETWEEN 41 AND 60 THEN 1 ELSE 0 END) AS 'EdadC', SUM(CASE WHEN age BETWEEN 61 AND 100 THEN 1 ELSE 0 END) AS 'EdadD', SUM(CASE WHEN age < 18 OR age > 100 THEN 1 ELSE 0 END) AS 'Otro' FROM user WHERE role!='ADMIN';",
        (err1, result1) => {
            if (err1) {
                connection.end();
                console.log(err1);
            } else {
                connection.end();
                res.send(result1)
            }
        }
    );
    
};