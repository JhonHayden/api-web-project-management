import { projectModel } from "./proyecto.js";
const resolversProyecto = {  // existen dos tipos de resolver (Query y mutacion) Query hace la 
    // operacion de leer obtener get datos de la base de datos es decir hace la R de un CRUD
    // la mutacion hace cualquier cambio o modificacion de los datos de la base de datos 
    // es decir en las mutaciones se haran la C U D del CRUD

    // los resolvers son ya como se ejecutan los typeDefs, me define la funcion como tal que se ejecuta en cada
    // operacion 

    // aqui el los resolver defino la resolucion del destino de los datos en la base de datos,
    // es decir las funciones de conexion a la base de datos, aqui esta los metodos de mongoose para las consultas 
    // a la base de datos (find(), create () delete ())
    Query: {
        // QUERYS PROYECTOS
        Proyectos: async (parent, args) => {
            const proyectos = await projectModel.find()
                .populate({// forma de hacer populate anidados y a mas niveles internos traer informacion 
                    path:'avances',
                    populate:{
                        path: 'creadoPor',
                    },

                })
                .populate('inscripciones')
                .populate('lider')

            console.log("todos los proyectos:", proyectos);
            return proyectos;
        },
        Proyecto: async (parent, args) => {

            const proyecto = await projectModel.find({ _id: args._id })
                .populate('lider')
                .populate('avances')
                .populate('inscripciones')

            console.log("un solo proyecto :", args.nombre);
            return proyecto[0];
        },
    },

    Mutation: {
        // MUTATIONS DE PROYECTOS
        crearProyecto: async (parent, args) => {
            const proyectoCreado = await projectModel.create({
                nombre: args.nombre,
                objetivos: args.objetivos,
                presupuesto: args.presupuesto,
                fechaInicio: args.fechaInicio,
                fechaFin: args.fechaFin,
                lider: args.lider,
            });

            if (Object.keys(args).includes('estado')) {
                proyectoCreado.estado = args.estado;
            };
            if (Object.keys(args).includes('fase')) {
                proyectoCreado.fase = args.fase;
            };
            return proyectoCreado;
        },

        eliminarProyecto: async (parent, args) => {
            const proyectoEliminado = await projectModel.findOneAndDelete({
                _id: args._id,
            });
            return proyectoEliminado;
        },

        editarProyecto: async (parent, args) => {
            const proyectoEditado = await projectModel.findOneAndUpdate({ _id: args._id }, {
                nombre: args.nombre,
                objetivos: args.objetivos,
                presupuesto: args.presupuesto,
                fechaInicio: args.fechaInicio,
                fechaFin: args.fechaFin,
                estado: args.estado,
                fase: args.fase,
                lider: args.lider,
            }, { new: true });
            console.log("proyecto editado", proyectoEditado)
            return proyectoEditado;
        },
    },
};
export { resolversProyecto };