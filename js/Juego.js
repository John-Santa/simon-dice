const BTN_EMPEZAR = document.getElementById('btnEmpezar');
const CELESTE = document.getElementById('celeste');
const VIOLETA = document.getElementById('violeta');
const NARANJA = document.getElementById('naranja');
const VERDE = document.getElementById('verde');
const ULTIMO_NIVEL = 20;

class Juego {
    constructor() {
        this.inicializar();
        this.generarSecuencia();
        this.siguienteNivel();
    }

    inicializar() {
        this.inicializar = this.inicializar.bind(this);
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.elegirColor = this.elegirColor.bind(this);
        this.toggleBtnEmpezar();

        this.nivel = 1;
        this.colores = {
            celeste: CELESTE,
            violeta: VIOLETA,
            naranja: NARANJA,
            verde: VERDE
        };
    }

    toggleBtnEmpezar() {
        if (BTN_EMPEZAR.classList.contains('hide')) {
            BTN_EMPEZAR.classList.remove('hide');
        } else {
            BTN_EMPEZAR.classList.add('hide');
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL)
            .fill(0)
            .map(position => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {
        this.subNivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste';
            case 1:
                return 'violeta';
            case 2:
                return 'naranja';
            case 3:
                return 'verde';
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0;
            case 'violeta':
                return 1;
            case 'naranja':
                return 2;
            case 'verde':
                return 3;
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(() => this.iluminarColor(color), 1000 * i);
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light');
        setTimeout(() => this.apagarColor(color), 350);
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light');
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
        this.colores.naranja.addEventListener('click', this.elegirColor);
        this.colores.violeta.addEventListener('click', this.elegirColor);
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);
        this.colores.violeta.removeEventListener('click', this.elegirColor);
    }

    elegirColor(event) {
        const nombreColor = event.target.dataset.color;
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if (numeroColor === this.secuencia[this.subNivel]) {
            this.subNivel++;
            if (this.subNivel === this.nivel) {
                this.nivel++;
                this.eliminarEventosClick;
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego();
                } else {
                    setTimeout(this.siguienteNivel, 1500);
                }
            }
        } else {
            this.perdioElJuego();
        }
    }

    ganoElJuego() {
        swal('Simon dice', 'ganaste el juego, felcitaciones! 😁', 'success')
            .then(() => {
                this.eliminarEventosClick();
                this.inicializar();
            });
    }


    perdioElJuego() {
        swal('Simon dice', 'perdiste el juego 😖', 'error')
            .then(() => {
                this.eliminarEventosClick();
                this.inicializar();
            });
    }
}


function empezarJuego() {
    var juego = new Juego();
}