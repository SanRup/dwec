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

        function dibujarTableroHTML(e) {
            let dif = e.target.id; //coge el id del boton pulsado en el evento
            generarTableroJS(OPCIONES.dificultad[dif]); //genera el tablero con la dificultad que genera el evento(dif) llamada desde el objeto dificultad
        }
        
        function generarTableroJS(size){
            for (let i = 0; i < size; i++) {
                let casilla = document.createElement("button");
                casilla.className = "botonaso";
                document.getElementById("board").appendChild(casilla);
            }
        };

        function calcularNumMinas(x, y){

        };

        function numeroAleatorio(){

        };

        function colocarBombasTableroJS(){

        };