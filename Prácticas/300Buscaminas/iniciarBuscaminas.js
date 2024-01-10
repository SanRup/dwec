        window.addEventListener("load", inicio);

        function inicio() {
            let divDif = document.getElementById("dificultad");
            let boton = divDif.firstChild;
                for (let i = 0; i < divDif.children.length; i++) {
                    boton.addEventListener("click", saludo);
                    boton = boton.nextElementSibling; 
                }
        }

        function saludo(e) {
            
            let evento = e.target;
            alert("hola" + evento.textContent);
            console.log(evento.textContent);
        }

        function dibujarTableroHTML() {
            
        }
        
        function generarTableroJS(){
            let 
        };

        function calcularNumMinas(x, y){

        };

        function numeroAleatorio(){

        };

        function colocarBombasTableroJS(){

        };