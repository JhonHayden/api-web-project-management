import mongoose from "mongoose";  
import { projectModel } from "../proyecto/proyecto.js";
import { userModel } from "../usuario/usuario.js";

const {Schema, model} = mongoose;

// Esquema coleccion avances 
const avanceSchema = new Schema({

    fecha: {
        type: Date,
        required: true,
    },
    descripcion: {
        type: String,
        required:true,
    },
    observaciones: [  // esta observaciones son del usuario lider y son despues de crear el avance, no es required
        {
            type: String,
        },
    ],
    proyecto: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: projectModel,
    },
    creadoPor: {
        type: Schema.Types.ObjectId,
        ref: userModel,
        required:true,
    },
});

// nodelo avance
const avanceModel = model('Avance', avanceSchema, "Avances");

export { avanceModel }