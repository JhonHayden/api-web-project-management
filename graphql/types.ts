import { gql } from "apollo-server-express";


// definiciones de los tipos (modelos, estructura de las colecciones)

//los typesDefs son las definiciones y declaracion de las intrucciones de las operaciones a 
// la base de datos es decir me define su estructura de estas instrucciones o operaciones 
// para coleccion que tenga le defino el type de la coleccion es decir el nombre como tal de la coleccion y 
// dentro esta los campos que tendran cada documento de esta coleccion y luego defino la operacion para esta coleccion 
// usando el nombre de la coleccion como valor 

//aqui defino la estructura de como deben ser los request del front es decir que debe tener que campos y de que tipo 
// de dato son es como una copia de los modelos en mongoose

// typeDefs tambien me define la estructura de los tipos de las operaciones que puedo hacer el en backend 

//  scalar Date me permite poder usar el tipo Date para la fechas 
// dado que graphQL solo tiene tipos basicos en String Int Float Boolean y ID 
//cuando necesito usar tipos diferentes o adicionales como en este caso el Date debo definir estos tipos 
// como scalar Date, esto hace que sea un tipo personalizado  
const typeDefs = gql`

    scalar Date

    enum Enum_RolUsuario{
        ESTUDIANTE
        LIDER
        ADMINISTRADOR
    }

    enum Enum_EstadoUsuario{
        PENDIENTE
        AUTORIZADO
        NO_AUTORIZADO
    }

    enum Enum_EstadoProyecto {
        ACTIVO
        INACTIVO
    }

    enum Enum_FaseProyecto {
        INICIADO
        EN_DESARROLLO
        TERMINADO
        NULA
    }

    enum Enum_TipoObjetivo {
        GENERAL
        ESPECIFICO
    }


    type Usuario { 
        _id:ID!
        identificacion:String!
        nombre: String!
        apellido:String!
        correo:String!
        rol:Enum_RolUsuario!
        estado:Enum_EstadoUsuario

    }
    input edicionUsuario{
        
        identificacion:String
        nombre: String
        apellido:String
        correo:String
        rol:Enum_RolUsuario
        estado:Enum_EstadoUsuario
        }

    type Objetivo{
        _id:ID!
        descripcion:String!
        tipo:Enum_TipoObjetivo!
    }

    input crearObjetivo{

        descripcion:String!
        tipo:Enum_TipoObjetivo!
    }

    type Proyecto {
        _id:ID!
        nombre:String!
        objetivos:[Objetivo]!
        presupuesto:Float!
        fechaInicio:Date!
        fechaFin:Date!
        estado:Enum_EstadoProyecto!
        fase:Enum_FaseProyecto!
        lider:Usuario!
    }

    
    type Avance {
        _id:ID!
        fecha:Date!
        descripcion:String!
        observaciones:[String]
        proyecto:Proyecto!
        creadoPor:Usuario!

    }


     type Query{   
        Usuarios:[Usuario]
        Usuario(_id:String!):Usuario
        Proyectos:[Proyecto]
        Proyecto(_id:String!):Proyecto
        Avances:[Avance]
        Avance(_id:String!):Avance


    }

    type Mutation{
        crearUsuario(
            identificacion:String!
            nombre: String!
            apellido:String!
            correo:String!
            rol:Enum_RolUsuario!
            estado:Enum_EstadoUsuario
        ):Usuario

        eliminarUsuario(
            _id:String
            correo:String
            identificacion:String 
        ):Usuario

        editarUsuario(
            identificacion:String
            nombre: String
            apellido:String
            correo:String
            rol:Enum_RolUsuario
            estado:Enum_EstadoUsuario
        ):Usuario





        crearProyecto(
            nombre: String!
            objetivos: [crearObjetivo]!
            presupuesto: Float!
            fechaInicio:Date!
            fechaFin:Date!
            estado: Enum_EstadoProyecto
            fase: Enum_FaseProyecto
            lider: String!
        ):Proyecto

        eliminarProyecto(
            _id:String
        ):Proyecto

        editarProyecto(
            _id:ID!
            nombre:String
            objetivos:[crearObjetivo]
            presupuesto:Float
            fechaInicio:Date
            fechaFin:Date
            estado:Enum_EstadoProyecto
            fase:Enum_FaseProyecto
            lider:String
        ):Proyecto





        crearAvance(
            fecha:Date!
            descripcion:String!
            observaciones:[String]
            proyecto:String!
            creadoPor:String!
        ):Avance

        eliminarAvance(
            _id:String
        ):Avance

        editarAvance(
            _id:ID!
            descripcion:String
            observaciones:[String]
            proyecto:String
            creadoPor:String
            
        ):Avance
    }
    `;

export { typeDefs }; // propiedad para el server de ApollServer ubicado en el index.ts