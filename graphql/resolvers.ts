import { resolversUsuario } from "../models/usuario/resolvers";
import { resolversProyecto } from "../models/proyecto/resolvers";
import { resolversAvance } from "../models/avance/resolvers";
import { resolversInscripcion } from "../models/inscripcion/resolvers";
// import { resolversInscripcion } from "../models/inscripcion/resolvers";

// resolvers globales para toda la aplicacion 
export const resolvers = [resolversUsuario, resolversAvance, resolversProyecto,resolversInscripcion];
// estos resolvers se los paso a ApolloServer en su parametro de resolvers por medio de importar
// en el index.js esta varible resolver que me contiene un array con todos los resolvers 
// de la aplicacion 