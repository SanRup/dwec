window.addEventListener("load", inicio);

function inicio() {
    document.getElementById("dni").addEventListener("blur", validarDNICompleto); //blur para validar al perder el foco
    document.getElementById("dni").addEventListener("blur", validarCampo); //blur para validar al perder el foco
    document.getElementById("msg").addEventListener("blur", validaCampo); 

    document.getElementById("msgArea").addEventListener("keyup", contadorTextArea);
   
    document.getElementById("cursos").addEventListener("change", opcionNueva);

    /*
        para los eventos click de dias -> cogemos el target en el div <delegacion de eventos>

        DELEGACIÓN DE EVENTOS
        Consiste en asignar el eventListener a un elemento padre que contiene todos los hijos que quieres escuchar y que
        van a reaccionar al mismo evento y misma función.
        Asi con un solo listener se escucha a todos los hijos.
        Esto es posible gracias a la propagacion de eventos (bubbling)

                 oOoOo (bubbles)
        \          ^         /
         \_________|________/ ->padre     El evento se produce en el hijo y se propaga hacia arriba
           \_______|______/  ->hijo       Con event.target sabemos quien ha provocado el evento
                   |           

        --> Fuentes           
        https://ed.team/blog/como-usar-la-delegacion-de-eventos-en-javascript
        https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Events#delegaci%C3%B3n_de_eventos
    */
    document.getElementById("checkDias").addEventListener("click", checkTodos);
    
    

}



function validaCampoDNI() {
    if (!this.checkValidity()) { //si es false -> no es valido
        comprobarMsgError("Este campo es obligatorio");
    }else{//si es valido 
        if (!validarDNICompleto()) { //si es false -> no es valido
           comprobarMsgError("El DNI no es válido");
        }
        comprobarBorrarError();
    }
}

// ---------CREAR ERRORES

//crea un span para mostrar el mensaje de error
function creaError(e, msg) {
    let parrafo = document.createElement("span");
    parrafo.id = e.id + "SpanError";
    let texto = document.createTextNode(msg);
    parrafo.appendChild(texto);
    e.parentNode.appendChild(parrafo);
}

//elimina el span con error
function borraError(e) {
    if(e.nextSibling.id == e.id + "SpanError"){
        document.getElementById(e.id + "SpanError").remove();
    }
}

//--------------------------


//-------------comprobaciones de mensajes errores
function comprobarMsgError(msg) {
    if(!document.getElementById(this.id + "SpanError")){
        //si no tiene el id de error, crea el error
        creaError(this, msg);
    }else{  
        //si lo tiene, vibra 
        document.getElementById(this.id + "SpanError").style.animation = "shake 0.1s ease-in-out 0s 7 "
        //css que vibra -> no se llamar al CSS
    }
}

function comprobarBorrarError() {
    if(document.getElementById(this.id + "SpanError")){
        //si tiene el id de error, lo borra
        borraError(this)
    }
    //si no existe, no borra nada... 
}
//------------------------------


//validar Campo con los atributos de html 
function validaCampo() {
    //Si uno de los campos no es valido, devuelve false
    if (!this.checkValidity()) {
        //si no es valido
        if(!document.getElementById(this.id + "SpanError")){
            //si no tiene el id de error, crea el error
            creaError(this, "Este campo es obligatorio");
        }else{  
            //si lo tiene, vibra 
            document.getElementById(this.id + "SpanError").style.animation = "shake 0.1s ease-in-out 0s 7 "
            //css que vibra -> no se llamar al CSS
        }
        return false;
    }else{
        //si es valido 
        if(document.getElementById(this.id + "SpanError")){
            //si tiene el id de error, lo borra
            borraError(this)
        }
        //si no existe, no borra nada... 
        return true;
    }
}

//contador para el textarea
function contadorTextArea(e) {
    //si usamos keyup cuenta bien pero no inmediato
    //con keydown cuenta inmediato pero si escribes y borras todo se queda en 499.
    
    let cont = e.target.value.length; //cuenta la longitud del valor (numero de caracteres)
    document.getElementById("contCaracter").innerHTML = e.target.getAttribute("maxlength") - cont; //resta el maximo al contador
}

//check de todos los dias
function checkTodos(e) {
    //crear array con todos los elementos de dias
    let dias = Array.from(document.formulario.dias)
    //si el evento viene de todos
    if (e.target.id == "todos") {
        //si viene de todos
        if (e.target.checked == true) {
            //y esta check, los dias se ponen checked
            dias.forEach(element => {
                element.checked = true;
            });
        }else{
            //si no esta check, lo quita a los dias
            dias.forEach(element => {
                element.checked = false;
            });
        }  
    } else if (e.target.id != "todos") {
        //si el evento viene de cualquier otro día
        document.getElementById('todos').checked=false;
        //quita el check a todos
    } 
}


function opcionNueva() {
    var elemento = document.getElementById("cursos");
    if (elemento.value == "nuevo") {
        let opcionNueva = document.createElement("option");
        opcionNueva.textContent = prompt("Introduce el nuevo curso: ");

        elemento.insertBefore(opcionNueva, elemento.lastElementChild);
    }

}


function validarDNICompleto() {
    let dniCompleto = document.getElementById("dni").value;  
    // Extraemos el número y la letra de la cadena
    let numeroDNI = parseInt(dniCompleto.slice(0, 8), 10);
    let letraDNI = dniCompleto.charAt(8);
    
    // Array con las letras del DNI
    let letrasDNI = "TRWAGMYFPDXBNJZSQVHLCKE";
    // Calculamos la posición de la letra
    let posicion = numeroDNI % 23;

    // Obtenemos la letra correspondiente
    let letraCalculada = letrasDNI.charAt(posicion);

    // Comparamos la letra calculada con la letra proporcionada
    if (letraCalculada.toUpperCase() === letraDNI.toUpperCase()) {
        return true;
    } else {
        return false;
    }
}