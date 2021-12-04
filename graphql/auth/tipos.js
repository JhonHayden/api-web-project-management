import { gql } from "apollo-server-core";


// defino la estructura de los tipos de mutaciones en la autenticacion 
const tiposAutenticacion = gql`

    type Token {
        token:String
        error:String
    }

    type Mutation{

        registro(
            identificacion:String!
            nombre: String!
            apellido:String!
            correo:String!
            rol:Enum_RolUsuario!
            estado:Enum_EstadoUsuario
            password:String!
        ):Token

        login(
            correo:String!
            password:String!
        ):Token   

        actualizarToken:Token

    }
`;
export { tiposAutenticacion };