import { inscripcionModel } from "../inscripcion/inscripcion.js";
import { projectModel } from "../proyecto/proyecto.js";
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
        Avances: async (parent, args, context) => {
            if (context.userData.rol === "ESTUDIANTE") {


                const inscripcionAceptada = await inscripcionModel.find({//busco la inscripcion a el proyecto y si esta aceptada 
                    estudiante: context.userData._id,
                    estado: 'ACEPTADA',
                    proyecto: args.idProyecto,
                })

                if (inscripcionAceptada[0]) {

                    const avances = await avanceModel.find({ proyecto: args.idProyecto })
                        .populate('proyecto')
                        .populate('creadoPor')
                    // console.log("todos los Avances del proyecto :", avances)
                    return avances;

                }


            } else if (context.userData.rol === "LIDER") {

                const avances = await avanceModel.find({ proyecto: args.idProyecto })
                    .populate('proyecto')
                    .populate('creadoPor')
                // console.log("todos los Avances:")
                return avances;

            }
        },
        Avance: async (parent, args) => {
            const avance = await avanceModel.find({ _id: args._id })
                .populate('proyecto')
                .populate('creadoPor')
            // console.log("un solo Avance :", args.descripcion);
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

        crearAvance: async (parent, args, context) => {
            if (context.userData.rol === "ESTUDIANTE") {

                const proyectoActivo = await projectModel.find({ _id: args.proyecto, estado: 'ACTIVO' })//busco proyecto por el id y si esta activo
                // console.log("proyecto Activo: ", proyectoActivo)

                const faseProyecto = proyectoActivo[0].fase;

                if (faseProyecto === 'TERMINADO') {

                    return null
                } else {


                    const inscripcionAceptada = await inscripcionModel.find({//busco la inscripcion a el proyecto y si esta aceptada 
                        estudiante: context.userData._id,
                        estado: 'ACEPTADA',
                        proyecto: proyectoActivo[0]._id,

                    })

                    // console.log("inscripcion aceptada :", inscripcionAceptada)


                    if (proyectoActivo[0] && inscripcionAceptada[0]) {
                        // console.log("faseProyecto:", faseProyecto)

                        // console.log("si puedo crear un avance")

                        const avanceCreado = await avanceModel.create({

                            fecha: args.fecha,
                            descripcion: args.descripcion,
                            // observaciones: args.observaciones,
                            proyecto: proyectoActivo[0]._id,
                            creadoPor: context.userData._id,
                        });
                        // console.log("avanceCreado", avanceCreado)

                        if (avanceCreado) {

                            if (faseProyecto === 'INICIADO') {

                                await projectModel.findByIdAndUpdate(args.proyecto, {

                                    fase: "EN_DESARROLLO",

                                })


                            }

                        }
                        return avanceCreado;



                    } else {

                        console.log("NO puedo crear un avance inscripcion no aceptada aun")


                    }
                }

            }
        },
        eliminarAvance: async (parent, args) => {
            const avanceEliminado = await avanceModel.findOneAndDelete({
                _id: args._id,
            });
            return avanceEliminado;
        },
        editarAvance: async (parent, args, context) => {


            if (context.userData.rol === 'ESTUDIANTE') {

                const avanceAEditar = await avanceModel.find({ _id: args._id })
                // console.log()

                const proyectoActivo = await projectModel.find({ _id: avanceAEditar[0].proyecto, estado: 'ACTIVO' })//busco proyecto por el id y si esta activo
                // console.log("proyecto Activo: ", proyectoActivo)

                const faseProyecto = proyectoActivo[0].fase;

                if (faseProyecto === 'TERMINADO') {

                    return null
                } else {
                    const avanceEditado = await avanceModel.findByIdAndUpdate({ _id: args._id }, {
                        fecha: args.fecha,
                        descripcion: args.descripcion,
                        // observaciones: args.observaciones,
                        // proyecto: args.proyecto,
                        // creadoPor: args.creadoPor,
                    }, { new: true });
                    console.log("avance editado", avanceEditado)
                    return avanceEditado;
                }
            }

        },


        crearObservacion: async (parent, args, context) => {


            if (context.userData.rol === 'LIDER') {

                const avanceAEditar = await avanceModel.find({ _id: args.idAvance })
                // console.log()

                const proyectoActivo = await projectModel.find({
                    _id: avanceAEditar[0].proyecto,
                    estado: 'ACTIVO',
                    lider: context.userData._id
                })//busco proyecto por el id y si esta activo
                console.log("proyecto Activo: ", proyectoActivo)

                const faseProyecto = proyectoActivo[0].fase;

                if (faseProyecto === 'TERMINADO') {

                    return null
                } else {
                    //                                                                           filtro
                    const avanceCreadoConObservaciones = await avanceModel.findByIdAndUpdate(args.idAvance, {
                        //campos  a editar, agregar o actualizar 
                        $addToSet: {  // funcion de mongoDB que permite agregar un elemento a un 
                            // array o set -- las funciones de mongo se ponen con el simbolo 
                            // de $ al inicio del nombre de la funcion ($funciondeMongoDB:) 
                            // $addToSet me agrega un nuevo elemento dentro de un array que esta 
                            // dentro de un documento de mongoDB 
                            // Observaciones: {// escojo cual arreglo o array del documento le voy 
                            //     // a agregar un nuevo elemento a la lista en este caso es la lista Observaciones 
                            //     descripcion: args.descripcion,
                            //     tipo: args.tipo,
                            // }

                            observaciones: { descripcionObservacion: args.descripcionObservacion }
                            // otra forma de hacer lo mismo de arriba de 
                            // agregra los campos a

                        }

                    }, { new: true });// new:true --> permite que en el retorno 
                    return avanceCreadoConObservaciones;
                }
            }


        },

        editarObservacion: async (parent, args, context) => {

            if (context.userData.rol === 'LIDER') {

                const observacionAvanceEditada = await avanceModel.findByIdAndUpdate(args.idAvance,
                    {
                        $set: {//funcion de mongoDB permite editar un array dentro de un documento
                            [`observaciones.${args.indexObservacion}.descripcionObservacion`]: args.descripcionObservacion,//
                            // el campo a editar se accede de esa manera primero el campo externo el array 
                            // Observacions luego la posicion del Observacion a editar dentro del array Observacions y 
                            // luego mas adentro cual campo de ese Observacion se editar.. la descripcion . el 
                            // operador punto me permite entrar en campas internas de un objeto  y acceder cada 
                            // vez mas a dentro de acuerdo a que propiedad quiero acceder 

                            // el operador $ permite 
                            // representar una variable 


                        },
                    },
                    { new: true }
                );
                return observacionAvanceEditada;
            }
        },

        eliminarObservacion: async (parent, args) => {
            const avanceObservacionEliminada = await avanceModel.findByIdAndUpdate(

                { _id: args.idAvance },// filtro avance 
                {
                    $pull: {// operacion funcion de mongoDB de eliminacion de un elemento de un array 
                        // de un documento de mongoDB

                        //array al que se le eliminara el elemento 
                        observaciones: {

                            _id: args.idObservacion    //filtro del Observacion a eliminar
                        }

                    },
                },
                { new: true }
            );

            return avanceObservacionEliminada;
        },
    }
}


export { resolversAvance };
// db.usuarios.update( {nombre : 'Fredy Alexander España Garcia' }, { $push : { proyectos : { nombreProyecto : 'El mejor', estrellas: 3}}});