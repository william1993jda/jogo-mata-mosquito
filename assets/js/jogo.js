let altura = 0
let largura = 0
let vidas = 1
let tempo = 10

let criaMosquitoTempo = 1500

let nivel = window.location.search

nivel = nivel.replace('?', '')

if(nivel === 'normal') {
    criaMosquitoTempo = 1500
} else if(nivel === 'dificil') {
    criaMosquitoTempo = 1000
} else if(nivel === 'chucknorris') {
    criaMosquitoTempo = 750
}

// Pegando as dimenções do navegador no anguro X e Y
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(altura, largura)
}

// Essa função está atribuida a Tag Body do meu HTML
ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {
    
    tempo -= 1

    if( tempo < 0 ) {
        clearInterval(cronometro)
        clearInterval(criarMosca)
        window.location.href='vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)

// Multiplicando o valor X e Y com a função random para gerar valores aleatórios
function posicaoRandomica() {

    // Remover o mosquito anterior (caso exista)
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if(vidas > 3) {
            window.location.href='game_over.html'
        } else {
            document.getElementById('v' + vidas).src = './assets/imagens/coracao_vazio.png'
            vidas++
        }
    }

    // O -90, não deixa a imagem ir além das margens do navegador
    let posicaoX = Math.floor(Math.random() * largura) - 90
    let posicaoY = Math.floor(Math.random() * altura) - 90

    // Essa verificação não deixa ter valor negativo
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY
    
    console.log(posicaoX, posicaoY)
    
    // Criar elementos html
    let mosquito = document.createElement('img')
    mosquito.src = './assets/imagens/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'

    mosquito.onclick = function() {
        this.remove()
    }
    
    // Criando um elemento filho
    document.body.appendChild(mosquito)
}

// Mudar o tamanho aleatóriamente do mosquito
function tamanhoAleatorio() {
    let classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio() {
    let classe = Math.floor(Math.random() * 2)
    
    switch(classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}