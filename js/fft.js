function fft(p) {
    //Tamaño del polinomio
    let n = p.length

    //Si el tamaño es 1, se retorna el mismo polinomio
    if (n == 1)
        return p

    //Se guardan n raíces de la unidad
    let w = Array(n)
    for (let i = 0; i < n; i++) {

        //Angulo
        let alpha = 2 * Math.PI * i / n

        //Raiz de la unidad
        w[i] = math.complex(Math.cos(alpha), Math.sin(alpha))
    }

    let pp = Array(n / 2)
    let pi = Array(n / 2)

    for (let i = 0; i < n / 2; i++) {

        //Coeficientes en indice par
        pp[i] = p[i * 2]

        //Coeficientes en indice impar
        pi[i] = p[i * 2 + 1]
    }

    //Recursión
    let yp = fft(pp)
    let yi = fft(pi)

    let y = Array(n)

    for (let i = 0; i < n / 2; i++) {
        y[i] = math.add(yp[i], math.multiply(w[i], yi[i]))
        y[i + n / 2] = math.add(yp[i], math.multiply(math.complex(-1, 0), math.multiply(w[i], yi[i])))
    }

    return y;
}

function ifft(p) {
    //Tamaño del polinomio
    let n = p.length

    //Si el tamaño es 1, se retorna el mismo polinomio
    if (n == 1)
        return p

    //Se guardan n raíces de la unidad
    let w = Array(n)
    for (let i = 0; i < n; i++) {

        //Angulo
        let alpha = -2 * Math.PI * i / n

        //Raiz de la unidad
        //w[i] = math.multiply(math.complex(1 / n, 0), math.complex(Math.cos(alpha), Math.sin(alpha)))
        w[i] = math.complex(Math.cos(alpha), Math.sin(alpha))
    }

    let pp = Array(n / 2)
    let pi = Array(n / 2)

    for (let i = 0; i < n / 2; i++) {

        //Coeficientes en indice par
        pp[i] = p[i * 2]

        //Coeficientes en indice impar
        pi[i] = p[i * 2 + 1]
    }

    //Recursión
    let yp = ifft(pp)
    let yi = ifft(pi)

    let y = Array(n)

    for (let i = 0; i < n / 2; i++) {
        y[i] = math.add(yp[i], math.multiply(w[i], yi[i]))
        y[i + n / 2] = math.add(yp[i], math.multiply(math.complex(-1, 0), math.multiply(w[i], yi[i])))
    }

    return y;
}

function normalizarIfft(p) {

    n = p.length
    for (let i = 0; i < n; i++)
        p[i] = math.multiply(1 / n, p[i])

    return p
}

function multiplicacion(a, b) {
    let n = a.length

    let c = Array(n)

    for (let i = 0; i < n; i++)
        c[i] = math.multiply(a[i], b[i])

    return c
}

function gradoFuncion(p) {
    let n = p.length

    for (let i = n - 1; i >= 0; i--) {
        if (p[i] != 0)
            return i;
    }
}

function gradoMultiplicacion(a, b) {

    g1 = gradoFuncion(a)
    g2 = gradoFuncion(b)

    return g1 + g2;
}

function puntosMinimos(g) {

    let i = 1

    while (i < g + 1) {
        i = i * 2
    }

    return i
}

function rellenarPolinomio(p, n) {

    y = Array(n)
    g = gradoFuncion(p)

    for (let i = 0; i < n; i++) {
        if (i <= g) {
            y[i] = p[i];
        }
        else {
            y[i] = math.complex(0, 0);
        }
    }

    return y
}


a = [math.complex(5, 0), math.complex(3, 0), math.complex(2, 0), math.complex(1, 0)]
b = [math.complex(3, 0), math.complex(0, 0), math.complex(1, 0), math.complex(0, 0)]

let n = puntosMinimos(gradoMultiplicacion(a, b))

a = rellenarPolinomio(a, n)
b = rellenarPolinomio(b, n)

a = fft(a)
b = fft(b)

c = multiplicacion(a, b)
c = ifft(c)
c = normalizarIfft(c)

console.log(c)