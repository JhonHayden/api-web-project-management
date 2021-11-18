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

const typeDefs = gql`


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

    type Usuario { 
        _id:ID!
        identificacion:String!
        nombre: String!
        apellido:String!
        correo:String!
        rol:Enum_RolUsuario!
        estado:Enum_EstadoUsuario

    }

     type Query{   
        Usuarios:[Usuario]
        Usuario(_id:String!):Usuario

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

    }
    `;

export { typeDefs }; // propiedad para el server de ApollServer ubicado en el index.ts