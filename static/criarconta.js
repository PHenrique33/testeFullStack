const contaCriada = document.createElement('p')

document.getElementById('botao').onclick = function(){
    const Login = document.getElementById('login').value
    const Senha = document.getElementById('senha').value
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
    .then((resposta) => {
        return resposta.json();
    })
    .then((dados) => {
        if(dados.CriarConta === "valido"){
            window.location = "/login"
        }
        else{
            window.alert('campo invalido ou nome já existente, tente novamente')
        }
    });
}
document.getElementById('possuoConta').onclick = function(){
    window.location = "/login"
}