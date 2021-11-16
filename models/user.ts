import { Schema, model } from "mongoose";// me permite poder usar un esquema y un modelo

import { Enum_EstadoUsuario, Enum_RolUsuario } from "./enumeradores";

// codigo para definir tipos nuevos de datos de mis campos me permite tener un control de los tipos 
interface User {
    identificacion: string; // estos son tipos de datos de typescript
    nombre: string; // estos son tipos de datos de typescript
    apellido: string;  // estos son tipos de datos de typescript
    correo: string;  // estos son tipos de datos de typescript
    rol: Enum_RolUsuario;  // estos son tipos de datos de typescript
    estado: Enum_EstadoUsuario;
}

// Esquema de la coleccion Usuarios

const userSchema = new Schema<User>({

    // esquema y estructura de los campos de la coleccion Usuarios, formato de un documento en la base de datos
    identificacion: {
        type: String,// estos son tipos de datos del Schema o mongoose 
        required: true,
        unique: true
    },
    nombre: {
        type: String,// estos son tipos de datos del Schema o mongoose 
        required: true
    },
    apellido: {
        type: String,// estos son tipos de datos del Schema o mongoose 
        required: true
    },
    correo: {
        type: String,// estos son tipos de datos del Schema o mongoose 
        required: true,
        unique: true,
        validate: { // me permite hacer validaciones a los inputs 
            validator:
                (email) => {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email); // expresion regular para 
                    // validar el email o correo electronico ingresado por el usuario la funcion test(email) evalua 
                    // la expresion regular junto con el email y si cumple con el formato de la expresion regular 
                    // retorna un true si no cumple retorna false 
                    // las expresiones regulares me permiten encontrar patrones de caracteres en una cadena de texto 
                    // string
                },

            // (email) => {
            //     if (email.includes('@') && email.includes('.')) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // },
            message: ' El formato del correo electronico no es valido',
        }
    },
    rol: {
        type: String,
        required: true,
        enum: Enum_RolUsuario, // enumerador 
    },
    estado: {
        type: String,
        // required: true,
        enum: Enum_EstadoUsuario, // enumerador
        default: Enum_EstadoUsuario.pendiente, //valor por defecto 
    }

});

// modelo usuario : este usa el esquema y sera el usado para hacer los query a la base datos 
// el modelo nos permite atraves de el hacer la conexion a la coleccion de mongo y con este se hace todas
// las operaciones a la base de datos 
const userModel = model('User', userSchema); // model funcion recibe como argumento primero un nombre del
// modelo dentro del contexto de mongoose (User), el segundo es el esquema y un 
// tercer argumento opcional que es el nombre como tal de la coleccion en mongo db


// export default userModel ; // este tipo de exportacion esta expuesta a que en los import de pueda definir
// un nombre cualquiera para usar la funcion userModel el cual es el modelo de los documentos de la coleccion usuarios

export { userModel }; // este tipo de exportacion me define por obligatoriedad los nombres de los import y no se 
// puede modificar, siempre se debe nombrar userModel cada vez que se haga un import de la funcion userModel