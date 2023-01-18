//Inicialización de variales
let uncoveredCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements =  0;
let hits = 0;
let timer = false;
let time = 30;
let regressiveTime = null;

//Apuntando a documento HTML
let showMoves = document.getElementById('movements');
let showHits = document.getElementById('hits');
let showTime = document.getElementById('tempo');

//generación de números aeatorios
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
//necesitamos deshoredenar el arreglo, por eso utilizamos el metodo .sort, que permite ordenar el arreglo deacuerdo al resultado de una función. Y luego el Math.random, que genera números aleatorios
numbers = numbers.sort(() =>{return Math.random()- 0.5});

//funciones
function countTime(){
    regressiveTime = setInterval(()=>{
        time--;
        showTime.innerHTML = `Tiempo: ${time} segundos`;
        if(timer == 0){
            clearInterval(regressiveTime);
            
        }
    },1000);
}

//declaramos la función principal, dentro le declaramos el parametro id de cada botón
function mostrar(id){
    if(timer == false){
        countTime();
        timer = true;
    }
    uncoveredCards++;

    if(uncoveredCards == 1){
        //Mostrar el primer número de el par de cartas
        //esta tarjeta 1 será igual al documento html y que dentro del documento seleccione el id
        //aquí ya tendremos guardado ese elemento id dentro de la card1
        card1 = document.getElementById(id);
        //lo que hacemos es que lo que imprimamos sea el valor del arreglo desordenado
        //y lo que logramos es asociar los 16 botones con los 16 elementos del arreglo desordenado
        //creamos la variable para luego poder compararla con la segunda carta
        firstResult = numbers[id];
        card1.innerHTML = firstResult;

        //deshabilitar el primer botón
        card1.disabled = true;
    }else if(uncoveredCards == 2){
        //Mostrar segundo número
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = secondResult;

        //Deshabilitar segundo botón
        card2.disabled = true;

        //Incrementar movimientos
        //lo ponemos al destacar la segunda tarjeta porque los movimientos se cuentan cada vez que destapamos dos tarjetas
        movements++;
        showMoves.innerHTML = `Movimientos: ${movements}`;
        if(firstResult == secondResult){
            //Encerar contador tarjetas destapadas
            uncoveredCards = 0;
            //aumentar aciertos
            hits++;
            showHits.innerHTML = `Acierto: ${hits}`;

            if(hits == 8){
                showHits.innerHTML = `Hits: ${hits} 🔥`
                showMoves.innerHTML = `Movimientos: ${movements} 🔥`
            }
        }else{
            //mostrar momentaneamente valores y volver a tapar
            setTimeout(()=>{
                card1.innerHTML = ` `;
                card2.innerHTML = ` `;
                card1.disabled = false;
                card2.disabled = false;
                uncoveredCards = 0;
            }, 2000);
        }
    }
}