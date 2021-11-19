import conectarBD from './db/db'; // importo la funcion conectarBD para poder usarla en mi index.js que tendra
// todas las llamadas a funciones y configuraciones del backend es decir el index.js representa el server
import { userModel } from './models/usuario/usuario';
import { Enum_EstadoUsuario, Enum_RolUsuario, Enum_TipoObjetivo } from "./models/enumeradores/enumeradores";
import { projectModel } from './models/proyecto/proyecto';



const main = async () => { // funcion principal me retorna la conexion a la BD
    await conectarBD(); // tiene un await por que es una tarea que se debe esperar por una respuesta
    // de un sofware externo como es la base de datos de mongoDB


    // DESPUES DE LA CONEXION VAN LOS QUERY A LA BASE DE DATOS USANDO EL MODELO:

    











    const proyectoCreado = await projectModel.find({ _id: '6193132e201eeab51ccd7c33' });

    console.log(" consultado proyecto creado es :",JSON.stringify(proyectoCreado));


    // const usuarioInicial = await userModel.create({ // query para crear un usuario (un documento) en la coleccion Users
    //     identificacion: '94504954',
    //     nombre: 'ARLEX',
    //     apellido: 'JIMENEZ LOPEZ',
    //     correo: 'alexjimenezlopez0608@gmail.com',
    //     rol: Enum_RolUsuario.estudiante,
    //     // estado: Enum_EstadoUsuario.pendiente,

    // });

    // // METODO CREAR DEL CRUD DE PROYECTOS
    // const proyecto = await projectModel.create({
    //     nombre: 'proyecto1',
    //     objetivos: [
    //         {
    //             descripcion: 'objetivo general',
    //             tipo: Enum_TipoObjetivo.general
    //         },
    //         {
    //             descripcion: 'objetivo especifico1',
    //             tipo: Enum_TipoObjetivo.especifico
    //         },
    //         {
    //             descripcion: 'objetivo especifico2',
    //             tipo: Enum_TipoObjetivo.especifico
    //         }
    //     ],
    //     presupuesto: 100000,
    //     fechaInicio: Date.now(),
    //     fechaFin: new Date('2021/12/1'),
    //     lider: usuarioInicial._id,

    // });

    // // METODO CONSULTAR, LEER Y OBTENER DEL CRUD DE PROYECTOS
    // // const proyecto = await projectModel.find({nombre: 'Proyecto 1'}).populate('lider');// me trae el proyecto junto con el
    // // lider completo . el metodo populate funciona solo en la parte many y  traer el one de la relacion es
    // // decir la many es proyectos y me trea el one de la relacion que es un solo usuario lider pero en el caso de 
    // // la parte one el usuario lider y traerme el many los proyectos no lo puede hacer el metodo ´populate()
    // console.log('El proyecto es : ', proyecto);


    // METODO CREAR DEL CRUD DE USUARIOS
    // await userModel.create({ // query para crear un usuario (un documento) en la coleccion Users
    //     identificacion: '1112957837',
    //     nombre: 'JUNIOR ALEXANDER',
    //     apellido: 'OSPINA LOAIZA',
    //     correo: 'alexanderospinaloaiza1988@gmail.com',
    //     rol: Enum_RolUsuario.estudiante,
    //     // estado: Enum_EstadoUsuario.pendiente,

    // }).then((usuario) => {
    //     console.log("usuario creado: ", usuario);

    // }).catch((error) => {
    //     console.error("error creando usuario: ", error)
    // });//la funcion create() es una Promise por lo tanto se debe poner un await a dicho uso del metodo create ()
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

    //  await userModel.findOneAndDelete({correo:'alexjimenezlopez0608@gmail.com'}).then((usuario) => {
    //      console.log("Usuario eliminado: ", usuario);
    //  }).catch((error) => {
    //      console.error("Error eliminando usuario: ", error);
    //  })

}

main(); // llamado a la ejecucion de la funcion principal