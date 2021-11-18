// definicion de enumeradores coleccion usuario:  es un objeto 
enum Enum_RolUsuario {
    ESTUDIANTE = 'ESTUDIANTE',
    LIDER = 'LIDER',
    ADMINISTRADOR = 'ADMINISTRADOR',
}
enum Enum_EstadoUsuario {
    PENDIENTE = 'PENDIENTE',
    AUTORIZADO = 'AUTORIZADO',
    NO_AUTORIZADO = 'NO_AUTORIZADO',
}

// definicion de enumeradores coleccion proyectos:  es un objeto 
enum Enum_EstadoProyecto {
    activo = 'Activo',
    inactivo = 'Inactivo',
}

enum Enum_FaseProyecto {
    iniciado = 'Iniciado',
    en_desarrollo = 'En desarrollo',
    terminado = 'Terminado',
    nula = '', // para la opcion de nula en el inicio del proyecto 
}


// enumerador de los tipo de objetivos 
enum Enum_TipoObjetivo {
    general = 'General',
    especifico = 'Especifico',
}

// enumerador de Estado inscripcion 
enum Enum_EstadoInscripcion {
    acertada = 'Aceptada',
    rechazada = 'Rechazada',
}
export {
    Enum_RolUsuario,
    Enum_EstadoUsuario,
    Enum_FaseProyecto,
    Enum_EstadoProyecto,
    Enum_TipoObjetivo,
    Enum_EstadoInscripcion
};
