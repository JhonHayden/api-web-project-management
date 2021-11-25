import mongoose from "mongoose";
import { userModel } from "../usuario/usuario.js";

// codigo para definir tipos nuevos de datos de mis campos me permite tener un control de los tipos cuando
// quiero registrar un nuevo documento en la base de datos

const { Schema, model } = mongoose;

// Esquema de la coleccion proyectos
const projectSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            unique: true,
        },
        objetivos: [
            {
                descripcion: {
                    type: String,
                    required: true,
                },
                tipo: {
                    type: String,
                    enum: ['GENERAL', 'ESPECIFICO'],
                    required: true,
                }
            }
        ],
        presupuesto: {
            type: Number,
            required: true,
        },
        fechaInicio: {
            type: Date,
            required: true,
        },
        fechaFin: {
            type: Date,
            required: true
        },
        estado: {
            type: String,
            enum: ['ACTIVO', 'INACTIVO'],
            default: 'INACTIVO', // valor inicial por defecto
        },
        fase: {
            type: String,
            enum: ['INICIADO', 'EN_DESARROLLO', 'TERMINADO','NULA'],
            default: 'NULA',
        },
        lider: {
            type: Schema.Types.ObjectId, // va ser de tipo ObjectId el cual es el _id en mongo del usuario en la colecion u
            // usuarios esto con la finalidad de hacer una relacion fuerte entre dos colecciones
            required: true,
            ref: userModel, // me permite hacer una referencia fuerte, una relacion fuerte entre dos colecciones usuarios
            // y proyectos
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

//Virtual populate .. para consultar la parte many desde la parte one de una relacion one to many
projectSchema.virtual('avances', {
    ref: 'Avance', // la referencia va el nombre en el contexto de mongo del modelo a popular(es decir el primer
    //parametro de model
    localField: '_id',
    foreignField: 'proyecto'// campo donde esta la parte one de la relacion en el modelo de avances es decir
    // va el campo de avance donde me relaciona el modelo de proyecto
    // esto nos permite hacer en proyectos un populate de los avances 
});
projectSchema.virtual('inscripciones', {
    ref: 'Inscripcion', // la referencia va el nombre en el contextod de mongo del modelo a popular(es decir el primer
    //parametro de model
    localField: '_id',
    foreignField: 'proyecto'// campo donde esta la parte one de la relacion en el modelo de avances es decir
    // va el campo de avance donde me relaciona el modelo de proyecto
    // esto nos permite hacer en proyectos un populate de los avances 

    // EL metodo virtual de Schema de mongoose recibe en este caso un primer 
    // parametro que es el nombre del campo en el tipo proyecto de graphql que 
    // representa la relacion entre proyectos y inscripciones, segundo parametro 
    // es un objeto con tres atributos ref = es el nombre que se definio al contexto 
    // de mongo del modelo del metodo model de la coleccion a relacionar;
    // localfield es el id de la relacion coleccion inscripciones 
    // y el foreignField= es el campo en el tipo y modelo de inscripcion que me 
    // representa la relacion con el modelo de proyecto


    //Los virtual hay que hacerlos en la parte one de la relacion por ejemplo aqui es la parte one 
    // de la relacion con inscripciones un proyecto tiene muchas inscripciones y una inscripcion de un usuario 
    // solo a un proyecto es decir uso el virtual en la parte one de la relacion para poder mostrar informacion de la
    // parte many de la relacion y traerla como un arreglo
});

// modelo proyecto
const projectModel = model('Proyecto', projectSchema, 'Proyectos');
export { projectModel };