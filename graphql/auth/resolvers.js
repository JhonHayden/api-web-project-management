import { userModel } from "../../models/usuario/usuario.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../../utils/tokenUtils.js";

const resolversAutenticacion = {
    Mutation: {

        registro: async (parent, args) => {
            // primero encriptamos la contraseña:
            const salt = await bcrypt.genSalt(10);//funcion asincrona que me genera las rondas de salt de encriptado recibe como 
            // parametro un entero el cual es la cantidad de rondas de encriptado lo comun es 10 entre mas sean mas seguro la 
            // encriptacion pero es mas pesado y demorado el proceso 
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
        }
    }
};

export { resolversAutenticacion };