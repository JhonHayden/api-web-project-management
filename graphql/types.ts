import { gql } from "apollo-server-express";
import { tiposEnumeradores } from "../models/enumeradores/tipos";
import { tiposProyecto } from "../models/proyecto/tipos";
import { tiposUsuario } from "../models/usuario/tipos";
import { tiposAvance } from "../models/avance/tipos";

// definicion de tipos globales o input globales 
const tiposGlobales = gql`

    scalar Date

    `;

export const tipos =
    [tiposGlobales,
        tiposProyecto,
        tiposUsuario,
        tiposEnumeradores,
        tiposAvance
    ];//exporto todos los tipos para ser usuados en toda la aplicacion los guardo en una variable
    //  y esta es la recibira como parameto typeDefs del ApolloServer el en index.ts solo la importo en 
    //  el index y se lo paso a apolloserver 