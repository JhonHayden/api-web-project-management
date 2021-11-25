import { userModel } from "./usuario.js";
const resolversUsuario = {  // existen dos tipos de resolver (Query y mutacion) Query hace la 
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
                .populate('proyectosLiderados') // me permite traer la informacion de la parte many de la relacion one to many de usuario 
                // y proyectos un usuario lider puede lider varios proyectos entonces con populate virtual puedo traer los proyectos 
                // liderados como una lista, el parametro que le paso al metodo populate es un campo o atributo de mi type usuario 
                // el campo virtual proyectosLiderados este es mismo es el primer parametro del metodo virtual de mongoose del Schema
                .populate('inscripciones')
                .populate('avancesCreados')
            console.log("soy todos los usuarios", usuarios);
            return usuarios;
        },
        // me trae un solo usuario por el _id que le pase 
        Usuario: async (parent, args) => {
            const usuario = await userModel.find({ _id: args._id })
                .populate('proyectosLiderados')
                .populate('inscripciones')
                .populate('avancesCreados')
            console.log("soy usuario solito", usuario);
            return usuario[0];
        },
        // Usuario: async (parent, args) => {
        //     const usuario = await userModel.findOne({ _id: args._id })
        //     console.log("soy usuario solito", usuario);
        //     return usuario;
        // },
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
            const usuarioEditado = await userModel.findOneAndUpdate({ _id:args._id }, {
                identificacion: args.identificacion,
                nombre: args.nombre,
                apellido: args.apellido,
                correo: args.correo,
                rol: args.rol, // el rol no se puede cambiar eso queda pendiente 
                estado: args.estado,
            }, { new: true });// new : true me permite que en el retorno sea el usuario editado  
            return usuarioEditado;
        },
    },
};
export { resolversUsuario };