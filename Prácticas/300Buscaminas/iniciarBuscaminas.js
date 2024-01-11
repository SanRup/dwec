        var OPCIONES = {
            dificultad: {
                facil: 9,
                medio: 15,
                dificil: 19
            }
            
        }
        
        window.addEventListener("load", inicio);

        function inicio() {
            let divDif = document.getElementById("dificultad");
                        
                for (let i = 0; i < divDif.childElementCount; i++) {
                    let boton = divDif.children[i];
                    boton.addEventListener("click", dibujarTableroHTML);
                }
    
        }

        function prueba(e) {
            let divTablero = document.getElementById("board");
                    
                for (let i = 0; i < divTablero.childElementCount; i++) {
                    console.log(divTablero.childElementCount);
                    let boton = divTablero.children[i].children;
                    boton.addEventListener("click", prueba);
                }
            console.log("a");
            console.log(e.target)
            
        }
       

        function dibujarTableroHTML(e) {
            let dif = e.target.id; //coge el id del boton pulsado en el evento
            generarTableroJS(OPCIONES.dificultad[dif]); //genera el tablero con la dificultad que genera el evento(dif) llamada desde el objeto dificultad
        }
        
        function generarTableroJS(size){
            let tablero = document.getElementById("board");
            if (tablero.children.length != 0) { //si en el tablero hay algo, lo borra
                if (confirm("quieres empezar de nuevo?")) { //confirm antes de borrar el tablero
                    while (tablero.firstChild){ 
                        tablero.removeChild(tablero.firstChild);
                    };
                } else{
                    return false;
                } 
            }
            for (let i = 0; i < size; i++) { //genera un div por cada linea
                let divLinea = document.createElement("div");
                divLinea.id = i;
                tablero.appendChild(divLinea);
                for (let j = 0; j < size; j++) { // en cada div pone los botones
                    let casilla = document.createElement("button");
                    casilla.className = "botonaso";
                    document.getElementById(i).appendChild(casilla);   
                }
            }
            
        };

        
        function calcularNumMinas(x, y){

        };

        function numeroAleatorio(){

        };

        function colocarBombasTableroJS(){

        };