import { Schema, model } from "mongoose";
import { Enum_EstadoInscripcion } from "./enumeradores";
import { projectModel } from "./project";
import { userModel } from "./user";

interface Inscripcion {

    fechaIngreso: Date;
    fechaEgreso: Date;
    estado: Enum_EstadoInscripcion;
    proyecto: Schema.Types.ObjectId;
    estudiante: Schema.Types.ObjectId;

}

// Esquema coleccion inscripciones 
const inscripcionSchema = new Schema<Inscripcion>({

    fechaIngreso: {
        type: Date,
        required: true,
    },
    fechaEgreso: {
        type: Date,
        required: true,
    },
    estado: {
        type: String,
        enum: Enum_EstadoInscripcion,
        required: true,
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: projectModel,
        required: true,

    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: userModel,
        required: true,
    },
});

//modelo inscripcion
const inscripcionModel = model('Inscripcion', inscripcionSchema, 'Inscripciones');

export { inscripcionModel };