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
    .then(resposta => resposta.json())
    .then(dados =>{
        console.log(dados)
    })
}
document.getElementById('possuoConta').onclick = function(){
    window.location = "/login"
}