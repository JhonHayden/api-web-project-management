import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import conectarBD from './db/db.js';
import { tipos } from './graphql/types.js';// para usar mis tipos o modelos definidos de mis colecciones en graphql
import { resolvers } from './graphql/resolvers.js';

//CONFIGURACIONES DEL SERVIDOR DE EXPRESS (app) Y EL SERVIDOR DE GRAPHQL(server)

dotenv.config(); // me permite usar las variables de entorno en toda la aplicaciòn

const server = new ApolloServer({ // definicion, declaracion e instancia de un servidor de graphQL

    // propiedades del server 
    typeDefs: tipos,// tipos ... definiciones de los tipos de nuestros modelos de las colecciones 
    // definiciones de nuestros modelos // le paso los typeDfes del archivo types.ts de la carpeta graphql
    resolvers: resolvers,// le paso resolvers del archivo resolver.ts de la carpeta graphql

    // el desarrollo de graphQL se basa en estas dos propiedades, en su definicion 
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


