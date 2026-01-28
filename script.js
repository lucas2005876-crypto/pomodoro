//codigo atualizado

const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const card = document.querySelector('.app__card')
const starterPause = document.getElementById('start-pause')
const img = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaInput = document.getElementById('alternar-musica')

const musica = new Audio('sons/luna-rise-part-one.mp3')
const playAudio = new Audio('sons/play.wav')
const pauseA = new Audio('sons/pause.mp3')
const alerta = new Audio('sons/beep.mp3')

const timerArea = document.getElementById('timer')

let tempoDecorrido = 1500
let intervalo = null

musica.loop = true

musicaInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorrido = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorrido = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorrido = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()

    botoes.forEach(botao => {
        botao.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    img.setAttribute('src', `imagens/${contexto}.png`)

    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
                Otimize sua produtividade,<br />
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break

        case 'descanso-curto':
            titulo.innerHTML = `
                Que tal dar uma respirada?<br />
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break

        case 'descanso-longo':
            titulo.innerHTML = `
                Hora de voltar à superfície.<br />
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break
    }
}

const contagemRegressiva = () => {
    if (tempoDecorrido <= 0) {
        alerta.play()
        zerar()
        return
    }

    tempoDecorrido--
    mostrarTempo()
}

starterPause.addEventListener('click', iniciarPausar)

function iniciarPausar() {
    if (intervalo) {
        zerar()
        pauseA.play()
        starterPause.textContent = 'Começar'
        return
    }

    intervalo = setInterval(contagemRegressiva, 1000)
    playAudio.play()
    starterPause.textContent = 'Pausar'
}

function zerar() {
    clearInterval(intervalo)
    intervalo = null
    tempoDecorrido = 1500
    mostrarTempo()
}

function mostrarTempo() {
    const minutos = Math.floor(tempoDecorrido / 60)
    const segundos = tempoDecorrido % 60

    timerArea.textContent = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
}

mostrarTempo()
