        var OPCIONES = {
            dificultad: {
                facil: 9,
                medio: 15,
                dificil: 19
            }
            
        };

        var POSICION = [];

        let dif;

        let numBanderas;
        
        window.addEventListener("load", inicio);

        function inicio() {
            
            let divDif = document.getElementById("dificultad");
                // le añaden listeners a todos los botones de dificultad (esto se podría hacer con delegación de eventos también)        
                for (let i = 0; i < divDif.childElementCount; i++) {
                    let boton = divDif.children[i];
                    boton.addEventListener("click", dibujarTableroHTML);
                }

            document.getElementById("board").addEventListener("click", gamePlay);  
            document.getElementById("board").addEventListener("contextmenu", gamePlay);  
             
    
        }

        function prueba(e) {
            console.log(e.target.id);
            let x = e.target.id.split("-")[0];
            let y = e.target.id.split("-")[1];
            console.log(x);
            //con esto encuentro el objeto que quiero
            console.log(POSICION.find(element => element.x == x && element.y == y));
             
        }

        //-----------------FUNCIONES PARA GENERAR EL TABLERO-----------------

        //dibuja el tablero
        function dibujarTableroHTML(e) {
            dif = e.target.id; //coge el id del boton pulsado en el evento
            generarTableroJS(OPCIONES.dificultad[dif]); //genera el tablero con la dificultad que genera el evento(dif) llamada desde el objeto OPCIONES

            calcularNumMinas(OPCIONES.dificultad[dif]); //calcula las minas con el número de casillas de (dif)
            
        }
        
        //generar el tablero con el tamaño elegido
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
                divLinea.setAttribute("id", i);
                divLinea.className = "contenedorBtn";
                tablero.appendChild(divLinea);
                for (let j = 0; j < size; j++) { // en cada div pone los botones
                    let casilla = document.createElement("button");
                    casilla.setAttribute("class", "botones");
                    casilla.setAttribute("id", i + "-" + j);

                    //inserta en el array POSICION el objeto con las propiedades de cada casilla
                    POSICION.push(
                        {
                            x: i,
                            y: j,
                            abierto: false,
                            bomba: false,
                            bandera: false,
                            cont: 0
                        }
                    );

                    document.getElementById(i).appendChild(casilla);   
                }
            }
            
        };
        
        //calcula con el número de casillas, el número de minas que va a tener el tablero
        function calcularNumMinas(numCasillas){
            let numMinas = ((13/100)*(numCasillas*numCasillas)).toFixed(0);
            numBanderas = numMinas;//igualamos los números para saber cuantas banderas quedan por poner
            document.getElementById("banderas").innerHTML = numBanderas;//imprime el número de banderas en el html
            console.log(numMinas);
            colocarBombasTableroJS(numMinas)
        };

        //genera un número aleatorio entre 0 y el número de casillas del tablero
        function numeroAleatorio(numCasillas){
            return Math.floor(Math.random() * numCasillas);
        };

        //coloca bomba en la posición de los dos números aleatorios dados
        function colocarBombasTableroJS(numMinas, cont = 0){
            if (cont <= numMinas) {
                let x = numeroAleatorio(OPCIONES.dificultad[dif]);
                let y = numeroAleatorio(OPCIONES.dificultad[dif]);
                let posicionElegida = POSICION.find(element => element.x == x && element.y == y);
                console.log(posicionElegida);
                //si NO hay bomba, la coloca, suma 1 y vuelve a llamar a la función
                if (posicionElegida.bomba == false) {
                    posicionElegida.bomba = true;
                    cont++;
                    colocarBombasTableroJS(numMinas, cont);
                //si hay bomba, vuelve a llamar a la función    
                } else {
                    colocarBombasTableroJS(numMinas, cont);
                }
            }
           
        };

        //-------------------------------------------------------------------



        //---------------------------GAMEPLAY--------------------------------

        function gamePlay(e) {
            let x = e.target.id.split("-")[0];
            let y = e.target.id.split("-")[1];
            //con esto encuentro el objeto que quiero
            let botonPulsado = POSICION.find(element => element.x == x && element.y == y)
            
            if (e.type == "click") {
                abrirCasilla(botonPulsado);
                e.target.setAttribute("class", "abierto");
            }else if (e.type == "contextmenu") {
                e.preventDefault(); //para que no salga el context menu
                //si el boton no esta abierto, se puede poner bandera
                if (botonPulsado.abierto == false) {
                    ponerBandera(botonPulsado);
                    e.target.classList.toggle("bandera"); //si tiene la clase bandera, la quita. Si no la tiene, la pone.
                }
                
            }


        }

        //revisar el contador de banderas que va regulinchi
        function ponerBandera(botonPulsado) {
            if (botonPulsado.bandera == false) {
                botonPulsado.bandera = true;
                numBanderas--;
                document.getElementById("banderas").innerHTML = numBanderas;//imprime el número de banderas en el html
            }else{
                botonPulsado.bandera = false;
                numBanderas++;
                document.getElementById("banderas").innerHTML = numBanderas;//imprime el número de banderas en el html
            }
            
        }

        function abrirCasilla(botonPulsado) {
            botonPulsado.abierto = true;
        }

        //-------------------------------------------------------------------