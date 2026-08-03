const contaCriada = document.createElement('p')

document.getElementById('botao').onclick = function(){
    const Login = document.getElementById('login').value
    const Senha = document.getElementById('senha').value
    console.log(Login, Senha)
    fetch("/criadorconta",{
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
          login: Login,
          senha: Senha  
        }) 
    })
    .then(
        contaCriada.innerHTML = "redirecionando para login...",
        document.getElementById('container').appendChild(contaCriada)
    )
    .then(resposta => resposta.json())
    .then(
        window.location = "/login"
    )
}
document.getElementById('possuoConta').onclick = function(){
    window.location = "/login"
}