import { connectDB } from "../db.js";


export const seeUsers = async (req, res) => {
    const id = req.query.id;
    const connection = await connectDB();
    console.log("sadfasdfasdfasdfasdfasdfasdfa")
    connection.query("SELECT * FROM user",
        (err, result) => {
            if (err) {
                connection.end();
                console.log(err);
                console.log("sadfasdfasdfasdfasdfasdfasdfa")
            } else {
                connection.end();
                
                res.send(result)
                console.log("sadfasdfasdfasdfasdfasdfasdfa")
            }
        }
    );
};
