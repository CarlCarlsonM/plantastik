import { connectDB } from "../db.js";

//Ver informacion del usuario
export const profile = async (req, res) => {
    const id_user = req.body.id;
    const connection = await connectDB();
    await connection.query('SELECT * FROM `user` WHERE `id_user` = ?',
        [id_user],
        (err, result) => {
            if (err) {
                connection.end();
                return res.json({ message: "Failed" });
            } else {
                connection.end();
                return res.json({ message: "Success", userData: result[0] })
            }
        }
    );
};


export const updateUser = async (req, res) => {
    const { name, gender, age, id } = req.body;

    const connection = await connectDB();
    await connection.query('UPDATE user SET name = ?,gender = ?,age = ? WHERE id_user = ?',
        [name, gender, age, id],
        (err, result) => {
            if (err) {
                connection.end();
                return res.json({ message: "Failed" })
            } else {
                connection.end();
                return res.json({ message: "Update_User" })
            }
        }
    );
};


export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const connection = await connectDB();
    await connection.query('DELETE FROM `user` WHERE `id_user` = ?', [id],
        (err, result) => {
            if (err) {
                connection.end();
                console.log(err);
            } else {
                connection.end();
                return res.json({ message: "User_successfully_deleted" });
            }
        }
    );
};


export const searchMyRole = async (req, res) => {
    const id = req.query.id;
    const connection = await connectDB();
    connection.query("SELECT role from user where id_user=?;", [id],
        (err, result) => {
            if (err) {
                connection.end();
                alert("EL usuario No Se encuentra Loggeado");
            } else {
                connection.end();
                res.send(result)
            }
        }
    );
};
