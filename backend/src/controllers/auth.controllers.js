import { connectDB } from "../db.js";

//Registrar nuevo usuario
export const register = async (req, res) => {
    const { name, email, password, gender, age, role } = req.body;
    const connection = await connectDB();

    //Guardar el usuario en la base de datos
    await connection.query('INSERT INTO `user`(`name`, `email`, `password`, `gender`, `age`, `role`) VALUES (?, ?, ?, ?, ?,"USER")',
        [name, email, password, gender, age, role],
        (err, result) => {

            if (err) {
                res.status(500).json({ message: err.message });
                connection.end();
            } else {
                res.send("Usuario registrado")
                connection.end();
            }
        }
    );
};


//Login del usuario
export const login = async (req, res) => {
    const { email, password } = req.body;

    const connection = await connectDB();

    await connection.query('SELECT * FROM `user` WHERE `email` = ? AND `password` = ?',
        [email, password],
        (err, result) => {
            if (err) {
                connection.end();
                return res.json({ message: "Failed" });
            } else {
                connection.end();
                return res.json({ message: "Success", userData: result[0] });
            }
        }
    );
};

//Cerrar sesión
export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}
