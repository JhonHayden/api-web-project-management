import jwt from 'jsonwebtoken';

const generateToken = (payload) => {  // payload= carga útil, es la informacion incrustada que lleva el token hacia
    // el fronted informacion que viaja con el token .. payload es un nombre estandar por convencion como los i de los for 
    // la informacion que podemos enviar es informacion del perfil del usuario en sesio para que muestre en el front
    // su perfil en cada pagina  
    return jwt.sign(payload,'secret',{// funcion sign:firmar token me genera el token 
        // jwt.sign (carga útil, secretOrPrivateKey, [opciones, devolución de llamada])
        expiresIn:'24h' // tiempo de expiracion del token son 24h  .. es decir cuanto tiempp le damos al 
        // usuario que mantega una sesion iniciada en la aplicacion sin que le tengamos que pedir de nuevo 
        // el usuario y contraseña  mejora mucho la experiencia del usuario en la aplicacion la extrategia es 
            // revisar cuando el usuario inicie sesion verificar si el token aun es valido y si esta activo lo renovamos 
        // si una persona entra a nuestra aplicacion, donde tenemos 24 horas de valides del token, todos lod dias 
        // se validaria que esta activo el token y no se cerraria sesion pero si se demora mas de 24h en iniciar seseion 
        // de nuevo se pierde el token y se cierra sesion y tendria que iniciar sesion con usuario y contraseña de nuevo 
        // y se volveria a generar un toke de 24 horas, lo mas comun es 24h pero eso depende 
    });
};
export {generateToken};