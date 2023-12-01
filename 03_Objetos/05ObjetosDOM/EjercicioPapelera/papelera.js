//con ElementById
// document.getElementById("trash").addEventListener
//             (
//                 "click",
//                 function () {
//                     this.style.backgroundImage = "url()";
//                     alert("Papelera vaciada");
//                 }, 
//                 false
//             );

//con querySelector que actua sobre el css
document.querySelector("#trash").addEventListener
            (
                "click",
                function () {
                    this.style.backgroundImage = "url('Recycle-Bin.png')"; // tambien se puede utilizar = "none"
                    setTimeout(()=>alert("Papelera vaciada"),15);
                }, 
                false
            );

//anular el boton derecho
document.body.addEventListener
            (
                "contextmenu",
                function () {
                    
                },
                false
            );            