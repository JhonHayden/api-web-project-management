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

const tiposAvance = gql`
    type Avance {
        _id:ID!
        fecha:Date!
        descripcion:String!
        observaciones:[String]
        proyecto:Proyecto!
        creadoPor:Usuario!
    }
     type Query{   
        
        Avances:[Avance]
        Avance(_id:String!):Avance
        filtrarAvance(_id:String!):[Avance]
    }
    type Mutation{
              
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
export { tiposAvance }; // propiedad para el server de ApollServer ubicado en el index.ts