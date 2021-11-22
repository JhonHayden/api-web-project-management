import mongoose from "mongoose";// importamos mongoose para luego usara 
//  You can connect to MongoDB with the mongoose.connect() method.

// const {connect} = require ('mongoose'); // la manera tradicional e inicial de importar un modulo o funcionalidad 

const conectarBD = async () => { // funcion que me retorna la conexion a la base de datos .. el metodo
    // connect recibe como argumento el String de conexion a la base de datos 

    return await mongoose.connect(process.env.DATABASE_URL).then(() => { // despues de conectarse a la base de datos ejecuta el entonces .then si se conecto bien si no ejecuta
            // el .catch
            console.log("Conexion exitosa")
        }).catch((error) => {
            console.error('Error conectado a la BD', error);
        })
    // los string de conexion a  la base de datos tiene primero la arquitectura de la base de datos = mongodb+srv://
    //luego el usuario y contraseña = admin:admin 
    // despues el host =  @clusterwebprojectmanage.0lp19.mongodb.net/
    // luego en nombre de la base de datos = gestionProyectos
    
}
export default conectarBD;