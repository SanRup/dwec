window.addEventListener("load", inicio);

function inicio() {
    document.getElementById("msg").addEventListener("blur", validaMsg); //blur change

    //para los eventos click -> cogemos el target <delegacion de eventos>
    //https://ed.team/blog/como-usar-la-delegacion-de-eventos-en-javascript
    //https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Events#delegaci%C3%B3n_de_eventos
    document.getElementById("checkDias").addEventListener("click", checkTodos);

    document.getElementById("msgArea").addEventListener("keydown", contadorTextArea);
   

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
        if(!document.getElementById(this.id + "SpanError")){
            creaError(this, "Este campo es obligatorio");
        }else{
            console.log("existe!! no lo hace");
            document.getElementById(this.id + "SpanError").style.animation = "shake 0.1s ease-in-out 0s 7 "
            //css que vibra -> no se llamar al CSS
        }
        
    }else{
        if(document.getElementById(this.id + "SpanError")){
            borraError(this)
        }else{
            console.log("no existe!! no borra");
        }
        //si no existe que no borre nada...
        
    }
}

function contadorTextArea(e) {
    console.log(e.target.value.length);
    console.log();
}

function checkTodos(e) {
    let dias = Array.from(document.formulario.dias)
    if (e.target.id == "todos") {

        if (e.target.checked == true) {
            dias.forEach(element => {
                element.checked = true;
            });
        }else{
            dias.forEach(element => {
                element.checked = false;
            });
        }
        
    } else if (e.target.id != "todos") {
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