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
        })  // envia o texto do login e senha pro python e espera um retorno
    })
    .then((resposta) => resposta.json())
    .then((dados) => {
        if(dados.CriarConta === "valido"){
            window.location = "/login"
        } // se o dado for valido (não for nulo e não river outra conta com esse nome), transporta pra login
          // e salva os dados de login do usuario
        else{
            window.alert('campo invalido ou nome já existente, tente novamente')
        } // se os dados forem invalidos, pede pra tentar novamente
    });
}
document.getElementById('possuoConta').onclick = function(){
    window.location = "/login"
} // se clicar no possuo conta, leva pro login