import { Schema, model } from "mongoose";
import { Enum_EstadoInscripcion } from "../enumeradores/enumeradores";
import { projectModel } from "../proyecto/proyecto";
import { userModel } from "../usuario/usuario";

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
        default:null,
    },
    fechaEgreso: {
        type: Date,
        default:null,
    },
    estado: {
        type: String,
        enum: Enum_EstadoInscripcion,
        default: Enum_EstadoInscripcion.PENDIENTE,
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