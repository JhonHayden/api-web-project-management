import { inscripcionModel } from "./inscripcion.js";

const resolversInscripcion = {  

    Query: {

        // QUERYS INSCRIPCIONES
        Inscripciones: async (parent, args) => {

            const inscripcion = await inscripcionModel.find()
                .populate('estudiante')
                .populate('proyecto')
            console.log("todas las inscripciones:", inscripcion)
            return inscripcion;
        },
        Inscripcion: async (parent, args) => {

            const inscripcion = await inscripcionModel.find({ _id: args._id })
                .populate('estudiante')
                .populate('proyecto')
            console.log("una sola inscripcion", args, inscripcion);
            return inscripcion[0];
        },
    },

    Mutation: {

        // MUTATIONS DE INSCRIPCIONES
        crearInscripcion: async (parent, args) => {
            const inscripcionCreada = await inscripcionModel.create({

                proyecto: args.proyecto,
                estudiante: args.estudiante,
            });
            return inscripcionCreada;
        },

        eliminarInscripcion: async (parent, args) => {
            const inscripcionEliminada = await inscripcionModel.findOneAndDelete({
                _id: args._id,
            });
            return inscripcionEliminada;
        },

        editarInscripcion: async (parent, args) => {

            const inscripcionEditada = await inscripcionModel.findOneAndUpdate({ _id: args._id }, {

                proyecto: args.proyecto,
                estudiante: args.estudiante,
                estado:args.estado, // data permitida a editar si no se pone aqui no me permite editar 
                // el estado ni sale el enumerador de aceptada rechazada o pendiente 
            }, { new: true });

            if (args.estado === "ACEPTADA") {

                inscripcionEditada.fechaIngreso = Date.now();// Date.now() 
                // permite colocarle la fecha actual en el momento cuado se acepta
                // la inscripcion 

            } else if (args.estado === "RECHAZADA") {

                inscripcionEditada.fechaEgreso = Date.now();
            };

            console.log("inscripcion editada", inscripcionEditada)
            return inscripcionEditada;
        },

        aprobarInscripcion: async (parent, args) => {

            const inscripcionAprobada = await inscripcionModel.findByIdAndUpdate(args._id, {
                estado: "ACEPTADA",
                fechaIngreso: Date.now(),

            });
            return inscripcionAprobada;

        },
    },
};
export { resolversInscripcion };