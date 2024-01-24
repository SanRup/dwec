window.addEventListener("load", inicio);

function inicio() {
    document.getElementById("msg").addEventListener("blur", validaMsg) //blur change
    document.getElementById("todos").addEventListener("click", validaCheck)
    document.getElementById("martes").addEventListener("click", validaCheck)
    document.getElementById("lunes").addEventListener("click", validaCheck)
    document.getElementById("miercoles").addEventListener("click", validaCheck)
    document.getElementById("jueves").addEventListener("click", validaCheck)
}

function creaError(e, msg) {
    let parrafo = document.createElement("span");
    parrafo.id = e.id + "SpanError";
    let texto = document.createTextNode(msg);
    parrafo.appendChild(texto);
    e.parentNode.appendChild(parrafo);
}

function borraError(e) {
    if(e.nextSibling.id == e.id + "SpanError"){
        document.getElementById(e.id + "SpanError").remove();
    }
}

function validaMsg() {
    if (!this.checkValidity()) {
        //si ya tiene uno no puede crear otro !!! comprobar
        //si ya existe que vibre la p!!!! que bonito
        creaError(this, "Este campo es obligatorio");
    }else{
        //si no existe que no borre nada...
        borraError(this)
    }
}

function validaCheck() {
    let dias = Array.from(document.formulario.dias)
    if (this.id == "todos" && this.checked == true) {
        dias.forEach(element => {
            element.checked = true;
        });
        
    } else if (this.id == "todos" && this.checked == false) {
        dias.forEach(element => {
            element.checked = false;
        });
    } else if(!dias.some((value)=>{value==false})){
        document.getElementById('todos').checked=false;
    }
}



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