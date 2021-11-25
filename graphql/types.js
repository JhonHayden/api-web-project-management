import { gql } from "apollo-server-express";
import { tiposEnumeradores } from "../models/enumeradores/tipos.js";
import { tiposProyecto } from "../models/proyecto/tipos.js";
import { tiposUsuario } from "../models/usuario/tipos.js";
import { tiposAvance } from "../models/avance/tipos.js";
import { tiposInscripcion } from "../models/inscripcion/tipos.js";
import { tiposAutenticacion } from "./auth/tipos.js";
// definicion de tipos globales o input globales 

//  scalar Date me permite poder usar el tipo Date para la fechas 
// dado que graphQL solo tiene tipos basicos en String Int Float Boolean y ID 
//cuando necesito usar tipos diferentes o adicionales como en este caso el Date debo definir estos tipos 
// como scalar Date, esto hace que sea un tipo personalizado
const tiposGlobales = gql`

    scalar Date

    `;

export const tipos =
    [tiposGlobales,
        tiposProyecto,
        tiposUsuario,
        tiposEnumeradores,
        tiposAvance,
        tiposInscripcion,
        tiposAutenticacion,
    ];//exporto todos los tipos para ser usuados en toda la aplicacion los guardo en una variable
    //  y esta es la recibira como parameto typeDefs del ApolloServer el en index.ts solo la importo en
    //  el index y se lo paso a apolloserver 