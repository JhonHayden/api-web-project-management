import { resolversUsuario } from "../models/usuario/resolvers.js";
import { resolversProyecto } from "../models/proyecto/resolvers.js";
import { resolversAvance } from "../models/avance/resolvers.js";
import { resolversInscripcion } from "../models/inscripcion/resolvers.js";
import { resolversAutenticacion } from "./auth/resolvers.js";
// import { resolversInscripcion } from "../models/inscripcion/resolvers";

// resolvers globales para toda la aplicacion 
export const resolvers =
    [resolversUsuario,
        resolversAvance,
        resolversProyecto,
        resolversInscripcion,
        resolversAutenticacion];
// estos resolvers se los paso a ApolloServer en su parametro de resolvers por medio de importar
// en el index.js esta varible resolver que me contiene un array con todos los resolvers 
// de la aplicacion 