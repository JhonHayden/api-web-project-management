import { Schema, model } from "mongoose";// me permite poder usar un esquema y un modelo
import { projectModel } from "./project";
import { userModel } from "./user";

interface Avance {
// como buena practica colocar primero los campos que son propios del modelos y por ultimo las relaciones
    fecha: Date; 
    descripcion: string;
    observaciones: [string];//array de observaciones 
    proyecto: Schema.Types.ObjectId;// como buena practica colocar las relaciones de ultimo 
    creadoPor: Schema.Types.ObjectId;
}

// Esquema coleccion avances 
const avanceSchema = new Schema<Avance>({

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
const avanceModel = model('Avance', avanceSchema);

export { avanceModel }