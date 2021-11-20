import { Schema, model } from "mongoose";// me permite poder usar un esquema y un modelo
import { Enum_EstadoProyecto, Enum_FaseProyecto, Enum_TipoObjetivo } from "../enumeradores/enumeradores";
import { userModel } from "../usuario/usuario";


// codigo para definir tipos nuevos de datos de mis campos me permite tener un control de los tipos cuando 
// quiero registrar un nuevo documento en la base de datos
interface Project {
    identificacion: string; // estos son tipos de datos de typescript
    nombre: string; // estos son tipos de datos de typescript
    presupuesto: number;  // estos son tipos de datos de typescript
    fechaInicio: Date;  // estos son tipos de datos de typescript
    fechaFin: Date;  // estos son tipos de datos de typescript
    estado: Enum_EstadoProyecto;
    fase: Enum_FaseProyecto;
    objetivos: [{ descripcion: string; tipo: Enum_TipoObjetivo }];// array de objetivos es un arreglo de objetos cada
    // objeto sera un objetivo, los objetos tiene dos campos dos atributos la descripcion y el tipo 
    lider: Schema.Types.ObjectId; // tipo de mongoose objectid
}

// Esquema de la coleccion proyectos 

const projectSchema = new Schema<Project>(
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
                    enum: Enum_TipoObjetivo,
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
            enum: Enum_EstadoProyecto,
            default: Enum_EstadoProyecto.INACTIVO, // valor inicial por defecto 

        },
        fase: {
            type: String,
            enum: Enum_FaseProyecto,
            default: Enum_FaseProyecto.NULA,
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
    ref: 'Inscripcion', // la referencia va el nombre en el contexto de mongo del modelo a popular(es decir el primer
    //parametro de model
    localField: '_id',
    foreignField: 'proyecto'// campo donde esta la parte one de la relacion en el modelo de avances es decir
    // va el campo de avance donde me relaciona el modelo de proyecto
    // esto nos permite hacer en proyectos un populate de los avances 
});



// modelo proyecto

const projectModel = model('Project', projectSchema, 'Proyectos');


export { projectModel };