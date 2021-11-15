import conectarBD from './db/db'; // importo la funcion conectarBD para poder usarla en mi index.js que tendra 
// todas las llamadas a funciones y configuraciones del backend es decir el index.js representa el server 
import { userModel } from './models/user';
import { Enum_EstadoUsuario, Enum_RolUsuario } from "./models/enumeradores";



const main = async () => { // funcion principal me retorna la conexion a la BD
    await conectarBD(); // tiene un await por que es una tarea que se debe esperar por una respuesta 
    // de un sofware externo como es la base de datos de mongoDB



    // DESPUES DE LA CONEXION VAN LOS QUERY A LA BASE DE DATOS USANDO EL MODELO:

    // METODO CREAR DEL CRUD DE USUARIOS
    await userModel.create({ // query para crear un usuario (un documento) en la coleccion Users 
        identificacion: '1112957837',
        nombre: 'JUNIOR ALEXANDER',
        apellido: 'OSPINA LOAIZA',
        correo: 'alexanderospinaloaiza1988@gmail.com',
        rol: Enum_RolUsuario.estudiante,
        // estado: Enum_EstadoUsuario.pendiente,

    }).then((usuario) => {
        console.log("usuario creado: ", usuario);

    }).catch((error) => {
        console.error("error creando usuario: ", error)
    });//la funcion create() es una Promise por lo tanto se debe poner un await a dicho uso del metodo create ()
    // una promesa son codigos que tengo que esperar hasta que se termine de ejecutar por eso se usa el await 
    //dado que es una conexion a la base de datos debo esperar por esto 


    //     // METODO CONSULTAR, LEER Y OBTENER DEL CRUD DE USUARIOS

    //     await userModel.find().then((usuarios) => {
    //         console.log("usuarios : ", usuarios);

    //     }).catch((error) => {
    //         console.error("error obteniendo usuarios : ", error)

    //     });

    // // METODO CONSULTAR, LEER Y OBTENER UN USUARIO ESPECIFICO DEL CRUD DE USUARIOS

    // await userModel.findOne({correo:'hayden@gmail.com'}).then((usuario) => {
    //     console.log("usuario encontrado por correo: ", usuario);
    // }).catch((error) => {
    //     console.error("Error encontrando usuario por correo", error);
    // })

    //  // METODO EDITAR DEL CRUD DE USUARIOS
    //     await userModel.findOneAndUpdate({correo:'jhonhayd@hotmail.com'}, {  // me permite modificar un documento de 
    //         // la coleccion users recibe como parametro el filtro para saber cual documento modificar y el otro 
    //         // parametro son los campos a modificar con sus valores para modificar 
    //         nombre:'Dios todo poderoso'

    //     }).then((usuario) => {  // los .then ejecutan una funcion .. tipo arrow function despues de que se ejecuta
    //         // el metodo  findOneAndUpdate . se puede colocar cualquier tipo de funcion no debe ser solo arrow function 
    //         // se puede de cualquier tipo 
    //         console.log("usuario actualizado : ", usuario);

    //     }).catch((error) => {
    //         console.error("error actualizando usuario : ", error)

    //     });

    //  // METODO ELIMINAR DEL CRUD DE USUARIOS

    //  await userModel.findOneAndDelete({correo:'jhonhayd@hotmail.com'}).then((usuario) => {
    //      console.log("Usuario eliminado: ", usuario); 
    //  }).catch((error) => {
    //      console.error("Error eliminando usuario: ", error);
    //  })

}

main(); // llamado a la ejecucion de la funcion principal