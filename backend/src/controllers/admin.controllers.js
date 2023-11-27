import { connectDB } from "../db.js";


export const seeUsers = async (req, res) => {
    const id = req.query.id;
    const connection = await connectDB();
    connection.query("SELECT * FROM user",
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

export const seePlns = async (req, res) => {
    const id = req.query.id;
    const connection = await connectDB();
    connection.query("SELECT * FROM plan",
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
