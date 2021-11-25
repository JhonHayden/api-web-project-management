import { gql } from "apollo-server-express"; // me permite importar la funcion para 
// generar template o plantillas de consulta del lado del servidor 

const tiposInscripcion = gql`

    type Inscripcion {
        _id:ID!
        fechaIngreso:Date
        fechaEgreso:Date
        estado:Enum_EstadoInscripcion!
        proyecto:Proyecto!
        estudiante:Usuario!
    }
    type Query {

        Inscripciones:[Inscripcion]
        Inscripcion(_id:String!):Inscripcion
    }
    type Mutation{

        crearInscripcion(
            proyecto:String!
            estudiante:String!
        ):Inscripcion

        eliminarInscripcion(_id:String!):Inscripcion

        editarInscripcion(
            _id:ID!
            fechaIngreso:Date
            fechaEgreso:Date
            estado:Enum_EstadoInscripcion!
            proyecto:String
            estudiante:String
        ):Inscripcion

        aprobarInscripcion(
            _id:String!
        ):Inscripcion 
    }
`;
export { tiposInscripcion };