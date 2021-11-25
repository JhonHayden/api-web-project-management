import { gql } from "apollo-server-core";

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
        ):Token!
    }
`;
export { tiposAutenticacion };