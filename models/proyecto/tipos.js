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
const tiposProyecto = gql`
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
        avances:[Avance]!
        inscripciones:[Inscripcion]!
    }
     type Query{   
       
        Proyectos:[Proyecto]
        Proyecto(_id:String!):Proyecto
    }
    type Mutation{
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
            _id:String!
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
    }
    `;
export { tiposProyecto }; // propiedad para el server de ApollServer ubicado en el index.ts