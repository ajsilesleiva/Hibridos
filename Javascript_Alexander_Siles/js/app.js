var calculadora = {
    init: function () {
        this.teclaAnimada()
    },
    teclaAnimada: function () {
        var estado = "apagado";
        var imprimir = 0;
        var contador = 0;
        var valorDisplay = 0;
        var valorClick = 0;
        var arrayNum = [];
        var pad1 = /[1-9]/g;
        var preImprimir = 0;
        var estadoRaiz = false;
        var operacion = "";
        var teclaIgual = false;
        document.addEventListener('click', evento);

        function evento(e) {
            valorClick = e.target.id;
            var clase = e.target.className;
            var elemento = document.getElementById(valorClick);
            var display = document.getElementById('display');
            valorDisplay = document.getElementById('display').innerHTML;
            //////////////////////////////////////////////////////////////////
            if (clase.includes("tecla") && valorClick != null && valorClick != "" && teclaIgual == false) {
                var inicio = setTimeout(ini, 30);
                var reini;
                function ini() {
                    elemento.style.transform = "scale(0.95,0.95)";
                    clearTimeout(inicio);
                    var reini = setTimeout(fin, 30);
                }

                function fin() {
                    elemento.style.transform = "scale(1,1)";
                    clearTimeout(reini);
                }
            };
            //////////////////////////////////////////////////////////////////
            if (valorClick.match(pad1) && valorDisplay.length < 8) {

                if (valorDisplay === 0 || valorDisplay === "0") {
                    display.innerHTML = valorClick;
                    estado = "apagado";

                } else if (valorDisplay == "0.") {
                    display.innerHTML += valorClick;
                    estado = "apagado";

                } else if (arrayNum.length == 1 && contador == "0" && !valorDisplay.includes(".")) {
                    display.innerHTML = valorClick;
                    contador += 1;
                    estado = "apagado";
                } else if (estadoRaiz == true) {
                    display.innerHTML = valorClick;
                    estado = "apagado";
                    estadoRaiz = false;
                    return;
                } else {
                    display.innerHTML = valorDisplay + valorClick;
                    estado = "apagado";
                }
            } else if (valorClick.match(pad1) && valorDisplay.length >= 8 && estado == "encendido") {
                display.innerHTML = valorClick;
            }
            //////////////////////////////////////////////////////////////////
            else if (valorClick == "on") {
                display.innerHTML = 0;
                arrayNum.length = 0;
                contador = 0;
                imprimir = 0;
            }
            //////////////////////////////////////////////////////////////////
            switch (valorClick) {
                case "mas":
                    if (arrayNum.length == "0") {
                        arrayNum[0] = valorDisplay;
                        estado = "encendido";
                        operacion = "mas"
                    } else if (arrayNum.length == 1 && estado == "apagado") {
                        arrayNum[1] = valorDisplay;
                        /////////////////////////////////////////////////
                        for (x = 0; x < arrayNum.length; x++) {
                            imprimir += parseFloat(arrayNum[x]);
                        }
                        /////////////////////////////////////////////////
                        imprimir.toString().length > 8 ? display.innerHTML = imprimir.toExponential(1) : display.innerHTML = imprimir;
                        arrayNum.length = 0;
                        arrayNum[0] = imprimir;
                        contador = 0;
                        estado = "encendido"
                        imprimir = 0;
                        preImprimir = 0;
                        teclaIgual = false;
                    }
                    break;
                case 'menos':
                    if (arrayNum.length == "0") {
                        arrayNum[0] = valorDisplay;
                        estado = "encendido";
                        operacion = "menos"
                    } else if (arrayNum.length == 1 && estado == "apagado") {
                        arrayNum[1] = "-" + valorDisplay;
                        /////////////////////////////////////////////////
                        for (x = 0; x < arrayNum.length; x++) {
                            preImprimir -= parseFloat(arrayNum[x]);
                        }
                        /////////////////////////////////////////////////
                        preImprimir.toString().length > 8 ? imprimir = preImprimir.toExponential(1) : imprimir = preImprimir;
                        display.innerHTML = imprimir * -1;
                        arrayNum.length = 0;
                        arrayNum[0] = imprimir * -1;
                        contador = 0;
                        estado = "encendido"
                        imprimir = 0
                        preImprimir = 0;
                        teclaIgual = false;
                    }
                    break;
                case 'sign':
                    var signo = Math.sign(valorDisplay);
                    if (signo == 1 || signo == -1){
                        display.innerHTML = valorDisplay * -1;
                    }else{
                    display.innerHTML = valorDisplay;
                    }
                    break;
                case 'raiz':
                    display.innerHTML = Math.sqrt(valorDisplay).toFixed(6);
                    estadoRaiz = true;
                    break;
                case 'por':
                    if (arrayNum.length == "0") {
                        arrayNum[0] = valorDisplay;
                        estado = "encendido";
                        operacion = "por"
                    } else if (arrayNum.length == 1 && estado == "apagado") {
                        arrayNum[1] = valorDisplay;
                        preImprimir = arrayNum[1];
                        /////////////////////////////////////////////////
                        for (x = 0; x < arrayNum.length - 1; x++) {
                            preImprimir *= parseFloat(arrayNum[x]);
                        }
                        /////////////////////////////////////////////////
                        preImprimir.toString().length > 8 ? imprimir = preImprimir.toExponential(1) : imprimir = preImprimir;
                        display.innerHTML = imprimir;
                        arrayNum.length = 0;
                        arrayNum[0] = imprimir;
                        contador = 0;
                        estado = "encendido"
                        imprimir = 0
                        preImprimir = 0;
                        teclaIgual = false;
                    }
                    break;
                case 'dividido':
                    if (arrayNum.length == "0") {
                        arrayNum[0] = valorDisplay;
                        estado = "encendido";
                        operacion = "dividido"
                    } else if (arrayNum.length == 1 && estado == "apagado") {
                        arrayNum[1] = valorDisplay;
                        preImprimir = arrayNum[0];
                        /////////////////////////////////////////////////
                        for (x = arrayNum.length - 1; x > 0; x--) {
                            preImprimir /= parseFloat(arrayNum[x]);
                        }
                        /////////////////////////////////////////////////
                        preImprimir.toString().length > 8 ? imprimir = preImprimir.toExponential(1) : imprimir = preImprimir;
                        display.innerHTML = imprimir;
                        arrayNum.length = 0;
                        arrayNum[0] = imprimir;
                        contador = 0;
                        estado = "encendido"
                        imprimir = 0
                        preImprimir = 0;
                        teclaIgual = false;
                    }
                    break;
                case 'igual':
                    switch (operacion) {
                        case "dividido":
                            eventFire(document.getElementById('dividido'), 'click');
                            break;
                        case "mas":
                            eventFire(document.getElementById('mas'), 'click');
                            break;
                        case "menos":
                            eventFire(document.getElementById('menos'), 'click');
                            break;
                        case "por":
                            eventFire(document.getElementById('por'), 'click');
                            break;
                        default:
                            break;
                    }


                    function eventFire(el, etype) {
                        teclaIgual = true;
                        if (el.fireEvent) {
                            el.fireEvent('on' + etype);
                        } else {
                            var evObj = document.createEvent('Events');
                            evObj.initEvent(etype, true, false);
                            el.dispatchEvent(evObj);
                        }
                    }
                    break;
                case 'punto':
                    if (valorClick === "punto" && estado == "encendido") {
                        display.innerHTML = ".";
                        return;
                    }
                    if (!valorDisplay.includes(".")) {
                        display.innerHTML += "."
                    }
                    break;
                case '0':
                    if (valorDisplay == "0") {
                        return;
                    } else if (estado == "encendido") {
                        display.innerHTML = valorClick;
                        estado = "apagado";
                        return;
                    } else {
                        display.innerHTML += valorClick;
                    }


                    break;
                default:
                    break;
            }
        }
    }
}
calculadora.init();
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('wk.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
