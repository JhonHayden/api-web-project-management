import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import conectarBD from './db/db.js';
import { tipos } from './graphql/types.js';// para usar mis tipos o modelos definidos de mis colecciones en graphql
import { resolvers } from './graphql/resolvers.js';
import { validateToken } from './utils/tokenUtils.js';

//CONFIGURACIONES DEL SERVIDOR DE EXPRESS (app) Y EL SERVIDOR DE GRAPHQL(server)

dotenv.config(); // me permite usar las variables de entorno en toda la aplicaciòn

const getUserData = (token) => {// funcion que me obtiene la informacion o el payload del token del usuario que incio sesion 
    // console.log(token)
    const verificacion = validateToken(token.split(' ')[1]);// llamada a funcion de la carpeta utils del archivo tokenUtils.js que 
    // me valida el token esta tiene el metodo verify de la libreria jwt 
    // estando aqui escrita en la propiedad de context del ApolloServer se ejecutara cada vez que el frontend haga una peticion 
    // al backend  muy semejante a un middleware 
    // el metodo .split(' ')[1] me retorna de un string completo pero que esta separado por espacion una lista donde cada elemento es 
    // la palabra completa si un spacio que le seguia .. es decir en este caso retorna una lista de dos elementos el primero en la 
    // posicion cero esta la palabra Bearer luego en segundo elemento en la posicion 1 esta el token entonces aqui me permite separar el token del 
    // Bearear y entregarlo como parametro al metodo validateToken
    // console.log(verificacion)
    if (verificacion.data) { // verificacion.data es una objeto  que me tiene el resultado de la validacion del token  el cual es un 
        // objeto con los datos del usuario y la fecha de expiracion y creacion del token es decir tiene el payload carga util del 
        // token, entonces si tiene contenido que me retorne solo la data
        return verificacion.data;
    } else {
        return null;
    }
};

const server = new ApolloServer({ // definicion, declaracion e instancia de un servidor de graphQL

    // propiedades del server 
    typeDefs: tipos,// tipos ... definiciones de los tipos de nuestros modelos de las colecciones 
    // definiciones de nuestros modelos // le paso los typeDfes del archivo types.ts de la carpeta graphql
    resolvers: resolvers,// le paso resolvers del archivo resolver.ts de la carpeta graphql

    // el desarrollo de graphQL se basa en estas dos primera dos  propiedades, en su definicion 


    // el req   del context es el request desde el frontend de el extraeremos el token embebido en los headers
    // tiene que llamarse req obligatoriamente no se puede definir con otro nombre sale error no deja 
    context: ({ req }) => { // propiedad que me permite ejecutar una funcion cada vez que se hace una request desde el frontend
        // al ApolloServer .. es decir si le hacen una peticion esta funcion se ejecuta con esto 
        // podemos verificar el token siempre que el frontend haga una request

        const tokenConBearer = req.headers?.authorization ?? null // expresion de si no hay la palabra authorization en 
        // el request ponga null 

        if (tokenConBearer) {// validacion si existe el token esto para poder conetarme con el explorer de apollo studio dado que 
            // apollos studio no me envia token entonces entra en error si no valido esto y solome quedo esperando token si dejar la otra 
            // opcion de conectarme en el caso de que no haya token si hay token me conecto igual y si no tambien pues retorno un null en el 
            // context 

            // console.log('Token mas el Bearer: ',req.headers.authorization);// contiene el token = req.headers.authorization
            // console.log('request.headers.authorization: ', req);

            const userData = getUserData(tokenConBearer); // me permite ejecutar la validacion del token y extraer la informacion del usuario y asignarla 
            // a userData para luego retornar.. userData es mi contexto para toda la aplicacion

            if (userData) {

                return { userData }; // variable que retorna el callback del context de ApolloServer y es la variable que 
                // podre usar en toda la aplicacion es como una variable global y esta contiene la informacion del usuario que 
                // acaba de iniciar sesion con esta podemos restrigir request dependiento del rol del usuario si le consultamos a esta variable
                // el atributo rol que contiene
                // userData es un objeto y asi tengo que retornar objetos --> return { objeto }
                
                // para acceder a ella es simple en los resolver, el tercer input de la arrow funcion async, se llama ese input como context 
                // y es esta variable global 
                // ejemplo :  validateToken: async (parent, args, context) => {  context es la variable global por context entra los datos 
                //     de userData que  el payload la informacion del usuario que acaba de iniciar sesion 
            }
        }

        return null;// retorno null cuando no hay token eso sucede cuando me conect con un cliente de apollo studio entonces debo 
        // retornar null en el context para asi poder conectarme con el cliente de apollo studio
    },
});

const app = express(); // definicione de la aplicacion de express 

// uso de Middleware
app.use(express.json()); // permite que los request sean en formato json

app.use(cors()); // me permite hacer request de muchos origenes 

// usaremos el servidor de Express para encender el servidor de graphql 
app.listen({ port: process.env.PORT || 4000 }, async () => { // corre el servidor, prende el servidor de Express (app)
    //process.env.PORT:  me permite usar la varible de entorno del puerto es decir me trae el valor de la variable 
    // definida como PORT del archivo .env.  si no encuentra este valor ya pone la otra opcion de la logica or el numero 4000 
    await conectarBD(); // conexion a la bases de datos de mongoDB
    await server.start();// corre, prende, enciende e inicia el servidor de graphQL, este 
    // servidor nos permite generar la ruta para todos los request del front 
    server.applyMiddleware({ app })// permite usar al servidor de grahpQL (server), los middlewares mismos
    //  del servidor de express (app), es decir los mismos middlewares que defina para el servidor 
    // de express (app) los usa el servidor de graphql (server) 
    console.log("Servidor de graphQL listo")
});


