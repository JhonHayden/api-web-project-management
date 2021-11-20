import mongoose from "mongoose";  
// me permite poder usar un esquema y un modelo
import { userModel } from "../usuario/usuario.js";


// codigo para definir tipos nuevos de datos de mis campos me permite tener un control de los tipos cuando 
// quiero registrar un nuevo documento en la base de datos

const {Schema, model} = mongoose;

// Esquema de la coleccion proyectos 

const projectSchema = new Schema({

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
        enum: ['INICIADO', 'EN_DESARROLLO', 'TERMINADO'],
        default: 'NULA',
    },
    lider: {
        type: Schema.Types.ObjectId, // va ser de tipo ObjectId el cual es el _id en mongo del usuario en la colecion u
        // usuarios esto con la finalidad de hacer una relacion fuerte entre dos colecciones 
        required: true,
        ref: userModel, // me permite hacer una referencia fuerte, una relacion fuerte entre dos colecciones usuarios 
        // y proyectos
    }

});

// modelo proyecto

const projectModel = model('Project', projectSchema, 'Proyectos');


export { projectModel };