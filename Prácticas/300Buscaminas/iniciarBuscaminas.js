        //-----------------OBJETOS Y VARIABLES GLOBALES-----------------
        var OPCIONES = {
            dificultad: {
                facil: 9,
                medio: 15,
                dificil: 19
            }
            
        };

        var POSICION = [];

        let dif;

        let numGanar;

        let numBanderas;
        //----------------------------------------------------------------

        //------------------------CARGA DE EVENTOS------------------------
        window.addEventListener("load", inicio);

        function inicio() {
            
            let divDif = document.getElementById("dificultad");
                // le añaden listeners a todos los botones de dificultad (esto se podría hacer con delegación de eventos también)        
                for (let i = 0; i < divDif.childElementCount; i++) {
                    let boton = divDif.children[i];
                    boton.addEventListener("click", dibujarTableroHTML);
                }

            //TEST
            //document.getElementById("board").addEventListener("click", prueba);
            
    
        }
        //----------------------------------------------------------------

        //------------------------FUNCIONES TEST------------------------
        function prueba(e) {
            //console.log(numGanar);
            //console.log(e.target.id);
            // let x = e.target.id.split("-")[0];
            // let y = e.target.id.split("-")[1];
            // //console.log(x);
            // //con esto encuentro el objeto que quiero
            // console.log(POSICION.find(element => element.x == x && element.y == y));
            //console.log(); 
        }
        //----------------------------------------------------------------

        //-----------------FUNCIONES PARA GENERAR EL TABLERO-----------------

        //dibuja el tablero
        function dibujarTableroHTML(e) {
            dif = e.target.id; //coge el id del boton pulsado en el evento
             //genera el tablero con la dificultad que genera el evento(dif) llamada desde el objeto OPCIONES
            if (generarTableroJS(OPCIONES.dificultad[dif]) != false) {
                calcularNumMinas(OPCIONES.dificultad[dif]); //calcula las minas con el número de casillas de (dif)
            }
            
            document.getElementById("board").addEventListener("click", gamePlay);  
            document.getElementById("board").addEventListener("contextmenu", gamePlay);             
        }

        // let resultado = Swal.fire({
        //     title: "Quieres borrar el tablero?",
        //     text: "Se empezará una nueva partida.",
        //     icon: "info",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3085d6",
        //     cancelButtonColor: "#d33",
        //     confirmButtonText: "Sí! Empezar de nuevo!",
        //     cancelButtonText: "No! No borres nada!",
        // })
        //      //si es true, borra el tablero
        //         if (resultado.isConfirmed) {
        //             Swal.fire({
        //                 title: "Borrado!",
        //                 html: "Colocando minas...",
        //                 timer: 1500,
        //                 timerProgressBar: true,
        //                 didOpen: () => {
        //                 Swal.showLoading();
        //                 }
        //             })


        //generar el tablero con el tamaño elegido
        function generarTableroJS(size){
            let tablero = document.getElementById("board");
            if (tablero.children.length != 0) { //si en el tablero hay algo, lo borra
                if (confirm("quieres empezar de nuevo?")) {
                    while (tablero.firstChild){ 
                        tablero.removeChild(tablero.firstChild);
                    };
                    POSICION = []; //borra el array POSICION
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
            numBanderas = parseInt(numMinas) + 1;//igualamos los números para saber cuantas banderas quedan por poner +1 para que no sea 0
            document.getElementById("banderas").innerHTML = numBanderas;//imprime el número de banderas en el html
            numGanar = (POSICION.length - 1) - numMinas;
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
                let posicionElegida = encuentra(x, y);
                //console.log(posicionElegida);
                //si NO hay bomba, la coloca, suma 1 y vuelve a llamar a la función
                if (posicionElegida.bomba == false) {
                    posicionElegida.bomba = true;
                    //agregaClase(x, y, "bomba"); //TEST para ver las bombas

                    //actualizar contador de las casillas adyacentes
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            let casillaAdyacente = encuentra(posicionElegida.x - 1 + i, posicionElegida.y - 1 + j); //recorre los 8 adyacentes
                            if (casillaAdyacente != undefined && casillaAdyacente.bomba == false) {
                                    casillaAdyacente.cont++;
                                    //document.getElementById(casillaAdyacente.x + "-" + casillaAdyacente.y).textContent = casillaAdyacente.cont;
                            }else if (casillaAdyacente != undefined && casillaAdyacente.bomba == true) {
                                document.getElementById(casillaAdyacente.x + "-" + casillaAdyacente.y).textContent = "";
                            }
                        }
                    }

                    cont++;
                    colocarBombasTableroJS(numMinas, cont);
                //si hay bomba, vuelve a llamar a la función    
                } else {
                    colocarBombasTableroJS(numMinas, cont);
                }
            }
           
        };

        function encuentra(x, y) {
            return POSICION.find(element => element.x == x && element.y == y);
        }

        function agregaClase(x, y, clase) {
            document.getElementById(x + "-" + y).classList.add(clase);
        }

        //-------------------------------------------------------------------



        //---------------------------GAMEPLAY--------------------------------

        function gamePlay(e) {
            let x = e.target.id.split("-")[0];
            let y = e.target.id.split("-")[1];
            //con esto encuentro el objeto que quiero
            let botonPulsado = POSICION.find(element => element.x == x && element.y == y)
            
            if (e.type == "click") {
                //si no tiene bandera, se abre
                if (botonPulsado.bandera == false) {
                    abrirCasilla(botonPulsado);
                }
                
            }else if (e.type == "contextmenu") {
                e.preventDefault(); //para que no salga el context menu
                //si el boton no esta abierto, se puede poner bandera
                if (botonPulsado.abierto == false) {
                    ponerBandera(botonPulsado);
                    e.target.classList.toggle("bandera"); //si tiene la clase bandera, la quita. Si no la tiene, la pone.
                }  
            }
        }

        //pone o quita las banderas y maneja el contador
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
            //has perdido
            if (botonPulsado.bomba == true) {
                document.getElementById("board").removeEventListener("click", gamePlay);
                document.getElementById("board").removeEventListener("contexmenu", gamePlay);
                
                POSICION.forEach(element => {
                    if (element.bomba == true) {
                        agregaClase(element.x, element.y, "bomba");
                        
                    }
                });
                
                Swal.fire({
                    title: "Oooooh!",
                    text: "Intentalo de nuevo.",
                    imageUrl: "https://media.istockphoto.com/id/1272570902/vector/pixel-art-design-with-outdoor-landscape-background.jpg?s=170667a&w=0&k=20&c=DpgX1rIaMUJC8O7T1hNsY0fY_g9aUdcxvvJkrNbFrPA=",
                    imageWidth: 525,
                    imageHeight: 328,
                    imageAlt: "Custom image"
                    });
                

            }else if (botonPulsado.abierto == false && botonPulsado.bandera == false) {
                if (botonPulsado.cont > 0) {
                    numGanar--;
                    botonPulsado.abierto = true;
                    agregaClase(botonPulsado.x, botonPulsado.y, "abierto");
                    document.getElementById(botonPulsado.x + "-" + botonPulsado.y).textContent = botonPulsado.cont;
                }else{
                    descubrirCasilla(botonPulsado);
                }
                if (numGanar == 0) {
                    document.getElementById("board").removeEventListener("click", gamePlay);
                    document.getElementById("board").removeEventListener("contexmenu", gamePlay);
                    Swal.fire({
                        title: "Yuhuuuuu!",
                        text: "Otra vez?",
                        imageUrl: "https://static.vecteezy.com/system/resources/previews/011/234/047/original/you-win-video-game-vector.jpg",
                        imageWidth: 525,
                        imageHeight: 328,
                        imageAlt: "Custom image"
                      });
                    
                }
                
            }
            
        }

            // _____________  ___________________   1 vuelta x-1 y-1
            // |1-1|1-2|1-3|  |-1/-1|-1/ 0|-1/+1|   2 vuelta x-1 y 0
            // -------------  -------------------   3 vuelta x-1 y+1
            // |2-1|2-2|2-3|  | 0/-1|  x  | 0/+1|   4 vuelta x 0 y-1
            // -------------  -------------------   5 vuelta x 0 y+1
            // |3-1|3-2|3-3|  |+1/-1|+1/ 0|+1/+1|   6 vuelta x+1 y-1
            // -------------  -------------------   7 vuelta x+1 y 0
            //                                      8 vuelta x+1 y+1
         
        function descubrirCasilla(casillaPulsada) {
            //console.log(casillaPulsada);
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        let casillaAdyacente = encuentra(casillaPulsada.x - 1 + i, casillaPulsada.y - 1 + j); //recorre los 8 adyacentes
                        if (casillaAdyacente != undefined && casillaAdyacente.abierto == false && casillaAdyacente.bandera == false) {
                            if (casillaAdyacente.cont > 0 ) {
                                // console.log("cont > 0");
                                numGanar--;
                                casillaAdyacente.abierto = true;
                                agregaClase(casillaAdyacente.x, casillaAdyacente.y, "abierto");
                                document.getElementById(casillaAdyacente.x + "-" + casillaAdyacente.y).textContent = casillaAdyacente.cont;
                                
                            } else if (casillaAdyacente.cont == 0) {
                                // console.log("cont = 0");
                                numGanar--;
                                casillaAdyacente.abierto = true;
                                agregaClase(casillaAdyacente.x, casillaAdyacente.y, "abierto");
                                descubrirCasilla(casillaAdyacente);
                            }
                            
                        }        
                    }
                }    
        }
        
        //-------------------------------------------------------------------