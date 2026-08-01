let coco;

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
    })
    .then(resposta => resposta.json())
    .then(dados =>{
        console.log(dados)
        if(dados.resposta=="valido"){
            window.location = "/ueplaylist"
        }
        else{
            document.getElementById('erro').textContent = "Login errado, tente novamente"
        }
    })
}
document.getElementById('criarConta').onclick = function(){
    window.location = "/criarconta"
}