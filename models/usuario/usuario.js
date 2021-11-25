import mongoose from "mongoose"; // me permite poder usar un esquema y un modelo
const { Schema, model } = mongoose;
// Esquema de la coleccion Usuarios
const userSchema = new Schema({
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
    password: {
        type:String,
        required:true,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ESTUDIANTE', 'LIDER', 'ADMINISTRADOR'], // enumerador 
    },
    estado: {
        type: String,
        // required: true,
        enum: ['PENDIENTE', 'AUTORIZADO', 'NO_AUTORIZADO'], // enumerador
        default: 'PENDIENTE', //valor por defecto 
    }
},
    { // Configuracion requerida para que cuando se renderize un esquema de proyecto me permita sacar los 
        // esquemas vituales , y mostrarlos ahora lo siguiente es ir a los tipos de proyectos y definir el campo
        //  avances en el type de proyecto y que retorne un array de avances y asi por ultimo ir a los resolver
        // y hacer el populate en el query que se quiera mostrar los avances 

        toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
        toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
    }
);
userSchema.virtual('proyectosLiderados', { // proyectosLiderados es el nuevo campo vitual del type de usuario 
    // el cual sera el que popularemos es decir populate ("proyectosLiderados")
    ref: 'Proyecto',
    localField: '_id',
    foreignField: 'lider',
});
userSchema.virtual('inscripciones', {
    ref: 'Inscripcion',
    localField: '_id',
    foreignField: 'estudiante',
});
userSchema.virtual('avancesCreados', {
    ref: 'Avance',
    localField: '_id',
    foreignField: 'creadoPor'
});
// modelo usuario : este usa el esquema y sera el usado para hacer los query a la base datos 
// el modelo nos permite atraves de el hacer la conexion a la coleccion de mongo y con este se hace todas
// las operaciones a la base de datos 
const userModel = model('Usuario', userSchema, "Usuarios"); // model funcion recibe como argumento primero un nombre del
// modelo dentro del contexto de mongoose (User), el segundo es el esquema y un 
// tercer argumento opcional que es el nombre como tal de la coleccion en mongo db
// export default userModel ; // este tipo de exportacion esta expuesta a que en los import se pueda definir
// un nombre cualquiera para usar la funcion userModel el cual es el modelo de los documentos de la coleccion usuarios
export { userModel }; // este tipo de exportacion me define por obligatoriedad los nombres de los import y no se 
// puede modificar, siempre se debe nombrar userModel cada vez que se haga un import de la funcion userModel