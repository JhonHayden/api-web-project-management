import jwt from 'jsonwebtoken';

const validateToken = (token) => {
    if (token) {// si existe token se verifica luego si es bueno 
        const verification = jwt.verify(token, 'secret', (err, data) => {// metodo verify me permite verificar 
            // si el token esta bueno y para esto recibe el token como primer parametro luego la secretOrPrivateKey (privateKey)
            // del metodo sign que usamos para generar el token mismo .. el segundo parametro del metodo sign es la privateKey
            // que ponemos aqui como segundo parametro en el metodo verify y asi verificar si el token que entra como parametro 
            // es bueno o no, luego el tercer parametro del metodo verify es una callback funcion que se ejecuta luego de terminar 
            // la primera funcion verify 
            // console.log("error: ", err, "data del metodo jwt.verify : ", data);

            if (data) {// data contiene el payload la carga util incrustada en el token es decir tiene la informacion del usuario 
                // que acaba de iniciar sesion con el metod verify literal estamos decodificando el token y extrayendo la informacion 
                // util del usuario, informacion que se incrusto al inicio cuando se creo y genero el token en generateToken con el metodo 
                // sign de jwt 
                return {
                    data: data, // retorna un objeto
                };
            };
            if (err) { // si hay un error con la verificacion del token es decir los token no coiciden devuelve el erro 
                return {
                    error: err,
                    // soy:"el error "
                };
            };

        });

        // console.log("verificacion del token : ", verification);// si me envian un token que no es al imprimir aqui el resultado 
        // de la verificacion del metodo jwt.verify saca error
        return verification;
    }
};

const generateToken = (payload) => {  // payload= carga útil, es la informacion incrustada que lleva el token hacia
    // el fronted informacion que viaja con el token .. payload es un nombre estandar por convencion como los i de los for 
    // la informacion que podemos enviar es informacion del perfil del usuario en sesio para que muestre en el front
    // su perfil en cada pagina  
    return jwt.sign(payload, 'secret', {// funcion sign:firmar token me genera el token 
        // jwt.sign (carga útil, secretOrPrivateKey(privateKey), [opciones, devolución de llamada])
        // el segundo parmetro de la funcion sign es la privateKey que sirve para validar si un token enviado
        // desde el front  si esta bueno 
        // si alguien externo se da cuenta de esta privateKey puede generar token buenos y entrar a nuestra aplicacion 
        // y hacer daño.. podra hacer peticiones 
        expiresIn: '24h' // tiempo de expiracion del token son 24h  .. es decir cuanto tiempp le damos al 
        // usuario que mantega una sesion iniciada en la aplicacion sin que le tengamos que pedir de nuevo 
        // el usuario y contraseña  mejora mucho la experiencia del usuario en la aplicacion la extrategia es 
        // revisar cuando el usuario inicie sesion verificar si el token aun es valido y si esta activo lo renovamos 
        // si una persona entra a nuestra aplicacion, donde tenemos 24 horas de valides del token, todos lod dias 
        // se validaria que esta activo el token y no se cerraria sesion pero si se demora mas de 24h en iniciar seseion 
        // de nuevo se pierde el token y se cierra sesion y tendria que iniciar sesion con usuario y contraseña de nuevo 
        // y se volveria a generar un toke de 24 horas, lo mas comun es 24h pero eso depende 
    });
};
export { generateToken, validateToken };