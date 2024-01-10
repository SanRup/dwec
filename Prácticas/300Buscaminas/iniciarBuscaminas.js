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
            
            console.log(divDif.childElementCount);
            
                for (let i = 0; i < divDif.childElementCount; i++) {
                    let boton = divDif.children[i];
                    boton.addEventListener("click", dibujarTableroHTML);
                }
                
        }

        function saludo(e) {
            
            let evento = e.target;
            alert("hola" + evento.textContent);
            console.log(evento.textContent);
            console.log(evento.id);

        }

        function dibujarTableroHTML(e) {
            let dif = e.target.id;
            console.log(dif);
            generarTableroJS(OPCIONES.dificultad[dif]);
        }
        
        function generarTableroJS(ancho){
            console.log(ancho);
        };

        function calcularNumMinas(x, y){

        };

        function numeroAleatorio(){

        };

        function colocarBombasTableroJS(){

        };