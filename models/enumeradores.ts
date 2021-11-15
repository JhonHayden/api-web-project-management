// definicion de enumerador colecion usuario  es un objeto 
enum Enum_RolUsuario {
    estudiante = 'Estudiante',
    lider = 'Lider',
    administrador = 'Administrador',
}
enum Enum_EstadoUsuario {
    pendiente = 'Pendiente',
    autorizado = 'Autorizado',
    no_autorizado = 'No Autorizado',
}

export { Enum_RolUsuario, Enum_EstadoUsuario };
