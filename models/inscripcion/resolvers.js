import { inscripcionModel } from "./inscripcion.js";

const resolversInscripcion = {  // existen dos tipos de resolver (Query y mutacion) Query hace la 
    // operacion de leer obtener get datos de la base de datos es decir hace la R de un CRUD
    // la mutacion hace cualquier cambio o modificacion de los datos de la base de datos 
    // es decir en las mutaciones se haran la C U D del CRUD

    // los resolvers son ya como se ejecutan los typeDefs, me define la funcion como tal que se ejecuta en cada
    // operacion 

    // aqui el los resolver defino la resolucion del destino de los datos en la base de datos,
    // es decir las funciones de conexion a la base de datos, aqui esta los metodos de mongoose para las consultas 
    // a la base de datos (find(), create () delete ())


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


            });

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