/*
    Todas las cajas que aparecen en la animación tienen un identificador mediante el cual pueden ser
    manipuladas. 

    El identificador que se decidió ponerle es: padre-n, donde n es una variable que va cambiando de acuerdo al
    número de nodos (cajas que contienen a los arreglos) que se tienen en el árbol.

    Las fórmulas para calcular la n de los nodos son:
        - Para el hijo a la izquierda: (altura + 1) * padre + 1
        - Para el hijo a la derecha: (altura + 1) * padre + 2

    El primer padre empieza con n = 0.

    De igual manera, cada caja que representa los elementos de un arreglo también tiene un identificador.
    Por ejemplo, para los elementos del arreglo en el primer nodo o padre sería:

        - Para el primer elemento del arreglo: padre-0-0
        - Para el segundo elemento del arreglo: padre-0-1
        - Para el tercer elemento del arreglo: padre-0-2

    Y así en adelante.

    La variable cy se inicializa hasta abajo, representa el canvas y su configuración.

    Para crear un nodo que contendrá los elementos de un arreglo, se tiene la siguiente línea
    de código:
        - cy.add([
            { group: "nodes", data: { id: id } }
        ]);

    Luego para crear las cajas que representaran los elemento del arreglo, se tiene la siguiente 
    línea de código:
    
            - cy.add([
                {
                    group: "nodes", data: {
                        id: idContenedor + '-' + i, parent: idContenedor
                    },
                    position: {
                        x: 0, y: 0
                    }
                }
            ]);
    
    Nótese que idContenedor es el nodo que contendrá los elementos del arreglo, y eso se especifica
    con parent. De esta manera, se asegura que dentro de ese nodo, estén los elementos.

    Para cambiar el color y contenido de un elemento del arreglo mientras se recorre un arreglo, 
    se pueden utilizar las siguientes líneas de código, respectivamente:

        -cy.nodes('[id="' + idNodo + '-' + i + '"]').style('background-color', '#FFFFFF');
        -cy.nodes('[id="' + idNodo + '-' + i + '"]').style('content', 'Cadena con el contenido'); 

    Lo que hace el efecto de la animación es la espera asíncrona provista por JS. Para utilizar
    esta espera hay que tener en cuenta lo siguiente:

        - Toda función que ha de utilizar la espera asíncrona debe ser declarada con la palabra
        async antepuesta, por ejemplo: async function fft(){}

        - La función que provee el tiempo de espera es sleep(milisegundos) que recibe como
        parametro la cantidad de tiempo en milisegundos que va a esperar

        - Siempre que se llama a una función que tiene tiempo de espera asíncrono se debe anteponer
        la clausula await, por ejemplo: await sleep(1000), así se asegura la espera de dicha función

        - Cualquier función que dentro de sí misma tenga una sentencia await sleep(1000) puede usar 
        la clausula await también. Por ejemplo, en la recursión: await fft(pp)

*/

'use strict';

/*
    Tamaño de cada elemento de los arreglos
*/

const cajaLargo = 50;
const letraTam = 8;

/*
    Velocidad de animación
*/

const mutiplicador = 1;
let tiempo = 1000 * mutiplicador;

/*
    Colores
*/

const colorGris = '#bcbcbc';
const colorVerde = '#38b738';
const colorRojo = '#fd3e3e';
const colorNaranja = '#fd783e';
const colorMorado = '#dc40fd';
const colorNegro = '#000000';
const colorAzul = '#0084ff';

/*
    Variables que contienen pseudocodigo sobre la animacion
*/

/* funcionesPseudocodigo */
let funcionesPseudocodigo = [
    document.getElementById('fft'),
    document.getElementById('multiplicacion'),
    document.getElementById('ifft'),
    document.getElementById('normalizar')
];

let fftPseudocodigo = document.getElementById('fft');
let multiplicacionPseudocodigo = document.getElementById('multiplicacion');
let ifftPseudocodigo = document.getElementById('ifft');

/* FFT */
let fftObjetos = [
    document.getElementById('def-fft'),
    document.getElementById('if-n=1'),
    document.getElementById('pe'),
    document.getElementById('po'),
    document.getElementById('ye'),
    document.getElementById('yo'),
    document.getElementById('calcy'),
    document.getElementById('returny')
];

/* multiplicacion */
let multuplicacionObjetos = [
    document.getElementById('def-mult'),
    document.getElementById('calc-res'),
    document.getElementById('return-res')
]

/* IFFT */
let ifftObjetos = [
    document.getElementById('def-ifft'),
    document.getElementById('iif-n=1'),
    document.getElementById('ipe'),
    document.getElementById('ipo'),
    document.getElementById('iye'),
    document.getElementById('iyo'),
    document.getElementById('icalcy'),
    document.getElementById('ireturny')
];

let mainObjetos = [
    document.getElementById('fft-ax'),
    document.getElementById('fft-bx'),
    document.getElementById('mult-c'),
    document.getElementById('ifft-c'),
    document.getElementById('ifft-result'),
];

let normalizarObjetos = [
    document.getElementById('def-nor'),
    document.getElementById('calc-nor'),
    document.getElementById('return-nor')
];

/*
    Funciones
*/

function cambiarFuncion(funcion) {
    for (let i = 0; i < funcionesPseudocodigo.length; i++) {
        if (i == funcion) {
            funcionesPseudocodigo[i].style.display = 'block';
        }
        else {
            funcionesPseudocodigo[i].style.display = 'none';
        }
    }
}

function cambiarFuncionPseudocodigo(v) {
    switch (v) {
        case 'fft': cambiarFuncion(0);
            break;
        case 'multiplicacion': cambiarFuncion(1);
            break;
        case 'ifft': cambiarFuncion(2);
            break;
        case 'nor': cambiarFuncion(3);
            break;


    }
}

function colorear(arreglo, valor, color) {
    for (let i = 0; i < arreglo.length; i++) {
        if (i == valor) {
            if (i == 4 || i == 5)
                colorear(arreglo, 0, colorAzul);

            arreglo[i].style.color = color;
            arreglo[i].style.fontWeight = "bold";
        }
        else {
            arreglo[i].style.color = colorNegro;
            arreglo[i].style.fontWeight = "normal";
        }
    }
}

function colorearMain(arreglo, valor, color) {
    for (let i = 0; i < arreglo.length; i++) {
        if (i == valor) {

            arreglo[i].style.color = color;
            arreglo[i].style.fontWeight = "bold";
        }
        else {
            arreglo[i].style.color = colorNegro;
            arreglo[i].style.fontWeight = "normal";
        }
    }
}

function limpiar(arreglo) {
    for (let i = 0; i < arreglo.length; i++) {
        arreglo[i].style.color = colorNegro;
        arreglo[i].style.fontWeight = "normal";
    }
}

function limpiarPseudocodigo(v) {
    switch (v) {
        case 'fft': limpiar(fftObjetos);
            break;
        case 'ifft': limpiar(ifftObjetos);
            break;
        case 'mult': limpiar(multuplicacionObjetos);
            break;

    }
}

function limpiarFunciones() {
    //document.getElementById('panel').style.display = 'none';
    document.getElementById('funciones').style.display = 'none';
}

function colorearPseudocodigo(v) {
    switch (v) {
        case 'def-fft': colorear(fftObjetos, 0, colorAzul);
            break;
        case 'n1': colorear(fftObjetos, 1, colorNaranja);
            break;
        case 'pe': colorear(fftObjetos, 2, colorVerde);
            break;
        case 'po': colorear(fftObjetos, 3, colorRojo);
            break;
        case 'ye': colorear(fftObjetos, 4, colorAzul);
            break;
        case 'yo': colorear(fftObjetos, 5, colorAzul);
            break;
        case 'calcy': colorear(fftObjetos, 6, colorMorado);
            break;
        case 'returny': colorear(fftObjetos, 7, colorNaranja);
            break;

        case 'def-ifft': colorear(ifftObjetos, 0, colorAzul);
            break;
        case 'in1': colorear(ifftObjetos, 1, colorNaranja);
            break;
        case 'ipe': colorear(ifftObjetos, 2, colorVerde);
            break;
        case 'ipo': colorear(ifftObjetos, 3, colorRojo);
            break;
        case 'iye': colorear(ifftObjetos, 4, colorAzul);
            break;
        case 'iyo': colorear(ifftObjetos, 5, colorAzul);
            break;
        case 'icalcy': colorear(ifftObjetos, 6, colorMorado);
            break;
        case 'ireturny': colorear(ifftObjetos, 7, colorNaranja);
            break;

        case 'def-mult': colorear(multuplicacionObjetos, 0, colorAzul);
            break;
        case 'calc-res': colorear(multuplicacionObjetos, 1, colorVerde);
            break;
        case 'return-res': colorear(multuplicacionObjetos, 2, colorVerde);
            break;

        case 'fft-ax': colorearMain(mainObjetos, 0, colorAzul);
            break;
        case 'fft-bx': colorearMain(mainObjetos, 1, colorRojo);
            break;
        case 'mult-c': colorearMain(mainObjetos, 2, colorVerde);
            break;
        case 'ifft-c': colorearMain(mainObjetos, 3, colorMorado);
            break;
        case 'ifft-result': colorearMain(mainObjetos, 4, colorMorado);
            break;

        case 'def-nor': colorearMain(normalizarObjetos, 0, colorAzul);
            break;
        case 'calc-nor': colorearMain(normalizarObjetos, 1, colorVerde);
            break;
        case 'return-nor': colorearMain(normalizarObjetos, 2, colorVerde);
            break;

    }
}

//Función asíncroca para efectuar y animar la FFT
async function fft(p, padre, altura, cy) {
    //await sleep(tiempo / 2);
    document.getElementById('funciones').style.display = 'block';

    cambiarFuncionPseudocodigo('fft');


    //Tamaño del polinomio
    let n = p.length;

    //Identificadores de los contenedores de los arreglos
    let idPadre = 'padre-' + padre;
    let idHijoIzq = 'padre-' + ((altura + 1) * padre + 1);
    let idHijoDer = 'padre-' + ((altura + 1) * padre + 2);

    //Si el tamaño es 1, se retorna el mismo polinomio
    if (n == 1) {
        colorearPseudocodigo('n1'); // Se colorea el pseudocodigo
        //Se indica que se tienen los valores finales con el color naranja
        cy.nodes('[id="' + idPadre + '-' + 0 + '"]').style('background-color', colorNaranja);
        cy.nodes('[id="' + idPadre + '-' + 0 + '"]').style('content', complejoCompleto(p[0]));
        await sleep(tiempo);
        return p;
    }

    //Se guardan n raíces de la unidad
    let w = Array(n);
    for (let i = 0; i < n; i++) {

        let alpha = 2 * Math.PI * i / n;

        w[i] = math.complex(Math.cos(alpha), Math.sin(alpha));
    }

    //Se dibuja el polinomio a la izquierda
    let pp = Array(n / 2).fill('');
    dibujarPolinomio(pp, padre, (altura + 1) * padre + 1, altura + 1, 1, false, cy);
    cy.nodes('[id="' + idHijoIzq + '"]').style('content', 'ye');

    //Se dibuja el polinomio a la derecha
    let pi = Array(n / 2).fill('');
    dibujarPolinomio(pi, padre, (altura + 1) * padre + 2, altura + 1, 2, false, cy);
    cy.nodes('[id="' + idHijoDer + '"]').style('content', 'yo');

    await sleep(tiempo);

    /*
        Se colorean las posiciones pares
    */

    for (let i = 0; i < n / 2; i++) {
        colorearPseudocodigo('pe');
        //Coeficientes en indice par
        pp[i] = p[i * 2];

        //Animar posiciones del polinomio par
        cy.nodes('[id="' + idPadre + '-' + i * 2 + '"]').style('background-color', colorVerde);
        await sleep(tiempo / 2);

        //Se le asigna el valor a este polinomio
        cy.nodes('[id="' + idHijoIzq + '-' + i + '"]').style('background-color', colorVerde);
        cy.nodes('[id="' + idHijoIzq + '-' + i + '"]').style('content', parteReal(p[i * 2]));
        await sleep(tiempo / 2);
    }

    await sleep(tiempo / 2);

    //Se regresa el color gris a las posiciones pares

    for (let i = 0; i < n / 2; i++) {
        cy.nodes('[id="' + idPadre + '-' + i * 2 + '"]').style('background-color', colorGris);
        cy.nodes('[id="' + idHijoIzq + '-' + i + '"]').style('background-color', colorGris);
    }

    await sleep(tiempo / 2);

    /*
        Posiciones impares
    */

    for (let i = 0; i < n / 2; i++) {
        colorearPseudocodigo('po');
        pi[i] = p[i * 2 + 1];

        //Colorear arreglo 
        cy.nodes('[id="' + idPadre + '-' + (i * 2 + 1) + '"]').style('background-color', colorRojo);
        await sleep(tiempo / 2);

        //Se le asigna el valor a este polinomio
        cy.nodes('[id="' + idHijoDer + '-' + i + '"]').style('content', parteReal(p[i * 2 + 1]));
        cy.nodes('[id="' + idHijoDer + '-' + i + '"]').style('background-color', colorRojo);

        await sleep(tiempo / 2);
    }

    await sleep(tiempo / 2);

    //Se le regresa el color gris a las posiciones impares
    for (let i = 0; i < n / 2; i++) {
        cy.nodes('[id="' + idPadre + '-' + (i * 2 + 1) + '"]').style('background-color', colorGris);
        cy.nodes('[id="' + idHijoDer + '-' + i + '"]').style('background-color', colorGris);
    }

    await sleep(tiempo / 2);

    //Llamadas recursivas para divivir el polinomio, se espera a que termine cada llamada
    colorearPseudocodigo('ye');
    let yp = await fft(pp, (altura + 1) * padre + 1, altura + 1, cy);
    colorearPseudocodigo('yo');
    let yi = await fft(pi, (altura + 1) * padre + 2, altura + 1, cy);

    let y = Array(n);

    for (let i = 0; i < n / 2; i++) {
        //La primera multiplicación
        colorearPseudocodigo('calcy');
        y[i] = math.add(yp[i], math.multiply(w[i], yi[i]));


        //Se seleccionan los elementos del polinomio envueltos en la multiplicacion
        cy.nodes('[id="' + idPadre + '-' + i + '"]').style('background-color', colorMorado);
        cy.nodes('[id="' + idHijoIzq + '-' + i + '"]').style('background-color', colorMorado);
        cy.nodes('[id="' + idHijoDer + '-' + i + '"]').style('background-color', colorMorado);

        await sleep(tiempo);

        //Se indica que se tienen los valores finales con el color naranja
        cy.nodes('[id="' + idPadre + '-' + i + '"]').style('background-color', colorNaranja);
        cy.nodes('[id="' + idPadre + '-' + i + '"]').style('content', complejoCompleto(y[i]));

        await sleep(tiempo);

        //La segunda multiplicación
        y[i + n / 2] = math.add(yp[i], math.multiply(math.complex(-1, 0), math.multiply(w[i], yi[i])));

        //Se seleccionan los elementos del polinomio envueltos en la multiplicacion
        cy.nodes('[id="' + idPadre + '-' + (i + n / 2) + '"]').style('background-color', colorMorado);

        await sleep(tiempo);

        //Se indica que se tienen los valores finales con el color naranja
        cy.nodes('[id="' + idPadre + '-' + (i + n / 2) + '"]').style('background-color', colorNaranja);
        cy.nodes('[id="' + idPadre + '-' + (i + n / 2) + '"]').style('content', complejoCompleto(y[i + n / 2]));

        await sleep(tiempo);

        //Se regresa el color naranja a los elementos seleccionados

        cy.nodes('[id="' + idHijoIzq + '-' + i + '"]').style('background-color', colorNaranja);
        cy.nodes('[id="' + idHijoDer + '-' + i + '"]').style('background-color', colorNaranja);

        await sleep(tiempo);
    }

    //Se retiran los dos subarreglos
    cy.nodes('[id="' + idHijoIzq + '"]').remove();
    cy.nodes('[id="' + idHijoDer + '"]').remove();

    //Se ajusta la vista al contenedor
    colorearPseudocodigo('returny');
    cy.fit();

    await sleep(tiempo);

    limpiarPseudocodigo('fft');
    return y;
    //limpiarPseudocodigo('fft');

}

//Función asíncroca para efectuar y animar la inversa de la FFT
async function ifft(p, padre, altura, cy) {
    // Se coloca primer parte del pseudocodigo (fft)
    cambiarFuncionPseudocodigo('ifft');

    //Tamaño del polinomio
    let n = p.length;

    //Identificadores de los contenedores de los arreglos
    let idPadre = 'padre-' + padre;
    let idHijoIzq = 'padre-' + ((altura + 1) * padre + 1);
    let idHijoDer = 'padre-' + ((altura + 1) * padre + 2);

    //Si el tamaño es 1, se retorna el mismo polinomio
    if (n == 1) {
        colorearPseudocodigo('in1'); // Se colorea el pseudocodigo
        //Se indica que se tienen los valores finales con el color naranja
        cy.nodes('[id="' + idPadre + '-' + 0 + '"]').style('background-color', colorNaranja);
        cy.nodes('[id="' + idPadre + '-' + 0 + '"]').style('content', complejoCompleto(p[0]));
        await sleep(tiempo);
        return p;
    }

    //Se guardan n raíces de la unidad
    let w = Array(n);
    for (let i = 0; i < n; i++) {

        let alpha = -2 * Math.PI * i / n;

        w[i] = math.complex(Math.cos(alpha), Math.sin(alpha));
    }

    //Se dibuja el polinomio a la izquierda
    let pp = Array(n / 2).fill('');
    dibujarPolinomio(pp, padre, (altura + 1) * padre + 1, altura + 1, 1, false, cy);
    cy.nodes('[id="' + idHijoIzq + '"]').style('content', 'ye');

    //Se dibuja el polinomio a la derecha
    let pi = Array(n / 2).fill('');
    dibujarPolinomio(pi, padre, (altura + 1) * padre + 2, altura + 1, 2, false, cy);
    cy.nodes('[id="' + idHijoDer + '"]').style('content', 'yo');

    await sleep(tiempo);

    /*
        Se colorean las posiciones pares
    */

    for (let i = 0; i < n / 2; i++) {
        colorearPseudocodigo('ipe');
        //Coeficientes en indice par
        pp[i] = p[i * 2];

        //Animar posiciones del polinomio par
        cy.nodes('[id="' + idPadre + '-' + i * 2 + '"]').style('background-color', colorVerde);
        await sleep(tiempo / 2);

        //Se le asigna el valor a este polinomio
        cy.nodes('[id="' + idHijoIzq + '-' + i + '"]').style('background-color', colorVerde);
        cy.nodes('[id="' + idHijoIzq + '-' + i + '"]').style('content', complejoCompleto(p[i * 2]));
        await sleep(tiempo / 2);
    }

    await sleep(tiempo / 2);

    //Se regresa el color gris a las posiciones pares

    for (let i = 0; i < n / 2; i++) {
        cy.nodes('[id="' + idPadre + '-' + i * 2 + '"]').style('background-color', colorGris);
        cy.nodes('[id="' + idHijoIzq + '-' + i + '"]').style('background-color', colorGris);
    }

    await sleep(tiempo / 2);

    /*
        Posiciones impares
    */

    for (let i = 0; i < n / 2; i++) {
        colorearPseudocodigo('ipo');
        pi[i] = p[i * 2 + 1];

        //Colorear arreglo 
        cy.nodes('[id="' + idPadre + '-' + (i * 2 + 1) + '"]').style('background-color', colorRojo);
        await sleep(tiempo / 2);

        //Se le asigna el valor a este polinomio
        cy.nodes('[id="' + idHijoDer + '-' + i + '"]').style('content', complejoCompleto(p[i * 2 + 1]));
        cy.nodes('[id="' + idHijoDer + '-' + i + '"]').style('background-color', colorRojo);

        await sleep(tiempo / 2);
    }

    await sleep(tiempo / 2);

    //Se le regresa el color gris a las posiciones impares
    for (let i = 0; i < n / 2; i++) {
        cy.nodes('[id="' + idPadre + '-' + (i * 2 + 1) + '"]').style('background-color', colorGris);
        cy.nodes('[id="' + idHijoDer + '-' + i + '"]').style('background-color', colorGris);
    }

    await sleep(tiempo / 2);

    //Llamadas recursivas para divivir el polinomio, se espera a que termine cada llamada
    colorearPseudocodigo('iye');
    let yp = await ifft(pp, (altura + 1) * padre + 1, altura + 1, cy);
    colorearPseudocodigo('iyo');
    let yi = await ifft(pi, (altura + 1) * padre + 2, altura + 1, cy);

    let y = Array(n);

    for (let i = 0; i < n / 2; i++) {
        colorearPseudocodigo('icalcy');
        //La primera multiplicación
        y[i] = math.add(yp[i], math.multiply(w[i], yi[i]));

        //Se seleccionan los elementos del polinomio envueltos en la multiplicacion
        cy.nodes('[id="' + idPadre + '-' + i + '"]').style('background-color', colorMorado);
        cy.nodes('[id="' + idHijoIzq + '-' + i + '"]').style('background-color', colorMorado);
        cy.nodes('[id="' + idHijoDer + '-' + i + '"]').style('background-color', colorMorado);

        await sleep(tiempo);

        //Se indica que se tienen los valores finales con el color naranja
        cy.nodes('[id="' + idPadre + '-' + i + '"]').style('background-color', colorNaranja);
        cy.nodes('[id="' + idPadre + '-' + i + '"]').style('content', complejoCompleto(y[i]));

        await sleep(tiempo);

        //La segunda multiplicación
        y[i + n / 2] = math.add(yp[i], math.multiply(math.complex(-1, 0), math.multiply(w[i], yi[i])));

        //Se seleccionan los elementos del polinomio envueltos en la multiplicacion
        cy.nodes('[id="' + idPadre + '-' + (i + n / 2) + '"]').style('background-color', colorMorado);

        await sleep(tiempo);

        //Se indica que se tienen los valores finales con el color naranja
        cy.nodes('[id="' + idPadre + '-' + (i + n / 2) + '"]').style('background-color', colorNaranja);
        cy.nodes('[id="' + idPadre + '-' + (i + n / 2) + '"]').style('content', complejoCompleto(y[i + n / 2]));

        await sleep(tiempo);

        //Se regresa el color naranja a los elementos seleccionados
        //colorearPseudocodigo('ireturny');
        cy.nodes('[id="' + idHijoIzq + '-' + i + '"]').style('background-color', colorNaranja);
        cy.nodes('[id="' + idHijoDer + '-' + i + '"]').style('background-color', colorNaranja);

        await sleep(tiempo);
    }

    //Se retiran los dos subarreglos
    cy.nodes('[id="' + idHijoIzq + '"]').remove();
    cy.nodes('[id="' + idHijoDer + '"]').remove();

    //Se ajusta la vista al contenedor
    colorearPseudocodigo('ireturny');
    cy.fit();

    await sleep(tiempo);

    limpiarPseudocodigo('ifft');
    return y;
}

async function multiplicacion(a, b) {
    // Se coloca primer parte del pseudocodigo (fft)
    cambiarFuncionPseudocodigo('multiplicacion');


    let n = a.length;
    let c = Array(n).fill('');

    //Se determinan los idenfiticadores de los contenedores de los arreglos
    let idA = 'padre-0';
    let idB = 'padre-1';
    let idC = 'padre-2';

    //Se dibujan los trespolinomios
    dibujarPolinomio(a, 0, 0, 0, 0, true, cy);
    cy.nodes('[id = "padre-0"]').style('content', 'A*');
    dibujarPolinomio(b, 0, 1, 1, 0, true, cy);
    cy.nodes('[id = "padre-1"]').style('content', 'B*');
    dibujarPolinomio(c, 0, 2, 2, 0, true, cy);
    cy.nodes('[id = "padre-2"]').style('content', 'C*');
    await sleep(tiempo);

    //Se hace la multiplicación
    colorearPseudocodigo('calc-res');
    for (let i = 0; i < n; i++) {

        c[i] = math.multiply(a[i], b[i]);

        //Se seleccionan las celdas a multiplicarse
        cy.nodes('[id="' + idA + '-' + i + '"]').style('background-color', colorVerde);
        cy.nodes('[id="' + idB + '-' + i + '"]').style('background-color', colorVerde);
        cy.nodes('[id="' + idC + '-' + i + '"]').style('background-color', colorVerde);

        await sleep(tiempo);

        //Se coloca el valor de c
        cy.nodes('[id="' + idC + '-' + i + '"]').style('content', complejoCompleto(c[i]));

        await sleep(tiempo / 2);

        //Se regresan los colores grises a las celdas
        cy.nodes('[id="' + idA + '-' + i + '"]').style('background-color', colorGris);
        cy.nodes('[id="' + idB + '-' + i + '"]').style('background-color', colorGris);
        cy.nodes('[id="' + idC + '-' + i + '"]').style('background-color', colorGris);

        await sleep(tiempo / 2);
    }
    colorearPseudocodigo('return-res');

    await sleep(tiempo);

    limpiarPseudocodigo('mult');

    return c;
}

async function normalizarIfft(p) {
    cambiarFuncionPseudocodigo('nor');
    let n = p.length;

    //Identificador del contenedor
    let idC = 'padre-0';

    colorearPseudocodigo('calc-nor');
    for (let i = 0; i < n; i++) {
        p[i] = math.multiply(1 / n, p[i]);

        //Se anima cada elemento del arreglo
        cy.nodes('[id="' + idC + '-' + i + '"]').style('background-color', colorVerde);

        await sleep(tiempo);

        //Se regresa el color gris
        cy.nodes('[id="' + idC + '-' + i + '"]').style('background-color', colorGris);
        cy.nodes('[id="' + idC + '-' + i + '"]').style('content', parteReal(p[i]));

        await sleep(tiempo / 2);
    }

    colorearPseudocodigo('return-nor');
    await sleep(tiempo / 2);

    return p;
}

function gradoFuncion(p) {
    let n = p.length;

    for (let i = n - 1; i >= 0; i--) {
        if (p[i] != 0)
            return i;
    }
}

function gradoMultiplicacion(a, b) {

    let g1 = gradoFuncion(a);
    let g2 = gradoFuncion(b);

    if (g1 == undefined) {
        g1 = 0;
    }

    if (g2 == undefined) {
        g2 = 0;
    }

    return g1 + g2;
}

function puntosMinimos(g) {

    let i = 1;

    while (i < g + 1) {
        i = i * 2;
    }

    return i;
}

function rellenarPolinomio(p, n) {

    let y = Array(n);
    let g = gradoFuncion(p);

    for (let i = 0; i < n; i++) {
        if (i <= g) {
            y[i] = p[i];
        }
        else {
            y[i] = math.complex(0, 0);
        }
    }

    return y;
}

function parteReal(c) {
    return '' + c.re.toFixed(1);
}

function parteImaginaria(c) {
    return '' + c.im.toFixed(1);
}

function complejoCompleto(c) {

    if (c.im < 0)
        return parteReal(c) + '' + parteImaginaria(c) + 'i';
    else
        return parteReal(c) + '+' + parteImaginaria(c) + 'i';
}

async function dibujarPolinomio(p, padre, contenedor, altura, hijo, complejo, cy) {

    //Offset en el eje horizontal
    let xOffset = 0;
    let x;

    //Identificadores de los contenedores
    let idPadre = 'padre-' + padre;
    let idContenedor = 'padre-' + contenedor;

    //Contenedor de los elementos del arreglo
    cy.add([
        { group: "nodes", data: { id: idContenedor } }
    ]);

    //Calculo de la posición en x para los hijos a la izquierda y derecha
    if (altura == 1 && hijo == 1)
        x = cy.getElementById(idPadre).position().x - (p.length / 2) * cajaLargo - 15;
    else
        x = cy.getElementById(idPadre).position().x;

    //Se calcula la mitad del arreglo padre
    let mitad = (p.length / 2) * (cajaLargo);

    //Se ajusta el offset horizontal en base al arreglo padre
    if (hijo == 1)
        xOffset = x + (mitad * -2);
    else if (hijo == 2)
        xOffset = mitad * 2 + x;

    //Se crean los elementos del arreglo hijo y se inicializa su valor
    for (let j = 0; j < p.length; j++) {

        //Se crea el elemento j
        cy.add([
            {
                group: "nodes", data: {
                    id: idContenedor + '-' + j, parent: idContenedor
                },
                position: {
                    x: j * (cajaLargo + 1) + xOffset, y: altura * (cajaLargo + 25)
                }
            }
        ]);

        //Se inicializa su valor
        let e;

        if (p[j] == '')
            e = p[j];
        else if (!complejo)
            e = parteReal(p[j]);
        else if (complejo)
            e = complejoCompleto(p[j]);

        cy.nodes('[id="' + idContenedor + '-' + j + '"]').style('content', e);

        cy.fit();
    }

    //Se dibujan las aristas para los hijos
    if (hijo > 0) {
        cy.add([
            { group: "edges", data: { id: idContenedor + '-hijo-' + hijo, source: idPadre, target: idContenedor } },
        ]);

        if (hijo == 1) {
            cy.edges('[id="' + idContenedor + '-hijo-' + hijo + '"]').style('label', 'Pe');
        }

        if (hijo == 2) {
            cy.edges('[id="' + idContenedor + '-hijo-' + hijo + '"]').style('label', 'Po');
        }
    }

    //Se ajusta el contenido al contenedor del canvas
    cy.fit();
}

async function animacionFft(a, b, velocidad) {
    tiempo = tiempo * (1 / velocidad);

    //Se ajustan los polinomios
    let n = puntosMinimos(gradoMultiplicacion(a, b));

    a = rellenarPolinomio(a, n);
    b = rellenarPolinomio(b, n);

    cy.resize();
    cy.elements().remove();

    document.getElementById('main').style.display = 'block';

    //Primero se anima el polinomio A(x)
    dibujarPolinomio(a, 0, 0, 0, 0, false, cy);
    cy.nodes('[id = "padre-0"]').style('content', 'A(x)');
    cy.fit();
    await sleep(tiempo);

    document.getElementById('funciones').style.display = 'block';
    colorearPseudocodigo('fft-ax');

    colorearPseudocodigo('def-fft');
    a = await fft(a, 0, 0, cy);

    //Se limpia el canvas para la siguiente animación
    //limpiarFunciones();
    cy.elements().remove();

    //Se muestra A*
    dibujarPolinomio(a, 0, 0, 0, 0, true, cy);
    cy.nodes('[id = "padre-0"]').style('content', 'A*');
    cy.fit();
    await sleep(3 * tiempo);

    //Se limpia el canvas para la siguiente animación
    cy.elements().remove();

    //Se anima al polinomio B(x)
    //limpiarFunciones();
    colorearPseudocodigo('fft-bx');
    dibujarPolinomio(b, 0, 0, 0, 0, false, cy);
    cy.nodes('[id = "padre-0"]').style('content', 'B(x)');
    cy.fit();
    await sleep(tiempo);

    colorearPseudocodigo('def-fft');
    b = await fft(b, 0, 0, cy);

    //Se limpia el canvas para la siguiente animación
    cy.elements().remove();

    //Se muestra el resultado de B*
    dibujarPolinomio(b, 0, 0, 0, 0, true, cy);
    cy.nodes('[id = "padre-0"]').style('content', 'B*');
    cy.fit();
    await sleep(3 * tiempo);

    //Se limpia el canvas para la siguiente animación
    cy.elements().remove();

    //Se anima la multiplicación
    colorearPseudocodigo('mult-c');
    colorearPseudocodigo('def-mult');
    let c = await multiplicacion(a, b);

    //Se limpia el canvas para la siguiente animación
    cy.elements().remove();

    //Se muestra el resultado de C*
    dibujarPolinomio(c, 0, 0, 0, 0, true, cy);
    cy.nodes('[id = "padre-0"]').style('content', 'C*');
    cy.fit();
    await sleep(3 * tiempo);

    //Se limpia el canvas para la siguiente animación
    cy.elements().remove();

    //Se anima la transformada inversa de c
    colorearPseudocodigo('ifft-c');
    cy.elements().remove();

    //Se muestra el resultado de C*
    dibujarPolinomio(c, 0, 0, 0, 0, true, cy);
    cy.nodes('[id = "padre-0"]').style('content', 'C*');
    cy.fit();
    await sleep(tiempo);
    colorearPseudocodigo('def-ifft');
    c = await ifft(c, 0, 0, cy);
    c = await repararDecimales(c);

    //Se limpia el canvas para la siguiente animación
    cy.elements().remove();

    //Se muestra el resultado de Cn
    dibujarPolinomio(c, 0, 0, 0, 0, true, cy);
    cy.nodes('[id = "padre-0"]').style('content', 'Cn');
    cy.fit();
    await sleep(3 * tiempo);

    //Se limpia el canvas para la siguiente animación
    cy.elements().remove();

    //Se anima la normalizacion de la transformada inversa
    colorearPseudocodigo('ifft-result');
    dibujarPolinomio(c, 0, 0, 0, 0, false, cy);
    cy.nodes('[id = "padre-0"]').style('content', 'Cn');
    cy.fit();
    await sleep(3 * tiempo);
    colorearPseudocodigo('def-nor');
    c = await normalizarIfft(c);

    //Se muestra el resultado de C(x)
    cy.nodes('[id = "padre-0"]').style('content', 'C(x)');
    cy.fit();

    await sleep(tiempo);

    limpiarFunciones();

    await sleep(3 * tiempo);

    tiempo = 1000 * mutiplicador;

    return c;
}

async function repararDecimales(c) {

    for (let i = 0; i < c.length; i++) {
        c[i].re = Math.round(c[i].re);
        c[i].im = Math.round(c[i].im);
    }

    return c;
}

//Función sleep
async function sleep(ms) {
    return new Promise((accept) => {
        setTimeout(() => {
            accept();
        }, ms);
    });
}

//Configuracion del canvas
var cy = window.cy = cytoscape({
    container: document.getElementById('cy'),

    boxSelectionEnabled: false,

    style: [
        {
            name: '',
            selector: 'node',
            style: {
                'text-valign': 'center',
                'text-halign': 'center',
                'shape': 'round-rectangle',
                'font-size': letraTam,
                'width': cajaLargo + 'px',
                'height': cajaLargo + 'px',
                'background-color': colorGris
            }
        },
        {
            selector: ':parent',
            style: {
                'text-valign': 'top',
                'text-halign': 'center',
                'padding': '1',
                'content': '',
                'background-color': 'whitesmoke'
            }
        },
        {
            selector: 'edge',
            style: {
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'target-arrow-color': '#dadada',
                'line-style': 'dashed',
                'line-color': '#dadada',
                'width': '3px'
            }
        }
    ],

    layout: {
        name: 'preset',
        padding: 1
    }
});

//Función para empezar la animación
//animacionFft(cy);
