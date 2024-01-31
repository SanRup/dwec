window.addEventListener("load", inicio);

function inicio() {
    document.getElementById("nombre").addEventListener("blur", validaCampoBasico); //blur para validar al perder el foco
    document.getElementById("nif").addEventListener("blur", validaCampoDNI); //blur para validar al perder el foco
    document.getElementById("fecha").addEventListener("click", validaCampoFecha); //change para validar al cambiar

    document.getElementById("msgArea").addEventListener("blur", validaCampoBasico); //blur para validar al perder el foco
    document.getElementById("msgArea").addEventListener("keyup", contadorTextArea);
   
    document.getElementById("cursos").addEventListener("change", validaCampoCurso); //change para validar al cambiar
    document.getElementById("cursos").addEventListener("change", opcionNuevoCurso);

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
    document.getElementById("checkDias").addEventListener("click", checkTodos);//importante llamar primero a checkTodos para que no de un falso mensaje de error
    document.getElementById("checkDias").addEventListener("click", validaCampoDias);//click para validar al hacer click

    document.getElementById("reset").addEventListener("click", resetForm); //click para validar al hacer click
    
    

}

//-----------FUNCIONES DE VALIDAR CAMPOS

function validaCampoBasico() {
    if (!this.checkValidity()) { //si es false -> no es valido
        //console.log("obligatorio" + this);
        comprobarMsgError("Este campo es obligatorio", this);
        return false;
    }else{
        //console.log("valido" + this);
        comprobarBorrarError(this);
        return true;
    }
}

function validaCampoDNI() {
    if (!this.checkValidity()) { //si es false -> no es valido
        comprobarMsgError("Este campo es obligatorio", this);
        return false;
    }else{//si es valido 
        if (!validarDNICompleto()) { //si es false -> no es valido
           comprobarMsgError("El DNI no es válido", this);
        }else{
            comprobarBorrarError(this);
        } 
        return true;
    }
}

function validaCampoFecha() {
    if (!this.checkValidity()) { //si es false -> no es valido
        comprobarMsgError("Este campo es obligatorio", this);
        return false;
    }else{//si es valido 
        if (!comprobarFechaActual()) {
            comprobarMsgError("La fecha no puede ser anterior a la actual", this);
        }else{
            comprobarBorrarError(this);
        }
        return true;
    }
}

function validaCampoCurso() {
    if (this.value == "nuevo") {
        comprobarMsgError("Elige un curso", this);
        return false; 
    }else{
        comprobarBorrarError(this);
    }
    return true;
}

function validaCampoDias() {
    let dias = Array.from(document.formulario.dias);
    let cont = 0;
    dias.forEach(element => {
        if (element.checked == true) {
            cont++;
        }
    });
    // console.log(cont);
    if (cont < 2) {
        comprobarMsgError("Elige 2 días como mínimo", this);
        return false;
    }else{
        comprobarBorrarError(this);
        return true;
    }
    
}

function resetForm() {
    let formulario = document.getElementsByClassName("error"); 
    console.log(formulario);
    for (let i = formulario.length - 1; i >= 0; i--) {
        console.log(formulario[i]);
        formulario[i].remove();
    }

    formulario = document.getElementsByClassName("errorInput"); 
    console.log(formulario);
    for (let i = formulario.length - 1; i >= 0; i--) {
        console.log(formulario[i]);
        formulario[i].className = "";
    }
    
}

// ---------CREAR ERRORES

//crea un span para mostrar el mensaje de error
function creaError(event, msg) {
    // console.log("creando error");
    // console.log(event.parentNode.id);
    let parrafo = document.createElement("span");
    parrafo.className = "error";
    event.className = "errorInput";
    parrafo.id = event.id + "SpanError";
    let texto = document.createTextNode(msg);
    parrafo.appendChild(texto);
    let parentNode = event.parentNode;
    parentNode.insertBefore(parrafo, event.nextSibling);

    deshabilitarBoton();
}

//elimina el span con error
function borraError(event) {
    // console.log("ya lo borra");
    // console.log(event);
    // console.log(event.nextSibling.id);
    if(event.nextSibling.id == event.id + "SpanError"){
        // console.log("remove");
        // console.log(event.nextSibling.id);
        document.getElementById(event.id + "SpanError").remove();
        event.className = "";
    }

    habilitarBoton();
}

//--------------------------

//--------------DESHABILITAR BOTON
    function deshabilitarBoton() {
        document.getElementById("submit").disabled = true;
    }

    function habilitarBoton() {
        document.getElementById("submit").disabled = false;
    }
//--------------------------


//-------------comprobaciones de mensajes errores
function comprobarMsgError(msg, event) {
    // console.log("comporbar");
    comprobarBorrarError(event)
    if(!document.getElementById(event.id + "SpanError")){
        // console.log("crea");
        //si no tiene el id de error, crea el error
        creaError(event, msg);
    }
}

function comprobarBorrarError(event) {
    // console.log("borrar" + event);
    // console.log(event);
    if(document.getElementById(event.id + "SpanError")){
        // console.log("borrando");
        //si tiene el id de error, lo borra
        borraError(event)
    }
    //si no existe, no borra nada... 
}
//------------------------------

//---------------VALIDACION PERSONALIZADA

//DNI
function validarDNICompleto() {
    let dniCompleto = document.getElementById("nif").value;
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

//FECHA
function comprobarFechaActual() {
    let fechaSeleccionada = new Date(document.getElementById("fecha").value);
    let fechaActual = new Date();
    if (fechaActual > fechaSeleccionada) {
        return false;
    }
    return true;
}

//contador para el textarea
function contadorTextArea(e) {
    //si usamos keyup cuenta bien pero no inmediato
    //con keydown cuenta inmediato pero si escribes y borras todo se queda en 499.
    
    let cont = e.target.value.length; //cuenta la longitud del valor (numero de caracteres)
    document.getElementById("contCaracter").innerHTML = e.target.getAttribute("maxlength") - cont; //resta el maximo al contador
}

//añadir un nuevo curso
function opcionNuevoCurso() {
    var elemento = document.getElementById("cursos");
    if (elemento.value == "nuevo") {
        let opcionNueva = document.createElement("option");
        let cursoNuevo = prompt("Introduce el nuevo curso: ");
        if (cursoNuevo == undefined) { //si cancelas el prompt	
            console.log("cancelado");
            elemento.value = elemento.firstChild.value; //selecciona la primera opcion
            return; // y sale de la funcion
        }
        opcionNueva.textContent = cursoNuevo;
        opcionNueva.value = opcionNueva.textContent;

        elemento.insertBefore(opcionNueva, elemento.lastElementChild);

        elemento.value = opcionNueva.value; //selecciona la opcion nueva
    }
}


//check de todos los dias
function checkTodos(e) {
    //crear array con todos los elementos de dias
    let dias = Array.from(document.formulario.dias);
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

