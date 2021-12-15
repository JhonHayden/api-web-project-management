import { projectModel } from "../proyecto/proyecto.js";
import { inscripcionModel } from "./inscripcion.js";

const resolversInscripcion = {

    Query: {

        // QUERYS INSCRIPCIONES
        Inscripciones: async (parent, args, context) => {

            if (context.userData.rol === 'LIDER') {
                const _idProyectosLiderados = []
                const proyectos = await projectModel.find({ lider: context.userData._id })
                for (let i = 0; i < proyectos.length; i++) {

                    _idProyectosLiderados.push(proyectos[i]._id)
                    // console.log('proyectos', proyectos[i].lider)
                    // console.log('proyectos', proyectos[i].nombre)
                }
                // console.log("_idProyectosLiderados: ",_idProyectosLiderados)
                //     const inscripciones = proyectos._id
                //     console.log("inscripciones:",inscripciones)
                const inscripcion = await inscripcionModel.find({ proyecto: _idProyectosLiderados })
                    .populate('estudiante')
                    .populate({// forma de hacer populate anidados y a mas niveles internos traer informacion 
                        path: 'proyecto',
                        populate: {
                            path: 'lider',
                        },

                    })
                // console.log("todas las inscripciones:", inscripcion)
                return inscripcion;
            }else if (context.userData.rol === 'ESTUDIANTE'){

                const inscripcion = await inscripcionModel.find({ 
                    estudiante: context.userData._id,
                    estado: 'ACEPTADA' })
                    .populate('estudiante')
                    .populate({// forma de hacer populate anidados y a mas niveles internos traer informacion 
                        path: 'proyecto',
                        populate: {
                            path: 'lider',
                        },

                    })
                // console.log("todas las inscripciones:", inscripcion)
                return inscripcion;


            }

        },
        Inscripcion: async (parent, args) => {

            const inscripcion = await inscripcionModel.find({ _id: args._id })
                .populate('estudiante')
                .populate('proyecto')
            // console.log("una sola inscripcion", args, inscripcion);
            return inscripcion[0];
        },
    },

    Mutation: {

        // MUTATIONS DE INSCRIPCIONES
        crearInscripcion: async (parent, args, context) => {

            if (context.userData.rol === 'ESTUDIANTE') {

                const proyectoActivo = await projectModel.find({ _id: args.proyecto, estado: 'ACTIVO' })//busco proyecto por el id y si esta activo
                // console.log("proyecto Activo: ", proyectoActivo)
                console.log("Proyecto activo :"  , proyectoActivo)
                const faseProyecto = proyectoActivo[0].fase;

                if (faseProyecto === 'TERMINADO') {

                    return null
                } else {

                    const inscripcionCreada = await inscripcionModel.create({

                        proyecto: args.proyecto,
                        estudiante: context.userData._id,
                    });
                    return inscripcionCreada;
                }


            } else {
                const inscripcionCreada = inscripcionModel;

                inscripcionCreada.estado = 'RECHAZADA';// manera de enviar un mensaje y no un null 
                // cuando el rol no es de un estudiante


                return inscripcionCreada;
            }

        },

        eliminarInscripcion: async (parent, args) => {
            const inscripcionEliminada = await inscripcionModel.findOneAndDelete({
                _id: args._id,
            });
            return inscripcionEliminada;
        },

        editarInscripcion: async (parent, args, context) => {

            if (context.userData.rol === 'LIDER') {


                if (args.estado === "ACEPTADA") {

                    args.fechaIngreso = Date.now();// Date.now() 
                    // permite colocarle la fecha actual en el momento cuado se acepta
                    // la inscripcion 

                }

                const inscripcionEditada = await inscripcionModel.findOneAndUpdate({ _id: args._id }, {

                    // proyecto: args.proyecto,
                    // estudiante: args.estudiante,
                    estado: args.estado,
                    fechaIngreso: args.fechaIngreso,// data permitida a editar si no se pone aqui no me permite editar 
                    fechaEgreso: args.fechaEgreso 
                }, { new: true });


                // console.log("inscripcion editada", inscripcionEditada)
                return inscripcionEditada;
            }

        },

        aprobarInscripcion: async (parent, args) => {

            const inscripcionAprobada = await inscripcionModel.findByIdAndUpdate(args._idInscripcion, {
                estado: "ACEPTADA",
                fechaIngreso: Date.now(),

            });
            return inscripcionAprobada;

        },
        rechazarInscripcion: async (parent, args) => {

            const inscripcionRechazada = await inscripcionModel.findByIdAndUpdate(args._idInscripcion, {
                estado: "RECHAZADA",

            });
            return inscripcionRechazada;

        },
    },
};

export { resolversInscripcion };