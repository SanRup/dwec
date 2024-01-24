function validarDNICompleto(dniCompleto) {
    // Comprobamos que la cadena tenga longitud 9 y que los primeros 8 caracteres sean números
    // if (!/^\d{8}[A-Za-z]$/.test(dniCompleto)) {
    // return "DNI inválido";
    // }
    
    // Extraemos el número y la letra de la cadena
    var numeroDNI = parseInt(dniCompleto.slice(0, 8), 10);
    var letraDNI = dniCompleto.charAt(8);
    
    // Array con las letras del DNI
    var letrasDNI = "TRWAGMYFPDXBNJZSQVHLCKE";
    // Calculamos la posición de la letra
var posicion = numeroDNI % 23;

// Obtenemos la letra correspondiente
var letraCalculada = letrasDNI.charAt(posicion);

// Comparamos la letra calculada con la letra proporcionada
if (letraCalculada.toUpperCase() === letraDNI.toUpperCase()) {
return "DNI válido";
} else {
return "DNI inválido";
}
}