import conectarBD from './db/db'; // importo la funcion conectarBD para poder usarla en mi index.js que tendra 
// todas las llamadas a funciones y configuraciones del backend es decir el index.js representa el server 


const main = async() => { // funcion principal me retorna la conexion a la BD
    await conectarBD();
}


main(); // llamado a la ejecucion de la funcion principal 