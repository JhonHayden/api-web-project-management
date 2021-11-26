import { userModel } from "../../models/usuario/usuario.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../../utils/tokenUtils.js";


// defino los resolvers de las mutaciones en la autenticacion 

const resolversAutenticacion = {
    Mutation: {

        // Mutacion de Registro
        registro: async (parent, args) => {

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


            const usuarioCreado = await userModel.create({// me permite crear el usuario en la base de datos 
                identificacion: args.identificacion,
                nombre: args.nombre,
                apellido: args.apellido,
                correo: args.correo,
                rol: args.rol,
                password: hashedPassword, // mando la contraseña ya encriptada 
            })
            // console.log("registro o crear un usuario ", args);
            console.log("usuario creado ", usuarioCreado);

            return {
                token: generateToken({
                    _id: usuarioCreado._id,
                    identificacion: usuarioCreado.identificacion,
                    nombre: usuarioCreado.nombre,             // informacion incrustada en el token payload
                    apellido: usuarioCreado.apellido,
                    correo: usuarioCreado.correo,
                    rol: usuarioCreado.rol,
                    estado: usuarioCreado.estado,
                }),// retornamos un objeto de clave= token : y valor = con el token generado con la informacion 
                // del usuario inscrustada 
                // devolvelos un type definido en tipos la carpeta utils y es un tipo objeto con dos propiedades 
                // objeto retornado las propiedades retornadas son opcionales pero debo enviar siempr el token obviamente 
                // type Token {  
                //     token:String
                //     error:String
                // }
            };
        },

        // Mutacion de login 
        login: async (parent, args) => {
            console.log("entradas del login desde el frontend", args)
            //                                                    filtro para buscar 
            //                                                    el usuario en la bd 
            //                                                    coleccion Usuario
            const usuarioEncontrado = await userModel.findOne({ correo: args.correo });
            const comparacionHashings = await bcrypt.compare(args.password, usuarioEncontrado.password);// me permitte 
            // comparar el encritado hashing de la contraseña ya guardada en la base de datos con el hashing de
            // la contraseña escrita por el usuario que quiere iniciar sesion el metodo compare de la libreria bcrypt 
            // hace esto .. este metodo es asincrono por eso se usa el await y recibe dos parametro primero la contraseña 
            // recibida desde el front es decir la contraseña que el usuario escribe en el login para iniciar sesion 
            // y esta esta en el args.password  el segundo parametro es el encritado de la contraseña original encontrada 
            // en la base de datos a traves del metodo finfOne por medio del correo esta se encuentra en 
            // usuarioEncontrado.password .. este metodo compare me devuelve un true si los hashing son iguales 
            // y false si no los son .. ojo compare no desencripta el no puede hacer es el compara son los hashing 
            // de las contraseñas 

            console.log("usuario que quiere iniciar sesion :", args)
            console.log("usuario Encontrado por correo :", usuarioEncontrado)
            console.log("comparacion de hashing :  ", comparacionHashings)

            if (comparacionHashings) {

                return { // GENERAMOS Y RETORNAMOS EL TOKEN SI LA COMAPARCION ES TRUE ES DECIR SI COINCIDEN LOS HASHING
                    // Y LAS CONTRASEÑAS SON IGUALES 
                    token: generateToken({ // generamos el token con la informacion del usuario encontrado dado que 
                        // este es el que quiere iniciar sesion 
                        _id: usuarioEncontrado._id,
                        identificacion: usuarioEncontrado.identificacion,
                        nombre: usuarioEncontrado.nombre,             // informacion incrustada en el token payload
                        apellido: usuarioEncontrado.apellido,
                        correo: usuarioEncontrado.correo,
                        rol: usuarioEncontrado.rol,
                        estado: usuarioEncontrado.estado,
                    }),// retornamos un objeto de clave= token : y valor = con el token generado con la informacion 
                    // del usuario inscrustada 
                    // devolvelos un type definido en tipos la carpeta utils y es un tipo objeto con dos propiedades 
                    // objeto retornado las propiedades retornadas son opcionales pero debo enviar siempr el token obviamente 
                    // type Token {  
                    //     token:String
                    //     error:String
                    // }
                }
            }
        }
    }
};

export { resolversAutenticacion };