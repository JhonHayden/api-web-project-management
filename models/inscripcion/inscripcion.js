import mongoose from "mongoose";  
import { projectModel } from "../proyecto/proyecto.js";
import { userModel } from "../usuario/usuario.js";

const {Schema, model} = mongoose;

// Esquema coleccion inscripciones 
const inscripcionSchema = new Schema({

    fechaIngreso: {
        type: Date,
        default:null,
    },
    fechaEgreso: {
        type: Date,
        default:null,
    },
    estado: {
        type: String,
        enum: ['ACEPTADA','RECHAZADA','PENDIENTE'],
        default:'PENDIENTE',
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: projectModel,
        required: true,
        unique:false,
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: userModel,
        required: true,
        unique:false,
    },
});

//modelo inscripcion
const inscripcionModel = model('Inscripcion', inscripcionSchema, 'Inscripciones');

export { inscripcionModel };