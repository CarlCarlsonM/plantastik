import mysql from 'mysql';

export const connectDB = async () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'plantastik_db'
    });

    return new Promise((resolve, reject) => {
        connection.connect((error) => {
            if (error) {
                console.log('Error de conexión');
                reject(error);
            } else {
                console.log('Conexión exitosa a la base de datos.');
                resolve(connection);
            }
        });
    });
};
