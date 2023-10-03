var grado = 2; //Iniciamos el grado en 2

/*Funcion: agregar()
Nos ayuda a agregar elementos a la tabla de entrada*/
function agrega() {

    grado = parseInt(grado) + 1; //Sumamos 1 al grado del polinomio actual

    /*Agregamos los elementos necesarios*/
    const namePol = document.querySelector("#name-pol"); //Llamamos al tr con los titulos
    namePol.innerHTML = namePol.innerHTML + "<th id='th-np" + grado + "'>x<sup>" + grado + "</sup></th>" //Titulo del polinomio
    const firstPol = document.querySelector("#first-pol"); //Llamamos al tr que contiene al primer polinomio
    firstPol.innerHTML = firstPol.innerHTML + "<th id='th-fp" + grado + "'><input id='ip-fp" + grado + "' class='input-pol' type='number' value='0'></th>" //Input del polinomio 1
    const secondPol = document.querySelector("#second-pol"); //Llamamos al tr que contiene el segundo polinomio
    secondPol.innerHTML = secondPol.innerHTML + "<th id='th-sp" + grado + "'><input id='ip-sp" + grado + "' class='input-pol' type='number' value='0'></th>" //Input del polinomio 2

    validacion();
}

/*Funcion: eliminar()
Nos ayuda a quitar elementos de la tabla de entrada*/
function eliminar() {
    var quita = "#th-np" + grado; //Buscamos los elementos a quitar del titulo
    const namePol = document.querySelector("#name-pol");
    var quitPol = document.querySelector(quita);
    namePol.removeChild(quitPol); //Eliminamos el elemento 

    quita = "#th-fp" + grado; //Buscamos los elementos a quitar del primer polinomio
    const fistPol = document.querySelector("#first-pol");
    quitPol = document.querySelector(quita);
    fistPol.removeChild(quitPol); //Eliminamos el elemento

    quita = "#th-sp" + grado; ////Buscamos los elementos a quitar del segundo polinomio
    const secoPol = document.querySelector("#second-pol");
    quitPol = document.querySelector(quita); //Eliminamos el elemento
    secoPol.removeChild(quitPol);
    grado = grado - 1; //Disminuimo en 1 el grado del polinomio

    validacion();
}

/*Funcion: getPoli()
Nos ayuda a obtener los datos de entrada del polinomio y guardarlos en un array.*/
function getPoli() {
    let fPol = []; //Inicializamos el array del primer polinomio
    var element = ""; //Variable auxiliar para obtener los valores 
    var idPoli;
    for (var i = 0; i <= grado; i++) //For para obtener los valores del primer polinomio
    {
        element = "ip-fp" + i; //Id del input a obtener los valores
        fPol.push(math.complex(Math.round(document.getElementById(element).value), 0)); //Se guarda el valor en el array
    }
    let sPol = []; //Inicializamos el array del segundo polinomio
    for (var i = 0; i <= grado; i++) //For para obtener los valores del segundo polinomio
    {
        element = "ip-sp" + i; //id del input a obtener el valor
        sPol.push(math.complex(Math.round(document.getElementById(element).value), 0)); //Se guarda el valor en el array
    }

    return [fPol, sPol];
}

function validacion() {
    if (grado == 0) {
        desactivarBoton('btnEliminar');

        return true;
    }

    if (grado > 0 && grado <= 2) {
        activarBoton('btnAgregar');
        activarBoton('btnEliminar');

        return false;
    }

    if (grado == 3) {
        desactivarBoton('btnAgregar');

        return false;
    }
}

function desactivarBoton(id) {
    document.getElementById(id).disabled = true;
    document.getElementById(id).classList.remove("button--enabled");
    document.getElementById(id).classList.add("button--disabled");
}

function activarBoton(id) {
    document.getElementById(id).disabled = false;
    document.getElementById(id).classList.remove("button--disabled");
    document.getElementById(id).classList.add("button--enabled");
}

async function empezarAnimacion() {

    //Se obtienen los datos
    polinomios = getPoli();
    velocidad = document.getElementById("velocidad").value;

    //Se empieza la animación
    document.getElementById("animacionDyC").style.display = 'flex';
    document.getElementById("animacionDyC").scrollIntoView({ behavior: 'smooth' });

    //Se informa del valor de n
    let elem = document.getElementById("info-mensaje");

    gAx = gradoFuncion(polinomios[0]);

    if (gAx == undefined) {
        gAx = 0;
    }

    gBx = gradoFuncion(polinomios[1]);

    if (gBx == undefined) {
        gBx = 0;
    }

    elem.innerHTML = "El grado del polinomio <strong>A(x)</strong> = " + poliHtml(polinomios[0], gAx) + " es <strong>" + gAx + "</strong>, del polinomio <strong>B(x)</strong> = " + poliHtml(polinomios[1], gBx) + " es <strong>" + gBx + "</strong>, y de su multiplicación es <strong>" + (gAx + gBx) + "</strong>, por lo que se necesitan <strong>n &#8805 " + (gAx + gBx) + "+1 puntos mínimos para evaluar las funciones</strong>. Como <strong>n es una potencia de 2</strong>, el valor de <strong>n es " + puntosMinimos(gAx + gBx) + "</strong>";

    cy.elements().remove();
}

async function continuarAnimacion() {

    document.getElementById("btnContinuar").disabled = true;
    document.getElementById("btnContinuar").classList.remove("continuar");
    document.getElementById("btnContinuar").classList.add("continuar-disabled");

    //Se obtienen los datos
    polinomios = getPoli();
    velocidad = document.getElementById("velocidad").value;
    document.getElementById("animPanel").scrollIntoView({ behavior: 'smooth' });

    //Desactivando los botones
    desactivarBoton('btnAgregar');
    desactivarBoton('btnEliminar');
    desactivarBoton('btnVer');

    //Animación
    a = polinomios[0];
    b = polinomios[1];

    gAx = gradoFuncion(a);

    if (gAx == undefined) {
        gAx = 0;
    }

    gBx = gradoFuncion(b);

    if (gBx == undefined) {
        gBx = 0;
    }

    ax = poliHtml(a, gAx);
    bx = poliHtml(b, gBx);

    document.getElementById('fft').style.display = 'none';
    document.getElementById('multiplicacion').style.display = 'none';
    document.getElementById('ifft').style.display = 'none';
    document.getElementById('normalizar').style.display = 'none';

    c = await animacionFft(a, b, velocidad);

    //Activar los botones
    activarBoton('btnAgregar');
    activarBoton('btnEliminar');
    activarBoton('btnVer');

    gCx = gradoFuncion(c);

    if (gCx == undefined) {
        gCx = 0;
    }

    cx = poliHtml(c, gCx);

    let elem = document.getElementById("info-mensaje");
    elem.innerHTML = "Por lo tanto, el resultado de <strong>C(x)</strong> = <strong>A(x)</strong><strong>B(x)</strong> es " + cx + " = (" + ax + ")(" + bx + ")";

    document.getElementById("animacionDyC").scrollIntoView({ behavior: 'smooth' });

    document.getElementById("btnContinuar").disabled = false;
    document.getElementById("btnContinuar").classList.remove("continuar-disabled");
    document.getElementById("btnContinuar").classList.add("continuar");
}

function actualizar() {
    location.reload(true);
}

function poliHtml(p, g) {
    html = "<strong>";
    primero = true;

    if (g == 0 && p[0].re == 0) {
        return html += p[0].re + "</strong>";
    }

    if (p[0].re != 0) {
        html += p[0].re;
        primero = false;
    }

    for (let i = 0; i < g; i++) {
        if (p[i + 1] > 0 && !primero) {
            html += "+";
        }
        else if (p[i + 1] > 0 && primero) {
            primero = false;
        }
        else if (p[i + 1] == 0) {
            continue;
        }

        html += p[i + 1] + "x";

        if (i + 1 > 1) {
            html += "<sup>" + (i + 1) + "</sup>";
        }
    }

    html += "</strong>";

    return html;
}

cy.userZoomingEnabled(false);

window.addEventListener('load', function () {
    document.getElementById("animacionDyC").style.display = 'none';
});
