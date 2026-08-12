from flask import Flask, request, render_template, jsonify, redirect, url_for
import sqlite3
from BancoDados import *
from KezIA import gerar_significado

StartSQLite3()
app = Flask(__name__)
usuarioAtivo = ""

@app.route("/")
def inicio():
    return redirect(url_for("login"))

@app.route("/criarconta")
def criarconta():
    return render_template("criarconta.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/ueplaylist")
def ueplaylist():

    # 1°: 
    # if not usuarioAtivo, que é a mesma coisa que if usuarioAtivo == "", apenas uma forma mais legível de escrever a condição.
    # tirei o else, pois se o if for verdadeiro, a função já retorna e não precisa de um else.
    
    if not usuarioAtivo:
        return inicio()
    return render_template("ueplaylist.html")

@app.route("/criadorconta", methods=["POST"])
def criadorconta():
    conexao = sqlite3.connect("app.db")
    cursor = conexao.cursor()
    Json = request.get_json()
    txtLogin = Json["login"]
    txtSenha = Json["senha"]

    # 2°:
    # Usei fetchone() ao invés de fetchall() para verificar se o usuário já existe, pois só precisamos saber se existe pelo menos um registro, não todos os registros.
    
    usuarioexistente = cursor.execute(
        "SELECT * FROM login WHERE nome = ?",
        (txtLogin,)
    ).fetchone()

    # if not txtSenha or not txtLogin: é uma forma mais legível de verificar se as strings estão vazias. Mesma lógica da anterior, já que usuarioAtivo == "" retorna falso, é a mesma coisa.
    
    if not txtSenha or not txtLogin:
        return jsonify({
            "CriarConta": "invalido, nome ou senha vazio"
        })

    # elif usuarioexistente != [] foi substituído por if usuarioexistente, que é mais legível e direto, já que fetchone() retorna None se não houver resultados.
    
    if usuarioexistente:
        return jsonify({
            "CriarConta": "invalido, nome de usuario ja existe"
        })

    # else removido, pois se o if anterior for verdadeiro, a função já retorna e não precisa de um else.
    
    salvarLogin(txtLogin, txtSenha) 
    return jsonify({
        "CriarConta": "valido",
        "Login": txtLogin,
        "Senha": txtSenha
    })


@app.route("/checarlogin", methods=["POST"])
def checarlogin():

    # 3°:
    # Adicionei global usuarioAtivo no início da função para garantir que estamos modificando a variável global e não criando uma nova variável local com o mesmo nome. 
    # Isso é importante para manter o estado do usuário ativo entre as requisições.
    
    global usuarioAtivo

    Json = request.get_json()
    txtLogin = Json["login"]
    txtSenha = Json["senha"]

    conexao = sqlite3.connect("app.db")
    cursor = conexao.cursor()

    usuario = cursor.execute(
        "SELECT * FROM login WHERE nome = ?",
        (txtLogin,)
    ).fetchone()

    # if usuario == None foi substituído por if not usuario:, que é mais legível e direto, já que fetchone() retorna None se não houver resultados.

    if not usuario:
        return jsonify({"resposta": "invalido"})

    # if txtSenha == usuario[2] foi substituído por if txtSenha != usuario[2]: para simplificar a lógica. Se a senha não corresponder, retornamos "invalido". Caso contrário, continuamos com o fluxo normal.
    
    if txtSenha != usuario[2]:
        return jsonify({"resposta": "invalido"})

    usuarioAtivo = txtLogin

    cursor.execute(f"""
        CREATE TABLE IF NOT EXISTS {txtLogin} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            playlist INTEGER NOT NULL,
            musica TEXT NOT NULL,
            artista TEXT NOT NULL,
            caminho TEXT NOT NULL
        )
    """)

    # apenas 1 return jsonify({"resposta": "valido"}) no final da função, pois se a senha estiver correta, retornamos "valido". Se não estiver, já retornamos "invalido" anteriormente.
   
    return jsonify({"resposta": "valido"})


@app.route("/adicionarPlaylist", methods=["POST"])
def adicionarPlaylist():
    conexao = sqlite3.connect("app.db")
    cursor = conexao.cursor()

    Json = request.get_json()
    playlist = Json["playlist"]
    musica = Json["musica"]
    artista = Json["artista"]
    caminho = Json["caminho"]

    check = cursor.execute(
        f"SELECT * FROM {usuarioAtivo} WHERE musica = ?",
        (musica,)
    ).fetchone()

    # 4°:
    # if check == None foi substituído por if check:, já que fetchone() retorna None se não houver resultados.
    
    if check:
        return jsonify({"resposta": "0"})

    salvarPlaylist(
        playlist,
        musica,
        artista,
        caminho,
        usuarioAtivo
    )

    # else removido, pois se o if anterior for verdadeiro, a função já retorna e não precisa de um else.
    
    return jsonify({
        "resposta": "Playlist adicionada com sucesso",
        "playlist": playlist
    })


@app.route("/AtualizarPlaylist")
def AtualizarPlaylist():
    conexao = sqlite3.connect("app.db")
    cursor = conexao.cursor()

    # 5°:
    # cursor.execute não existe mais, colocando a função dele dentro de musicas = cursor.execute(f"SELECT * FROM {usuarioAtivo}").fetchall() para simplificar o código e evitar uma linha desnecessária.
    
    musicas = cursor.execute(
        f"SELECT * FROM {usuarioAtivo}"
    ).fetchall()

    # return (musicas) e musicas é a mesma coisa, então apenas return musicas é suficiente.
    return musicas


@app.route("/gerarSignificado", methods=["POST"])
def chamarIA():
    Json = request.get_json()
    significado = gerar_significado(Json)

    return jsonify({
        "significado": significado
    })


@app.route("/musicasProvisorias")
def musicasProvisorias():
    conexao = sqlite3.connect("app.db")
    cursor = conexao.cursor()

    # 6°:
    # mesma coisa do bloco anterior, colocando o cursor.execute dentro de musicas
    
    musicas = cursor.execute(
        "SELECT * FROM musicas"
     ).fetchall()

    # print(musicas) não era necessário
    
    return musicas


@app.route("/RemoverMusica", methods=["POST"])
def RemoverMusica():
    Json = request.get_json()

    RemoverPlaylist(usuarioAtivo, Json)

    return Json

    # 7°:
    # só tirei os prints desnecessários.

if __name__ == "__main__":
    app.run(debug=True)
