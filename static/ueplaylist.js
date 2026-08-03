const musica = document.getElementById('musica');
const musicasFuncionais = document.getElementsByClassName('musicasFuncionais');
const todasPlaylists = document.getElementsByClassName('playlist')
const pause = document.getElementById('pause') ;
const pesquisa = document.getElementById('pesquisa')
const sugestoes = document.getElementsByClassName('sugestoes')
const cancao = document.getElementsByClassName('cancao')
const cantor = document.getElementsByClassName('cantor')
let tocando = 0;
let curtida = 0;
let playlist = 0;
const listaNotificacao = ['mensagem 1', ' notificacao comicamente grande pra ver se cabe na barrinha de notificacao oi olá', 'mensagem 3']
const notificacao = document.getElementById("not1")
const listaRecomendacao = document.getElementsByClassName("recomendacao")
const path = "../static/musicas/"
const musicasProvisorio = [
    ["evidencias", "chitaozinho & xororo"],
    ["tempo perdido", "legiao urbana"],
    ["pais e filhos", "legiao urbana"],
    ["anna julia", "los hermanos"],
    ["malandragem", "cassia eller"],
    ["o segundo sol", "cassia eller"],
    ["garota nacional", "skank"],
    ["vou deixar", "skank"],
    ["dias melhores", "jota quest"],
    ["facil", "jota quest"],
    ["metamorfose ambulante", "raul seixas"],
    ["maluco beleza", "raul seixas"],
    ["asa branca", "luiz gonzaga"],
    ["xote das meninas", "luiz gonzaga"],
    ["ai se eu te pego", "michel telo"],
    ["borbulhas de amor", "fagner"],
    ["sozinho", "caetano veloso"],
    ["aquarela", "toquinho"],
    ["cheia de manias", "raca negra"],
    ["e o amor", "zeze di camargo & luciano"],
    ["sinonimos", "chitaozinho & xororo"],
    ["cheirosa", "jorge & mateus"],
    ["fio de cabelo", "chitaozinho & xororo"],
    ["tocando em frente", "almir sater"],
    ["o caderno", "toquinho"],
    ["sina", "djavan", 'Certas coisas.mp3'],
    ["flor e o beija-flor", "henrique & juliano, marilia mendonca"],
    ["infiel", "marilia mendonca"],
    ["a lua me traiu", "banda calypso"],
    ["anna julia", "los hermanos"]
]
const playlist1 = [
    ["sina", "djavan", 'Certas coisas.mp3'],
    ["flor e o beija-flor", "henrique & juliano, marilia mendonca"],
    ["infiel", "marilia mendonca"],
    ["certas coisas", "djavan"],
    ["anna julia", "los hermanos"]
]
const playlist2 = [  
    ["pais e filhos", "legiao urbana"],
    ["anna julia", "los hermanos"],
    ["malandragem", "cassia eller"],
    ["o segundo sol", "cassia eller"],
    ["garota nacional", "skank"],
    ["vou deixar", "skank"],
    ["dias melhores", "jota quest"],
    ["facil", "jota quest"],
    ["metamorfose ambulante", "raul seixas"],
    ["maluco beleza", "raul seixas"],
    ["asa branca", "luiz gonzaga"],
    ["xote das meninas", "luiz gonzaga"],
    ["ai se eu te pego", "michel telo"],
    ["borbulhas de amor", "fagner"],
    ["sozinho", "caetano veloso"],
    ["aquarela", "toquinho"],
    ["cheia de manias", "raca negra"],
    ["e o amor", "zeze di camargo & luciano"],
    ["sinonimos", "chitaozinho & xororo"],
    ["cheirosa", "jorge & mateus"],
    ["fio de cabelo", "chitaozinho & xororo"],
    ["tocando em frente", "almir sater"],
    ["o caderno", "toquinho"]
]
const playlist3 = [
    ["evidencias", "chitaozinho & xororo"],
    ["tempo perdido", "legiao urbana"]
]


function DisplayPlaylist(musica){
    let i = 0
    const songs = document.createElement('p')
    songs.innerHTML = `${musica[0]} <br>-- ${musica[1]}`
    songs.className = "songs musicasFuncionais"
    songs.id = `songPlaylist${i}`
    document.getElementById('playlistAtual').appendChild(songs)
    i++
    
}
function Pausar(){
    if(tocando == 1){
        musica.pause()
        tocando = 0
        document.getElementById('botaoPause').classList.remove(...["fa-solid", "fa-pause", "fa-3x"])
        document.getElementById('botaoPause').classList.add(...["fa-solid", "fa-play", "fa-3x"]);    
    }
    else if(tocando == 0){
        musica.play()
        tocando = 1
        document.getElementById('botaoPause').classList.remove(...["fa-solid", "fa-play", "fa-3x"]);
        document.getElementById('botaoPause').classList.add(...["fa-solid", "fa-pause", "fa-3x"])
    }
}
function CarregarBarra(){
    document.getElementById("barra").max = musica.duration;
    document.getElementById("tempoTotal").textContent = formatarTempo(musica.duration);
    console.log('aaaaaaaaaaaaa')
}
function formatarTempo(tempo){
    const minutos = Math.floor(tempo / 60)
     const segundos = Math.floor(tempo % 60)
    return `${minutos}:${segundos.toString().padStart(2, '0')}` 
}
function AtualizarBarra(){
    document.getElementById("barra").value = musica.currentTime;
    document.getElementById("tempoAtual").textContent = formatarTempo(musica.currentTime)
} 
function ModificarBarra(){
    musica.currentTime = document.getElementById("barra").value
}
function AdicionarPlaylist(){
    if(musica.src==""){
        window.alert('nenhuma musica selecionada')
    }
    else if (playlist==0){
        document.getElementById('addplaylist').classList.remove(...["fa-regular", "fa-square-plus", "fa-3x"])
        document.getElementById('addplaylist').classList.add(...["fa-solid", "fa-square-plus", "fa-3x"])
        document.getElementById('popup').style.display = "block"
        playlist = 1
    }
    else if(playlist==1){
        document.getElementById('addplaylist').classList.remove(...["fa-solid", "fa-square-plus", "fa-3x"])
        document.getElementById('addplaylist').classList.add(...["fa-regular", "fa-square-plus", "fa-3x"])
        window.alert('voce removeu essa musica da playlist')
        playlist = 0
    }
}
function SelecionarPlaylist(){
    console.log(`voce selecionou ${this.id}`)
    document.getElementById('popup').style.display="none"
}
function Curtir(){
    if(musica.src==""){
        window.alert('nenhuma musica selecionada')
    }
    else if (curtida==0){
        document.getElementById('coracao').classList.remove(...["fa-regular", "fa-heart", "fa-3x"])
        document.getElementById('coracao').classList.add(...["fa-solid", "fa-heart", "fa-3x"])
        window.alert('voce curtiu essa musica')
        curtida = 1
    }
    else if(curtida==1){
        document.getElementById('coracao').classList.remove(...["fa-solid", "fa-heart", "fa-3x"])
        document.getElementById('coracao').classList.add(...["fa-regular", "fa-heart", "fa-3x"])
        window.alert('voce removeu essa musica das suas curtidas')
        curtida = 0
    }
}
function CarregarMusica(nome){
    let source;
    nome = String(nome)
    
    if(nome == "[object PointerEvent]"){
        if(this.textContent.includes('--')){
            source = path + this.textContent.substring(0, this.textContent.indexOf('--')-1) + ".mp3"
        }
        else{
            source = path + this.textContent + '.mp3'
        }
    }
    else{
        source = path + nome + '.mp3'
    }
    
    console.log(source)
    musica.src = source
    musica.load()
    musica.play().catch(console.log('deu erro fiote'));
}
function DefinirPlaylist(){
    document.getElementById('playlistAtual').innerHTML = ""
    const PlaylistsPossiveis = [playlist1, playlist2, playlist3]
    const posicaoPlaylist = Number(document.getElementById(this.id).textContent[9])-1
    let i = 0;
    PlaylistsPossiveis[posicaoPlaylist].map(DisplayPlaylist)
    for(const musiquinha of musicasFuncionais){
        musiquinha.onclick = CarregarMusica
        
    }
}

for(const musiquinha of musicasFuncionais){
    musiquinha.onclick = CarregarMusica
}

for(const musiquinha of document.getElementsByClassName('recomendacao')){
    musiquinha.onclick = function(){
        CarregarMusica(musiquinha.children[1].textContent)
    }
}

pause.onclick = Pausar
// relacionados ao carregamento da musica
musica.onloadedmetadata = CarregarBarra
musica.ontimeupdate = AtualizarBarra


//controles da musica

//barra de tempo
document.getElementById("barra").oninput = ModificarBarra

//botao de curtida
document.getElementById('curtida').onclick = Curtir

//adicionar à playlist
document.getElementById('playlist').onclick = AdicionarPlaylist
for(let playlists of document.getElementsByClassName('popup')){
    playlists.onclick = SelecionarPlaylist
}


//carregar uma playlist
for(const playlistEscolhida of todasPlaylists){
    playlistEscolhida.onclick = DefinirPlaylist
}


//barra de pesquisa (entender como funciona)
pesquisa.oninput = function(){
    let i = 0;
    if(document.getElementsByClassName('coco').length>0){
        for(const buceta of document.getElementsByClassName('coco')){
            buceta.innerHTML=""
        }
    }
    for(const item of musicasProvisorio){
        if(pesquisa.value == ""){
            for (const tolete of document.getElementsByClassName('coco')){
                tolete.textContent = ""
            }
        }
        else if(item[0].includes(pesquisa.value) || item[1].includes(pesquisa.value) && length){
            const sugestaoMusica = document.createElement('p')
            sugestaoMusica.id = `coco${i}`
            sugestaoMusica.classList="coco"
            sugestaoMusica.innerHTML = `${item[0]}<br>${item[1]}`
            document.getElementById('sugestoes').appendChild(sugestaoMusica)
            console.log(document.getElementById(`coco${i}`).id)
        }
        i++
    }    
}

//notificações
//texto inicial + total de notificações
notificacao.textContent = "clique para ver as notificacoes"
document.getElementById("quantNotificacoes").textContent = `notificacoes: ${listaNotificacao.length}`

//mudar de notificação com click
notificacao.onclick = function(){
    if(listaNotificacao.length==0){
        notificacao.textContent = "sem notificacoes"
    }
    else{
        notificacao.textContent = listaNotificacao[0]
        listaNotificacao.shift()
        document.getElementById("quantNotificacoes").textContent = `notificacoes: ${listaNotificacao.length}`
    }
}

document.getElementById('desconectar').onclick = function(){
    window.location = "/login"
}