import { avanceModel } from "./avance.js";

const resolversAvance = {  // existen dos tipos de resolver (Query y mutacion) Query hace la 
    // operacion de leer obtener get datos de la base de datos es decir hace la R de un CRUD
    // la mutacion hace cualquier cambio o modificacion de los datos de la base de datos 
    // es decir en las mutaciones se haran la C U D del CRUD

    // los resolvers son ya como se ejecutan los typeDefs, me define la funcion como tal que se ejecuta en cada
    // operacion 

    // aqui el los resolver defino la resolucion del destino de los datos en la base de datos,
    // es decir las funciones de conexion a la base de datos, aqui esta los metodos de mongoose para las consultas 
    // a la base de datos (find(), create () delete ())

    Query: {

        // QUERYS AVANCES
        Avances: async (parent, args) => {
            const avances = await avanceModel.find()
                .populate('proyecto')
                .populate('creadoPor')
            console.log("todos los Avances:")
            return avances;
        },
        Avance: async (parent, args) => {
            const avance = await avanceModel.find({ _id: args._id })
                .populate('proyecto')
                .populate('creadoPor')
            console.log("un solo Avance :", args.descripcion);
            return avance[0];
        },
        filtrarAvance: async (parent, args) => {
            const avanceFiltrado = await avanceModel.find({ _id: args._id })
                .populate('proyecto')
                .populate('creadoPor');
            return avanceFiltrado;
        },
    },
    Mutation: {

        // MUTATIONS DE AVANCES
        crearAvance: async (parent, args) => {
            const avanceCreado = await avanceModel.create({

                fecha: args.fecha,
                descripcion: args.descripcion,
                observaciones: args.observaciones,
                proyecto: args.proyecto,
                creadoPor: args.creadoPor,
            });
            return avanceCreado;
        },
        eliminarAvance: async (parent, args) => {
            const avanceEliminado = await avanceModel.findOneAndDelete({
                _id: args._id,
            });
            return avanceEliminado;
        },
        editarAvance: async (parent, args) => {

            const avanceEditado = await avanceModel.findOneAndUpdate({ _id: args._id }, {
                fecha: args.fecha,
                descripcion: args.descripcion,
                observaciones: args.observaciones,
                proyecto: args.proyecto,
                creadoPor: args.creadoPor,
            }, { new: true });
            console.log("avance editado", avanceEditado)
            return avanceEditado;
        },
    },
};

export { resolversAvance };