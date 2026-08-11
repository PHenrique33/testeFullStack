const path = "../static/musicas/" // é só um texto que serve de prefixo pra criar o caminho até a pasta das musicas

const musica = document.getElementById('musica');
const pauseDiv = document.getElementById('pauseDiv');
const controleBarra = document.getElementById("barra")
const curtidaDiv = document.getElementById('curtidaDiv');
const playlistDiv = document.getElementById('playlistDiv');
const Desconectar = document.getElementById('desconectar');
const pesquisa = document.getElementById('pesquisa');
const notificacao = document.getElementById("not1"); 
const Botao2 = document.getElementById("botao2");
const kezIA = document.getElementById("KezIA"); // servem pra pegar um elemento do HTML


const musicasFuncionais = document.getElementsByClassName('musicasFuncionais');
const todasPlaylists = document.getElementsByClassName('playlist')
const listaRecomendacao = document.getElementsByClassName("recomendacao")
const sugestoes = document.getElementsByClassName('sugestoes') // pega uma lista de todos os elementos de uma classe no HTML

let tocando = 0;
let curtida = 0;
let playlist = 0; //só pra saber se ta tocando//salva nos curtidos//salva na playlist e mudar a aparencia

const listaNotificacao = ['mensagem 1', ' notificacao comicamente grande pra ver se cabe na barrinha de notificacao oi olá', 'mensagem 3']

const musicasProvisorio = [];
const playlist0 = [];
const playlist1 = [];
const playlist2 = [];
const playlist3 = []; //todas as playlists, playlist 0 é as musicas curtidas
const playlists = [playlist0, playlist1, playlist2, playlist3] //lista de todas as playlists, diferentes do TodasPlaylists





function AtualizarRecomendacao(){
    for(const recomendacao of listaRecomendacao){
        const aleatorio = Math.floor(Math.random()*38)
        console.log(aleatorio)
        console.log(musicasProvisorio)
        console.log(recomendacao)
        recomendacao.children[0].children[0].src = musicasProvisorio[aleatorio][2]
        recomendacao.children[1].innerHTML = musicasProvisorio[aleatorio][0]
        recomendacao.children[2].innerHTML = musicasProvisorio[aleatorio][1]
        console.log(recomendacao)
    }
} // toda vez que roda, as recomendações mudam, mas por hora, elas funcionam de forma aleatoria


function AtualizarBiblioteca(){
    document.getElementById("musica-3").textContent = document.getElementById("musica-2").textContent
    document.getElementById("musica-2").textContent = document.getElementById("musica-1").textContent
    document.getElementById("musica-1").textContent = document.getElementById("nomedamusica").textContent
} //ao escolher uma musica nova pra tocar, a biblioteca pula uma musica

function ChamarIA(){
    const musica = document.getElementById('nomedamusica').textContent
    const artista = document.getElementById('nomedoartista').textContent
    document.getElementById("texto").textContent = "pesquisando..."
    fetch("/gerarSignificado", {
        method: "POST",
        
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            musica: musica,
            artista: artista
        })
    })
    .then(resposta => resposta.json())
    .then(dados => {
        document.getElementById("texto").textContent = `${dados.significado}`
    })

    
}

for(const musiquinha of document.getElementsByClassName("historico")){
    musiquinha.onclick = function(){
        const cantor = new Map(musicasProvisorio).get(musiquinha.textContent)
        console.log(musiquinha.textContent)
        console.log(cantor)
        CarregarMusica(musiquinha.textContent)
        
    }
} //ao clicar numa musica da biblioteca, procura oo nome do cantor e começa a tocar

for(const musiquinha of listaRecomendacao){
    musiquinha.onclick = function(){
        CarregarMusica(musiquinha.children[1].textContent)  
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


function MusicasProvisorias(){
    fetch("/musicasProvisorias")
    .then(resposta => resposta.json())
    .then(dados => {
        
        for(const musiquinhas of dados){
            const listinha = [musiquinhas[1], musiquinhas[2], musiquinhas[3]]
            musicasProvisorio.push(listinha)
            console.log(listinha)
        }
        console.log(musicasProvisorio)
    })
    .then(AtualizarRecomendacao)
    .then(AtualizarPlaylist)
}


function AtualizarPlaylist(){
    fetch("/AtualizarPlaylist")
    .then(resposta => resposta.json())
    .then(dados => {
        console.log(dados)
        playlist0.length = 0
        playlist1.length = 0
        playlist2.length = 0
        playlist3.length = 0
        console.log(dados)
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
    .then(DefinirPlaylist())
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

function RemoverPlaylist(){
    console.log('eu tenho muito amor a vida')
    fetch("/RemoverMusica", {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            remover:document.getElementById("nomedamusica").textContent
        })
    })
    .then(AtualizarPlaylist())
}

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
        for(const playlist of playlists){
            for(const coisas of playlist){
                console.log(coisas)
                if(coisas[0].includes(document.getElementById("nomedamusica").textContent)){
                    RemoverPlaylist()
                    console.log('abcdefg')
                }
            }
        }
        playlist = 0
    }
} // modifica a figura de playlist (selecionado ou removido) e mostra as opções para guardar a playlist

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
    
    
} // ao selecionar uma das playlists do pop-up, manda um fetch pro python e chama o Atualizar playlist

function DefinirPlaylist(){
    document.getElementById('playlistAtual').innerHTML = ""
    const posicaoPlaylist = Number(this.id[8])
    console.log((this.id[8]))
    playlists[posicaoPlaylist].map(DisplayPlaylist)
    for(const musiquinha of musicasFuncionais){
        musiquinha.onclick = CarregarMusica        
    }
    console.log(playlist1)
} // chama a função DisplayPlaylist e faz com que cada musica seja clicavel 




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
    else if(curtida==1){
        botaoCurtida.classList.remove("fa-solid")
        botaoCurtida.classList.add("fa-regular")
        window.alert('voce removeu essa musica das suas curtidas')
        for(const playlist of playlists){
            for(const coisas of playlist){
                console.log(coisas)
                if(coisas[0].includes(document.getElementById("nomedamusica").textContent)){
                    RemoverPlaylist()
                    console.log('abcdefg')
                }
            }
        }
        curtida = 0
    }
} // salva musica na playlist 0, vulgo, musicas curtidas


function CarregarMusica(nome){
    let source;
    nome = String(nome)
    
    if(nome == "[object PointerEvent]"){
        console.log(nome)
        if(this.textContent.includes('--')){
            nome = document.getElementById("nomedamusica").innerHTML = this.textContent.substring(0, this.textContent.indexOf('--')-1)
            
            source = path + nome + ".mp3"
            const resultado = musicasProvisorio.find(lista => lista[0] === nome);
            document.getElementById("nomedamusica").textContent = nome
            document.getElementById("nomedoartista").textContent = resultado[1]
            document.getElementById("IMGrecomendacao0").src = resultado[2]
        }
        // else{
        //     console.log('2')
        //     console.log(nome)
        //     source = path + this.textContent + '.mp3'
        //     document.getElementById("nomedamusica").innerHTML = this.textContent
        // }
    }
    else{
        source = path + nome + '.mp3'
        const resultado = musicasProvisorio.find(lista => lista[0] === nome);
        document.getElementById("nomedamusica").textContent = nome
        document.getElementById("nomedoartista").textContent = resultado[1]
        document.getElementById("IMGrecomendacao0").src = resultado[2]
        console.log(resultado)
        console.log(resultado[2])
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
        } // toda vez que o input mudar, isso deleta tudo que tava, pra evitar repetição 
    }
    for(const item of musicasProvisorio){
        if(pesquisa.value == ""){
            for (const musiquinha of document.getElementsByClassName('sugestaoMusica')){
                musiquinha.textContent = ""
            }
        } // se o input for vazio, retorna nada (pra evitar que cconsidere que tem vazio em todas as 
          // musicas e print todas quando não precisa)

        else if(item[0].includes(pesquisa.value) || item[1].includes(pesquisa.value)){
            const sugestaoMusica = document.createElement('p')
            sugestaoMusica.id = `sugestaoMusica${i}`
            sugestaoMusica.classList="sugestaoMusica"
            sugestaoMusica.innerHTML = `${item[0]}<br>${item[1]}`
            document.getElementById('sugestoes').appendChild(sugestaoMusica)
            console.log(document.getElementById(`sugestaoMusica${i}`).id)
        } // se o o nome da musica ou artista tem o input da barra de pesquisa, mostra nas sugestoes

        for(const Sugestao of document.getElementsByClassName('sugestaoMusica')){
            Sugestao.onclick = function(){
                const argumentoMusica = Sugestao.innerHTML.substring(0, Sugestao.innerHTML.indexOf("<br>"))
                CarregarMusica(argumentoMusica)
                pesquisa.value = "" 
                for(const musiquinha of document.getElementsByClassName('sugestaoMusica')){
                    musiquinha.innerHTML=""
                }
            }
        } // pra cada musica das sugestões, ao clicar puxa a musica e zera a barra de pesquisa

        i++ // esse indice serve pra criar um ID diferente pra cada musica
    }    
} // o resumo foi feito dentro da função, tem coisa pra caralho

function formatarTempo(tempo){
    const minutos = Math.floor(tempo / 60)
     const segundos = Math.floor(tempo % 60)
    return `${minutos}:${segundos.toString().padStart(2, '0')}` 
} // pega o tempo da musica (duration) e formata no modo mm:ss

function CarregarBarra(){
    document.getElementById("barra").max = musica.duration;
    document.getElementById("tempoTotal").textContent = formatarTempo(musica.duration);
    ZerarCurtida()
    ZerarPlaylist()
    AtualizarBiblioteca()
    AtualizarRecomendacao()
} // atualiza o maximo da barra pra ser igual ao tempo da musica e formata o tempo que aparece embaixo 

function AtualizarBarra(){
    document.getElementById("barra").value = musica.currentTime;
    document.getElementById("tempoAtual").textContent = formatarTempo(musica.currentTime)
} // a cada segundo, avança o tempo da barra 
function ModificarBarra(){
    console.log(musica)
    musica.currentTime = document.getElementById("barra").value
} // ao clicar em algum lugar na barra, muda o tempo da musica pro valor respectivo

MusicasProvisorias()
 // atualiza as playlists e as musicas nas recomendações assim que abre o app



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
} // ao clicar em uma das playlists no pop-up, chama o SelecionarPlaylist nessa playlist


//carregar uma playlist
for(const playlistEscolhida of todasPlaylists){
    playlistEscolhida.onclick = DefinirPlaylist
} // ao clicar em uma das playlists no menu, mostra as musicas da playlist em questão


//barra de pesquisa (entender como funciona)

pesquisa.oninput = pesquisar // quando o input na barra de pesquisa muda, chama a função
document.getElementById("botao2").onclick = ChamarIA


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
} // se não tiver notificações, quando clicar retorna "sem notificações", do contrario, retorna a notificacao

Desconectar.onclick = function(){
    window.location = "/login"
} // ao apertar o botao de desconectar, muda o site pra login