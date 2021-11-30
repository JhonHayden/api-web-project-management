import { userModel } from "./usuario.js";
import bcrypt from 'bcrypt';
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
        Usuarios: async (parent, args, context) => {
            console.log("datos del usuario que visito la tabla de todos los usuarios", context)
            if (context.userData.rol === 'ADMINISTRADOR') {// restriccion de query por rol

                const usuarios = await userModel.find()
                    .populate('proyectosLiderados') // me permite traer la informacion de la parte many de la relacion one to many de usuario 
                    // y proyectos un usuario lider puede lider varios proyectos entonces con populate virtual puedo traer los proyectos 
                    // liderados como una lista, el parametro que le paso al metodo populate es un campo o atributo de mi type usuario 
                    // el campo virtual proyectosLiderados este es mismo es el primer parametro del metodo virtual de mongoose del Schema
                    .populate('inscripciones')
                    .populate('avancesCreados')
                // console.log("soy todos los usuarios", usuarios);
                return usuarios;

                // }else if(context.userData.rol === 'ESTUDIANTE'){// restriccion de query por rol 
                //     const usuarios = await userModel.find({rol:"ESTUDIANTE"})
                //         .populate('proyectosLiderados') // me permite traer la informacion de la parte many de la relacion one to many de usuario 
                //         // y proyectos un usuario lider puede lider varios proyectos entonces con populate virtual puedo traer los proyectos 
                //         // liderados como una lista, el parametro que le paso al metodo populate es un campo o atributo de mi type usuario 
                //         // el campo virtual proyectosLiderados este es mismo es el primer parametro del metodo virtual de mongoose del Schema
                //         .populate('inscripciones')
                //         .populate('avancesCreados')
                //     // console.log("soy todos los usuarios", usuarios);
                //     return usuarios

            } else if (context.userData.rol === 'LIDER') {
                const usuarios = await userModel.find({rol:"ESTUDIANTE"})
                    .populate('proyectosLiderados') // me permite traer la informacion de la parte many de la relacion one to many de usuario 
                    // y proyectos un usuario lider puede lider varios proyectos entonces con populate virtual puedo traer los proyectos 
                    // liderados como una lista, el parametro que le paso al metodo populate es un campo o atributo de mi type usuario 
                    // el campo virtual proyectosLiderados este es mismo es el primer parametro del metodo virtual de mongoose del Schema
                    .populate('inscripciones')
                    .populate('avancesCreados')
                // console.log("soy todos los usuarios", usuarios);
                return usuarios;

            }else{
                return null
            }
        },
        // me trae un solo usuario por el _id que le pase 
        Usuario: async (parent, args) => {
            const usuario = await userModel.find({ _id: args._id })
                .populate('proyectosLiderados')
                .populate('inscripciones')
                .populate('avancesCreados')
            // console.log("soy usuario solito", usuario);
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
            console.log("entradas del registro desde el frontend", args)

            // primero encriptamos la contraseña:
            const salt = await bcrypt.genSalt(10);//funcion asincrona que me genera las rondas de salt de encriptado recibe como 
            // parametro un entero el cual es la cantidad de rondas de encriptado lo comun es 10 entre mas sean mas seguro la 
            // encriptacion pero es mas pesado y demorado el proceso 

            // Salt son las veces de encriptacion, rondas de encriptado,  encripta la contraseña n veces un detras de la otra

            const hashedPassword = await bcrypt.hash(args.password, salt);// me encripta la contraseña hace el proceso de 
            // hashing a la contraseña, es una funcion asincrona por eso necesita el awai, y tiene como parametros 
            // la contraseña a encriptar (args.password) y luego el segundo parametro son las rondas de encriptado (salt) 
            // y retorna en la variable hashedPassword la contraseña ya encriptada y esta la pasamos para crear el 
            // usuario en la base de datos 


            const usuarioCreado = await userModel.create({
                identificacion: args.identificacion,
                nombre: args.nombre,
                apellido: args.apellido,
                correo: args.correo,
                rol: args.rol,
                password: hashedPassword,
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

            if (args.password) {
                // primero encriptamos la contraseña:
                const salt = await bcrypt.genSalt(10);//funcion asincrona que me genera las rondas de salt de encriptado recibe como 
                // parametro un entero el cual es la cantidad de rondas de encriptado lo comun es 10 entre mas sean mas seguro la 
                // encriptacion pero es mas pesado y demorado el proceso 

                // Salt son las veces de encriptacion, rondas de encriptado,  encripta la contraseña n veces un detras de la otra

                const hashedPassword = await bcrypt.hash(args.password, salt);// me encripta la contraseña hace el proceso de 
                // hashing a la contraseña, es una funcion asincrona por eso necesita el awai, y tiene como parametros 
                // la contraseña a encriptar (args.password) y luego el segundo parametro son las rondas de encriptado (salt) 
                // y retorna en la variable hashedPassword la contraseña ya encriptada y esta la pasamos para crear el 
                // usuario en la base de datos 

                const usuarioEditado = await userModel.findOneAndUpdate({ _id: args._id }, {
                    identificacion: args.identificacion,
                    nombre: args.nombre,
                    apellido: args.apellido,
                    correo: args.correo,
                    password: hashedPassword,

                }, { new: true });// new : true me permite que en el retorno sea el usuario editado  
                return usuarioEditado;
            } else {
                const usuarioEditado = await userModel.findOneAndUpdate({ _id: args._id }, {
                    identificacion: args.identificacion,
                    nombre: args.nombre,
                    apellido: args.apellido,
                    correo: args.correo,

                }, { new: true });// new : true me permite que en el retorno sea el usuario editado  
                return usuarioEditado;
            }
        },
        editarEstadoUsuario: async (parent, args, context) => {
            if (context.userData.rol === 'ADMINISTRADOR' || context.userData.rol === 'LIDER') {

                const usuarioEditado = await userModel.findOneAndUpdate({ _id: args._id }, {
                    estado: args.estado,
                }, { new: true });// new : true me permite que en el retorno sea el usuario editado  
                return usuarioEditado;
            } else {

                return null
            }
        },
    },
};
export { resolversUsuario };