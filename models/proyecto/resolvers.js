import { projectModel } from "./proyecto.js";
const resolversProyecto = {  // existen dos tipos de resolver (Query y mutacion) Query hace la 
    // operacion de leer obtener get datos de la base de datos es decir hace la R de un CRUD
    // la mutacion hace cualquier cambio o modificacion de los datos de la base de datos 
    // es decir en las mutaciones se haran la C U D del CRUD

    // los resolvers son ya como se ejecutan los typeDefs, me define la funcion como tal que se ejecuta en cada
    // operacion 

    // aqui el los resolver defino la resolucion del destino de los datos en la base de datos,
    // es decir las funciones de conexion a la base de datos, aqui esta los metodos de mongoose para las consultas 
    // a la base de datos (find(), create () delete ())
    Query: {
        // QUERYS PROYECTOS
        Proyectos: async (parent, args) => {
            const proyectos = await projectModel.find()
                .populate({// forma de hacer populate anidados y a mas niveles internos traer informacion 
                    path: 'avances',
                    populate: {
                        path: 'creadoPor',
                    },

                })
                .populate('inscripciones')
                .populate('lider')

            console.log("todos los proyectos:", proyectos);
            return proyectos;
        },
        Proyecto: async (parent, args) => {

            const proyecto = await projectModel.find({ _id: args._id })
                .populate('lider')
                .populate('avances')
                .populate('inscripciones')

            console.log("un solo proyecto :", args.nombre);
            return proyecto[0];
        },
    },

    Mutation: {
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
            const proyectoEditado = await projectModel.findByIdAndUpdate(args._id, {
                nombre: args.nombre,
                // objetivos: args.objetivos,
                presupuesto: args.presupuesto,
                fechaInicio: args.fechaInicio,
                fechaFin: args.fechaFin,
                estado: args.estado,
                fase: args.fase,
                lider: args.lider,
            }, { new: true });
            console.log("proyecto editado", proyectoEditado)
            return proyectoEditado;
        },

        //MUTACION PARA AGREGAR OBJETIVO AL PROYECTO 
        crearObjetivo: async (parent, args) => {
            //                                                                       filtro
            const proyectoCreadoConObjetivo = await projectModel.findByIdAndUpdate(args.idProyecto, {
                //campos  a editar, agregar o actualizar 
                $addToSet: {  // funcion de mongoDB que permite agregar un elemento a un 
                    // array o set -- las funciones de mongo se ponen con el simbolo 
                    // de $ al inicio del nombre de la funcion ($funciondeMongoDB:) 
                    // $addToSet me agrega un nuevo elemento dentro de un array que esta 
                    // dentro de un documento de mongoDB 
                    // objetivos: {// escojo cual arreglo o array del documento le voy 
                    //     // a agregar un nuevo elemento a la lista en este caso es la lista objetivos 
                    //     descripcion: args.descripcion,
                    //     tipo: args.tipo,
                    // }

                    objetivos: { ...args.campos }// otra forma de hacer lo mismo de arriba de 
                    // agregra los campos a
                }

            }, { new: true });// new:true --> permite que en el retorno 
            // devuelva la informacion requerida del proyecto con el objetivo recien
            // actualizado 
            return proyectoCreadoConObjetivo;
        },


        editarObjetivo: async (parent, args) => {
            const proyectoObjetivoEditado = await projectModel.findByIdAndUpdate(args.idProyecto,
                {
                    $set: {//funcion de mongoDB permite editar un array dentro de un documento
                        [`objetivos.${args.indexObjetivo}.descripcion`]: args.campos.descripcion,//
                        // el campo a editar se accede de esa manera primero el campo externo el array 
                        // objetivos luego la posicion del objetivo a editar dentro del array objetivos y 
                        // luego mas adentro cual campo de ese objetivo se editar.. la descripcion . el 
                        // operador punto me permite entrar en campas internas de un objeto  y acceder cada 
                        // vez mas a dentro de acuerdo a que propiedad quiero acceder 

                        [`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,// el operador $ permite 
                        // representar una variable 


                    },
                },
                { new: true }
            );
            return proyectoObjetivoEditado;
        },

        eliminarObjetivo: async (parent, args) => {
            const proyectoObjetivoEliminado = await projectModel.findByIdAndUpdate(
                
                { _id: args.idProyecto },// filtro proyecto 
                {
                    $pull: {// operacion funcion de mongoDB de eliminacion de un elemento de un array 
                        // de un documento de mongoDB

                        objetivos: { //array al que se le eliminara el elemento 

                            _id: args.idObjetivo,//filtro del objetivo a eliminar
                        },

                    },
                },
                { new: true }
            );

            return proyectoObjetivoEliminado;
        },

    },
};
export { resolversProyecto };


