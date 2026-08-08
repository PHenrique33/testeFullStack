const path = "../static/musicas/"

const musica = document.getElementById('musica');
const pauseDiv = document.getElementById('pauseDiv');
const controleBarra = document.getElementById("barra")
const curtidaDiv = document.getElementById('curtidaDiv');
const playlistDiv = document.getElementById('playlistDiv');
const Desconectar = document.getElementById('desconectar');
const pesquisa = document.getElementById('pesquisa');
const notificacao = document.getElementById("not1")




const musicasFuncionais = document.getElementsByClassName('musicasFuncionais');
const todasPlaylists = document.getElementsByClassName('playlist')
const sugestoes = document.getElementsByClassName('sugestoes')

let tocando = 0;
let curtida = 0;
let playlist = 0;

const listaNotificacao = ['mensagem 1', ' notificacao comicamente grande pra ver se cabe na barrinha de notificacao oi olá', 'mensagem 3']
const listaRecomendacao = document.getElementsByClassName("recomendacao")
const musicasProvisorio = [
    ["aguas de março", "elis regina & tom jobim"],
    ["tocando em frente", "almir sater & renato teixeira"],
    ["como nossos pais", "elis regina"],
    ["o leaozinho", "caetano veloso"],
    ["anunciaçao", "alceu valença"],
    ["palco", "gilberto gil"],
    ["sina", "djavan"],
    ["partido alto", "chico buarque"],

    ["tempo perdido", "legião urbana"],
    ["pro dia nascer feliz", "barão vermelho"],
    ["primeiros erros", "capital inicial"],
    ["anna julia", "los hermanos"],
    ["dias de luta, dias de gloria", "charlie brown jr."],
    ["malandragem", "cássia eller"],
    ["pais e filhos", "legião urbana"],
    ["metamorfose ambulante", "raul seixas"],

    ["evidencias", "chitãozinho & xororó"],
    ["fio de cabelo", "chitãozinho & xororó"],
    ["boate azul", "joaquim & manuel"],
    ["romaria", "renato teixeira"],
    ["infiel", "marília mendonça"],
    ["trevo (tu)", "anavitória & tiago iorc"],

    ["cheia de manias", "raça negra"],
    ["depois do prazer", "só pra contrariar"],
    ["telegrama", "exaltasamba"],
    ["livre pra voar", "art popular"],
    ["temporal", "ferrugem"],
    ["aquarela brasileira", "martinho da vila"],
    ["trem das onze", "demônios da garoa"],
    ["não deixe o samba morrer", "alcione"],
    ["vou festejar", "beth carvalho"],
    ["o show tem que continuar", "fundo de quintal"],

    ["diário de um detento", "racionais mc's"],
    ["vida loka, pt. 2", "racionais mc's"],
    ["hoje cedo", "emicida"],
    ["levanta e anda", "emicida"],
    ["sulicídio", "baco exu do blues & diomedes chinaski"]
];

const playlist0 = [];
const playlist1 = [];
const playlist2 = [];
const playlist3 = []; 
const playlists = [playlist0, playlist1, playlist2, playlist3]
console.log(playlists)
console.log(todasPlaylists)




function AtualizarRecomendacao(){
    for(const recomendacao of listaRecomendacao){
        const aleatorio = Math.floor(Math.random()*36)
        console.log(aleatorio)
        recomendacao.children[1].innerHTML = musicasProvisorio[aleatorio][0]
        recomendacao.children[2].innerHTML = musicasProvisorio[aleatorio][1]
        console.log(recomendacao)
    }
}


function AtualizarBiblioteca(){
    document.getElementById("musica-3").textContent = document.getElementById("musica-2").textContent
    document.getElementById("musica-2").textContent = document.getElementById("musica-1").textContent
    document.getElementById("musica-1").textContent = document.getElementById("nomedamusica").textContent
} //ao escolher uma musica nova pra tocar, a biblioteca pula uma musica

for(const musiquinha of document.getElementsByClassName("historico")){
    musiquinha.onclick = function(){
        const cantor = new Map(musicasProvisorio).get(musiquinha.textContent)
        console.log(musiquinha.textContent)
        console.log(cantor)
        CarregarMusica(musiquinha.textContent, cantor)
        
    }
} //ao clicar numa musica da biblioteca, procura oo nome do cantor e começa a tocar

for(const musiquinha of listaRecomendacao){
    musiquinha.onclick = function(){
        CarregarMusica(musiquinha.children[1].textContent, musiquinha.children[2].textContent)  
    }
} //ao clicar numa musica das recomendações, começa a tocar



function Pausar(){
    const botaoPause = document.getElementById("botaoPause");
    if(tocando == 1){
        musica.pause()
        tocando = 0
        botaoPause.classList.remove("fa-pause")
        botaoPause.classList.add("fa-play");    
    }
    else if(tocando == 0){
        musica.play()
        tocando = 1
        botaoPause.classList.remove("fa-play");
        botaoPause.classList.add("fa-pause")
    }
} //pausa (ou despausa) e modifica a figura (figura de pausado ou o triangulo)



function AtualizarPlaylist(){
    fetch("/AtualizarPlaylist")
    .then(resposta => resposta.json())
    .then(dados => {
        for(item of dados){
            console.log(item)
            const conjunto = [item[2], item[3]]
            switch(item[1]){
                case 0:
                    playlist0.unshift(conjunto)
                    break
                case 1:
                    playlist1.unshift(conjunto)
                    break
                case 2:
                    playlist2.unshift(conjunto)
                    break
                case 3:
                    playlist3.unshift(conjunto)
                    break
            }
        }
        console.log(playlist0)
        console.log(playlist1)
        console.log(playlist2)
        console.log(playlist3)
    })
} //atualiza as musicas nas 3 listas de playlists

function ZerarPlaylist(){
    const botaoPlaylist = document.getElementById("botaoPlaylist") 
    botaoPlaylist.classList.add("fa-regular")
    playlist = 0
} // ao iniciar uma musica, retorna a figura de playlst ao padrão

function DisplayPlaylist(musica){
    let i = 0
    const songs = document.createElement('p')
    songs.innerHTML = `${musica[0]} <br>-- ${musica[1]}`
    songs.className = "songs musicasFuncionais"
    songs.id = `songPlaylist${i}`
    document.getElementById('playlistAtual').appendChild(songs)
    i++
    
} // adiciona ao html as musicas da playlist selecionada

function AdicionarPlaylist(){
    const botaoPlaylist = document.getElementById("botaoPlaylist")
    if(musica.src==""){
        window.alert('nenhuma musica selecionada')
    }
    else if (playlist==0){
        botaoPlaylist.classList.remove("fa-regular")
        botaoPlaylist.classList.add("fa-solid")
        document.getElementById('popup').style.display = "block"
        playlist = 1
    }
    else if(playlist==1){
        botaoPlaylist.classList.remove("fa-solid")
        botaoPlaylist.classList.add("fa-regular")
        window.alert('voce removeu essa musica da playlist')
        playlist = 0
    }
} //modifica a figura de playlist (selecionado ou removido) e mostra as opções para guardar a playlist

function SelecionarPlaylist(){
    console.log(`${this.id[13]}`)
    fetch("/adicionarPlaylist",{
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            playlist: `${this.id[13]}`,
            musica: document.getElementById('nomedamusica').textContent,
            artista: document.getElementById('nomedoartista').textContent,
            caminho: path + document.getElementById('nomedamusica').textContent + ".mp3"
        })
    })
    .then(document.getElementById('popup').style.display="none")
    .then(resposta => resposta.json())
    .then(dados => {
        if (dados.resposta == 0) {
            window.alert('musica ja esta em uma playlist')
        }
        else {
            AtualizarPlaylist()
        }
    })
    
    
}

function DefinirPlaylist(){
    document.getElementById('playlistAtual').innerHTML = ""
    const posicaoPlaylist = Number(this.id[8])
    console.log((this.id[8]))
    playlists[posicaoPlaylist].map(DisplayPlaylist)
    for(const musiquinha of musicasFuncionais){
        musiquinha.onclick = CarregarMusica        
    }
}




function ZerarCurtida(){   
    const botaoCurtida = document.getElementById('botaoCurtida')
    botaoCurtida.classList.add("fa-regular")
    curtida = 0
} // ao iniciar uma musica, retorna a figura de curtida ao padrão
function Curtir(){
    const botaoCurtida = document.getElementById("botaoCurtida")
    if(musica.src==""){
        window.alert('nenhuma musica selecionada')
    }
    else if (curtida==0){
        curtida = 1
        botaoCurtida.classList.remove("fa-regular")
        botaoCurtida.classList.add("fa-solid")
        fetch("/adicionarPlaylist",{
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            playlist: `0`,
            musica: document.getElementById('nomedamusica').textContent,
            artista: document.getElementById('nomedoartista').textContent,
            caminho: path + document.getElementById('nomedamusica').textContent + ".mp3"
        })
    })
    .then(resposta => resposta.json())
    .then(dados => {
        if (dados.resposta == 0) {
            window.alert('musica ja esta em uma playlist')
        }
        else {
            window.alert('voce curtiu essa musica')
            AtualizarPlaylist
        }
    })
    }
    else if(curtida==1){
        botaoCurtida.classList.remove("fa-solid")
        botaoCurtida.classList.add("fa-regular")
        window.alert('voce removeu essa musica das suas curtidas')
        curtida = 0
    }
}


function CarregarMusica(nome, artista=undefined){
    let source;
    console.log(artista)
    nome = String(nome)
    
    if(nome == "[object PointerEvent]"){
        if(this.textContent.includes('--')){
            source = path + this.textContent.substring(0, this.textContent.indexOf('--')-1) + ".mp3"
            document.getElementById("nomedamusica").innerHTML = this.textContent.substring(0, this.textContent.indexOf('--')-1)
            document.getElementById("nomedoartista").innerHTML = this.textContent.substring(this.textContent.indexOf('--')+3, this.textContent.length)
        }
        else{
            source = path + this.textContent + '.mp3'
            document.getElementById("nomedamusica").innerHTML = this.textContent
            console.log(this.textContent + "aaaaaaaa")
        }
    }
    else{
        source = path + nome + '.mp3'
        document.getElementById("nomedamusica").innerHTML = nome
        document.getElementById("nomedoartista").innerHTML = artista
    }

    console.log(source)
    musica.src = source
    musica.load()
    musica.play()
    AtualizarBarra
}
function pesquisar(){
    let i = 0;
    if(document.getElementsByClassName('sugestaoMusica').length>0){
        for(const musiquinha of document.getElementsByClassName('sugestaoMusica')){
            musiquinha.innerHTML=""
        }
    }
    for(const item of musicasProvisorio){
        if(pesquisa.value == ""){
            for (const musiquinha of document.getElementsByClassName('sugestaoMusica')){
                musiquinha.textContent = ""
            }
        }
        else if(item[0].includes(pesquisa.value) || item[1].includes(pesquisa.value)){
            const sugestaoMusica = document.createElement('p')
            sugestaoMusica.id = `sugestaoMusica${i}`
            sugestaoMusica.classList="sugestaoMusica"
            sugestaoMusica.innerHTML = `${item[0]}<br>${item[1]}`
            document.getElementById('sugestoes').appendChild(sugestaoMusica)
            console.log(document.getElementById(`sugestaoMusica${i}`).id)
        }
        for(const Sugestao of document.getElementsByClassName('sugestaoMusica')){
            Sugestao.onclick = function(){
                const argumento = Sugestao.innerHTML.substring(0, Sugestao.innerHTML.indexOf("<br>"))
                const argumentoArtista = Sugestao.innerHTML.substring(Sugestao.innerHTML.indexOf("<br>")+4, Sugestao.length)
                CarregarMusica(argumento, argumentoArtista)
                for(const musiquinha of document.getElementsByClassName('sugestaoMusica')){
                    musiquinha.innerHTML=""
                }
            }
        }
        i++
    }    
}

function formatarTempo(tempo){
    const minutos = Math.floor(tempo / 60)
     const segundos = Math.floor(tempo % 60)
    return `${minutos}:${segundos.toString().padStart(2, '0')}` 
}
function CarregarBarra(){
    document.getElementById("barra").max = musica.duration;
    document.getElementById("tempoTotal").textContent = formatarTempo(musica.duration);
    ZerarCurtida()
    ZerarPlaylist()
    AtualizarBiblioteca()
    AtualizarRecomendacao()
}
function AtualizarBarra(){
    document.getElementById("barra").value = musica.currentTime;
    document.getElementById("tempoAtual").textContent = formatarTempo(musica.currentTime)
} 
function ModificarBarra(){
    musica.currentTime = document.getElementById("barra").value
}

AtualizarPlaylist()
AtualizarRecomendacao()



pauseDiv.onclick = Pausar //clicar no botao

// relacionados ao carregamento da musica

musica.onloadedmetadata = CarregarBarra //quando a musica carregar no site, vai carregar a barra (duração total)
musica.ontimeupdate = AtualizarBarra //toda vez que a musica passar, o tempo atualiza (passa os segundos)


//controles da musica

controleBarra.oninput = ModificarBarra //clicar na barra em alguma posição muda o tempo da musica

curtidaDiv.onclick = Curtir //ao clicar no botão de curtida, salva na playlist curtidas 
playlistDiv.onclick = AdicionarPlaylist //ao clicar no botão de playlist, abre opções de playlist 


for(let playlists of document.getElementsByClassName('popup')){
    playlists.onclick = SelecionarPlaylist
}


//carregar uma playlist
for(const playlistEscolhida of todasPlaylists){
    playlistEscolhida.onclick = DefinirPlaylist
}


//barra de pesquisa (entender como funciona)
pesquisa.oninput = pesquisar

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

Desconectar.onclick = function(){
    window.location = "/login"
}