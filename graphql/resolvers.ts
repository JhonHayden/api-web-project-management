import { avanceModel } from "../models/avance";
import { projectModel } from "../models/proyecto";
import { userModel } from "../models/usuario";

const resolvers = {  // existen dos tipos de resolver (Query y mutacion) Query hace la 
    // operacion de leer obtener get datos de la base de datos es decir hace la R de un CRUD
    // la mutacion hace cualquier cambio o modificacion de los datos de la base de datos 
    // es decir en las mutaciones se haran la C U D del CRUD

    // los resolvers son ya como se ejecutan los typeDefs, me define la funcion como tal que se ejecuta en cada
    // operacion 

    // aqui el los resolver defino la resolucion del destino de los datos en la base de datos,
    // es decir las funciones de conexion a la base de datos, aqui esta los metodos de mongoose para las consultas 
    // a la base de datos (find(), create () delete ())


    Query: {
        //QUERYS USUARIOS
        // me trae todos los usuarios de la base de datos
        Usuarios: async (parent, args) => {

            const usuarios = await userModel.find()
            console.log("soy todos los usuarios", usuarios);
            return usuarios;
        },
        // me trae un solo usuario por el _id que le pase 
        Usuario: async (parent, args) => {
            const usuario = await userModel.find({ _id: args._id })
            console.log("soy usuario solito", usuario);
            return usuario[0];
        },
        // Usuario: async (parent, args) => {
        //     const usuario = await userModel.findOne({ _id: args._id })
        //     console.log("soy usuario solito", usuario);
        //     return usuario;
        // },

        // QUERYS PROYECTOS
        Proyectos: async (parent, args) => {

            const proyectos = await projectModel.find().populate('lider')
            console.log("todos los proyectos:")
            return proyectos;
        },

        Proyecto: async (parent, args) => {

            const proyecto = await projectModel.find({ _id: args._id }).populate('lider')
            console.log("un solo proyecto :", args.nombre);
            return proyecto[0];
        },


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
        }

    },



    Mutation: {

        // MUTATIONS DE USUARIOS
        crearUsuario: async (parent, args) => {

            const usuarioCreado = await userModel.create({
                identificacion: args.identificacion,
                nombre: args.nombre,
                apellido: args.apellido,
                correo: args.correo,
                rol: args.rol,

            });
            //implementacion del estado cuando se desea registrar un estado diferentee
            // al estado por defecto de PENDIENTE 
            if (Object.keys(args).includes('estado')) {// si el los inputs de el request una
                // clave se llama estado es decir el usuario envio el estado entonces 
                // al usuarioCreado su atributo estado agreguele el valor recibido 

                usuarioCreado.estado = args.estado;//
            }

            return usuarioCreado;

        },


        eliminarUsuario: async (parent, args) => {

            if (Object.keys(args).includes('_id')) {

                const usuarioEliminado = await userModel.findOneAndDelete({

                    _id: args._id,
                });
                return usuarioEliminado;

            } else if (Object.keys(args).includes('identificacion')) {

                const usuarioEliminado = await userModel.findOneAndDelete({

                    identificacion: args.identificacion,
                });
                return usuarioEliminado;

            } else if (Object.keys(args).includes('correo')) {

                const usuarioEliminado = await userModel.findOneAndDelete({

                    correo: args.correo,
                });
                return usuarioEliminado;

            }

        },

        // findOneAndUpdate le paso dos argumentos el primero es el filtro para buscar el 
        // documento, registro a modificar y luego el segundo son los campos que quiero 
        // editar o los campo permitidos para editar
        editarUsuario: async (parent, args) => {

            const usuarioEditado = await userModel.findOneAndUpdate({ correo: args.correo }, {

                identificacion: args.identificacion,
                nombre: args.nombre,
                apellido: args.apellido,
                correo: args.correo,
                rol: args.rol,
                estado: args.estado,
            });
            return usuarioEditado;
        },


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


            });
            console.log("proyecto editado", proyectoEditado)
            return proyectoEditado;
        },



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


            });
            console.log("avance editado", avanceEditado)
            return avanceEditado;
        },





    },


};

export { resolvers };