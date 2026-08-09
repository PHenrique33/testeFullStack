document.getElementById('botao').onclick = function(){
    const Login = document.getElementById('login').value
    const Password = document.getElementById('password').value
    fetch("/checarlogin", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            login:Login,
            senha:Password
        })
    }) // isso vai fazer um pedido pro python, enviando o login e senha e retorna valido ou invalid
    .then(resposta => resposta.json())
    .then(dados =>{
        console.log(dados)
        if(dados.resposta=="valido"){
            window.location = "/ueplaylist"
        } // se for valido, transporta o usuario pra ueplaylist
        else{
            document.getElementById('erro').textContent = "Login errado, tente novamente"
        } // se for invalido, pede pro usuario tentar novamente
    })
}
document.getElementById('criarConta').onclick = function(){
    window.location = "/criarconta"
} //ao clicar na opção criar conta, te leva pro criar conta