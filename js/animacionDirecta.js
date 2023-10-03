var gradoPol=4; //Iniciamos el grado en 2

    /*Funcion: agregar()
    Verifica que el grado sea menor a 7 antes de agregar elementos en la tabla*/
    function agrega(){
        if(gradoPol<7){
            agregaGrado();
        }
    }

    /*Funcion: agregar()
    Verifica que el grado sea mayor a 4 antes de eliminar elementos de la tabla*/
    function eliminar(){
        if(gradoPol>4){
            eliminarGrado();
        }
    }

    /*Funcion: agregarGrado()
    Nos ayuda a agregar elementos a la tabla de entrada*/
    function agregaGrado(){
        gradoPol = parseInt(gradoPol) + 1; //Sumamos 1 al grado del polinomio actual

        /*Agregamos los elementos necesarios*/
        const namePol = document.querySelector("#name-pol"); //Llamamos al tr con los titulos
        namePol.innerHTML = namePol.innerHTML + "<th id='th-np"+gradoPol+"'>x<sup>"+ gradoPol +"</sup></th>" //Titulo del polinomio
        const firstPol = document.querySelector("#first-pol"); //Llamamos al tr que contiene al primer polinomio
        firstPol.innerHTML = firstPol.innerHTML + "<th id='th-fp"+gradoPol+"'><input id='ip-fp"+ gradoPol +"' class='input-pol' type='number' placeholder='0'></th>" //Input del polinomio 1
        const secondPol = document.querySelector("#second-pol"); //Llamamos al tr que contiene el segundo polinomio
        secondPol.innerHTML = secondPol.innerHTML + "<th id='th-sp"+gradoPol+"'><input id='ip-sp"+ gradoPol +"' class='input-pol' type='number' placeholder='0'></th>" //Input del polinomio 2
    }   

    /*Funcion: eliminarGrado()
    Nos ayuda a quitar elementos de la tabla de entrada*/
    function eliminarGrado(){
        var quita = "#th-np"+gradoPol; //Buscamos los elementos a quitar del titulo
        const namePol = document.querySelector("#name-pol");
        var quitPol = document.querySelector(quita); 
        namePol.removeChild(quitPol); //Eliminamos el elemento 

        quita = "#th-fp"+gradoPol; //Buscamos los elementos a quitar del primer polinomio
        const fistPol = document.querySelector("#first-pol"); 
        quitPol = document.querySelector(quita);
        fistPol.removeChild(quitPol); //Eliminamos el elemento
        
        quita = "#th-sp"+gradoPol; //Buscamos los elementos a quitar del segundo polinomio
        const secoPol = document.querySelector("#second-pol"); 
        quitPol = document.querySelector(quita); //Eliminamos el elemento
        secoPol.removeChild(quitPol);
        gradoPol = gradoPol - 1; //Disminuimo en 1 el grado del polinomio
    }

    /*Funcion: getPoli()
    Nos ayuda a obtener los datos de entrada del polinomio y guardarlos en un array.*/
    function getPoli(){
        
        let fPol=[]; //Inicializamos el array del primer polinomio
        var element = ""; //Variable auxiliar para obtener los valores 
        var idPoli;
        for(var i=0; i<= gradoPol; i++) //For para obtener los valores del primer polinomio
        {
            element = "ip-fp"+ i; //Id del input a obtener los valores
            fPol.push((document.getElementById(element).value == "")? 0:document.getElementById(element).value);
            //Se guarda el valor en el array
        }
        let sPol=[]; //Inicializamos el array del segundo polinomio
        for(var i=0; i<= gradoPol; i++) //For para obtener los valores del segundo polinomio
        {
            element = "ip-sp"+ i; //id del input a obtener el valor
            sPol.push((document.getElementById(element).value == "")? 0:document.getElementById(element).value);
            //Se guarda el valor en el array
        }

        for(var i=0; i<=2;i++){ //For para inhabilitar los botones
            element = document.querySelector("#button"+i);
            element.disabled = true; //Inhabilita botón
            element.style.textDecoration = 'line-through'; //Raya botón
        }

        for(var i=0; i<=gradoPol;i++){ //For para inhabilitar inputs del primer polinomio
        	element = "ip-fp"+ i; //Obtiene ID de input
        	document.getElementById(element).disabled = true; //Inhabilita input
        }

        for(var i=0; i<=gradoPol;i++){ //For para inhabilitar inputs del segundo polinomio
        	element = "ip-sp"+ i; //Obtiene ID de input
        	document.getElementById(element).disabled = true; //Inhabilita input
        }

        crearTabla(fPol,sPol,gradoPol); //Llamamos para crear la tabla y dar inicio a la animación. 
    }

    /*Funcion: crearTabla(fPol, sPol)
    Nos ayuda a crear las tablas de polinomios necesarias para la animación, imprime los polinomios ingresados en sus respectivas tablas asi 
    como la tabla donde se iran mostrando el resultado de la multiplicación.
    Parametros: dos arrays y unentero*/
    function crearTabla(fPol,sPol,grado)
    {
        const tablePol1 = document.querySelector("#anima-pol1"); //Llamamos a la tabla del polinomio 1
        tablePol1.innerHTML = ""; //Limpiamos la tabla por si tiene información
        var aux=""; //Variable auxiliar para imprimir el polinomio en la tabla
        var aux2=""; //Variable auxiliar para imprimir el titulo del polinomio

        for(var i=0; i<=grado; i++) //Ciclo for para generar la tabla del primer polinomio
        {
            aux2 = aux2 + "<td style='background-color: #001B48; color: #FFFF;'> x<sup>"+ i +"</td>";
            aux= aux + "<td id='f"+i+"'>"+fPol[i]+"</td>"; 
        }
         //Agregamos a la tabla la información
        tablePol1.innerHTML = tablePol1.innerHTML +"<tr>"+ aux2 +"</tr>";
        tablePol1.innerHTML = tablePol1.innerHTML +"<tr>"+ aux +"</tr>";
        
        const tablePol2 = document.querySelector("#anima-pol2"); 
        tablePol2.innerHTML = "";
        aux="";
        aux2="";
        for(var i=0; i<=grado; i++)
        {
            aux2 = aux2 + "<td style='background-color: #001B48; color: #FFFF;'> x<sup>"+ i +"</td>";
            aux= aux + "<td id='s"+i+"'>"+sPol[i]+"</td>"; 
        }
        tablePol2.innerHTML = tablePol2.innerHTML +"<tr>"+ aux2 +"</tr>";
        tablePol2.innerHTML = tablePol2.innerHTML +"<tr>"+ aux +"</tr>";

        const tablePolres = document.querySelector("#anima-polres"); 
        tablePolres.innerHTML = "";
        aux="";
        aux2="";
        for(var i=0; i<=grado+grado; i++)
        {
            aux2 = aux2 + "<td style='background-color: #001B48; color: #FFFF;'> x<sup>"+ i +"</td>";
            aux= aux + "<td id='r"+i+"'>"+" &nbsp;"+"</td>"; 
        }
        tablePolres.innerHTML = tablePolres.innerHTML +"<tr>"+ aux2 +"</tr>";
        tablePolres.innerHTML = tablePolres.innerHTML +"<tr>"+ aux +"</tr>";
        const info = document.querySelector("#info"); //Llamamos al parrafo donde imprimiremos los pasos.
        info.innerHTML = "¡Iniciamos!";
        multiplicar(fPol,sPol,grado); //Mandamos a llamar la función multiplicar
    }

    /*Funcion: multiplicar(fPol, sPol,grado)
    Esta es la función que anima la resolución del problema. Es async para poder esperar el tiempo necesario para que se pueda observa 
    la animación.
    Parametros: dos arrays y un entero*/
    async function multiplicar(fPol,sPol,grado){
        let multPol=[]; //array donde se guardara la multiplicación
        const info = document.querySelector("#info"); //Llamamos al parrafo donde imprimiremos los pasos.
        var element = "";
        for(var i=0; i<=grado+grado; i++){ //for par crear el array desde 0 hasta grado + grado para obtener el maximo grado
            multPol.push(0); //Inicializamos el array en 0
        }


        for(var i=0; i<=grado; i++)
        {

            await delay(1); //Esperamos un segundo
            /*Seleccionamos el elemento del polinomio 1 que multiplicara a los demas elementos del polinomio 2
            y cambiamos su color de background*/
            var td1 = document.querySelector("#f"+i); 
            td1.style.background = '#018ABE';

            for(var j=0; j<=grado; j++)
            {
                /*Seleccionamos el elemento del polinomio 2 que se multiplicara con el elemento del polinomio 1 
                y el elemento donde se guardara la multiplicación de los polinomios
                y cambiamos su color de background*/
                var td2 = document.querySelector("#s"+j);
                td2.style.background = '#97CADB';
                var tdRes = document.querySelector("#r"+(i+j)); 
                tdRes.style.background = '#02457A';
                
                /*Aqui imprimimos la información*/
                info.innerHTML = "Grado a modificar: " + (i+j) + " &nbsp; &nbsp; SUMA: " + multPol[i+j] + "+" + fPol[i]*sPol[j] +
                "&nbsp; = " + (multPol[i+j] + fPol[i]*sPol[j]);

                await delay(1);//Esperamos un segundo
                multPol[i+j] += fPol[i]*sPol[j]; //Realizamos la multiplicación
                tdRes.innerHTML = multPol[i+j];  //Lo imprimimos en su casilla correspondiente
                await delay(2); //Esperamos medio segundo

                /*Regresamos la casilla a su color original*/
                tdRes.style.background = 'white';
                td2.style.background = 'white';
            }
            td1.style.background = 'white';       
        }
        console.log(multPol);
        info.innerHTML = "HEMOS TERMINADO UwU";

        /*Habilita botones e inputs*/
        await imprimeResult(multPol,grado);
        /*Habilita botones e inputs*/
        await habilitar();
    }

    /*Función: imprimeResult(multPol,grado)
    Esta función muestra el resultado de la multiplicación
    Parametros: una arreglo y un entero*/
    function imprimeResult(multPol,grado){
        const result = document.querySelector("#result"); 
        var resultado= "El resultado es: ";
        for(var i=0;i<=grado*2;i++){
            resultado = resultado + "<span>"+ multPol[i] +"x<sup>"+i+"</sup>" +"</span>";
            if(i<grado*2 && multPol[i+1]>=0){
                resultado=resultado+"+";
            }
        }
        result.innerHTML = resultado;
    }

    /*Función: habilitar()
    Esta función habilita los botones e inputs después de terminar una animación*/
    function habilitar(){
        var element="";
        for(var i=0; i<=2;i++){ //For para habilitar botones
            element = document.querySelector("#button"+i);
            element.disabled = false; //Habilita botón
            element.style.textDecoration = 'none'; //Quita raya de botón
        }

        for(var i=0; i<=gradoPol;i++){ //For para habilitar inputs de primer polinomio
            element = "ip-fp"+ i;
            document.getElementById(element).disabled = false; //Habilita input
        }

        for(var i=0; i<=gradoPol;i++){ //For para habilitar inputs de segundo polinomio
            element = "ip-sp"+ i;
            document.getElementById(element).disabled = false; //Habilita input
        }
    }

    /*Función: delay(n)
    Esta función es auxiliar para esperar n segundo antes de hacer la siguiente acción
    Parametros: n cantidad de segundos*/
    function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
    }

    //Recarga el contenido para una nueva animación
    function nuevaAnim(){
	   document.location.reload();
    }
