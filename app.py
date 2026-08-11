from flask import Flask, request, render_template, jsonify, redirect, url_for
import sqlite3
from BancoDados import *
from KezIA import gerar_significado

StartSQLite3()
app = Flask(__name__)
usuarioAtivo = ""

@app.route('/')
def inicio():
    return redirect(url_for('login'))

@app.route("/criarconta")
def criarconta():
    return render_template("criarconta.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/ueplaylist")
def ueplaylist():
    if usuarioAtivo=="":
        return inicio()
    else:
        return render_template("ueplaylist.html")

@app.route("/criadorconta", methods = ["POST"])
def criadorconta():
    conexao = sqlite3.connect('app.db')
    cursor = conexao.cursor()
    Json = request.get_json()
    txtLogin = Json['login']
    txtSenha = Json['senha']
    usuarioexistente = cursor.execute("SELECT * FROM login WHERE nome = ?",(txtLogin,)).fetchall()
    if txtSenha == "" or txtLogin == "":
        return jsonify({
            "CriarConta": "invalido, nome ou senha vazio"
        })
    elif usuarioexistente != []:
        return jsonify({
            "CriarConta": "invalido, nome de usuario ja existe"
        })
    else:
        salvarLogin(txtLogin, txtSenha)
        return jsonify({
            'CriarConta': "valido",
            'Login': txtLogin, 
            'Senha': txtSenha
    })

@app.route("/checarlogin", methods = ["POST"]) 
def checarlogin():
    Json = request.get_json()
    txtLogin = Json['login']
    txtSenha = Json['senha']
    conexao = sqlite3.connect('app.db')
    cursor = conexao.cursor()
    usuario = cursor.execute("SELECT * FROM login WHERE nome = ?",(txtLogin,)).fetchone()

    if usuario == None:
        return jsonify({"resposta":"invalido"})
    elif txtSenha==usuario[2]:
        global usuarioAtivo
        usuarioAtivo = txtLogin
        cursor.execute(f''' CREATE TABLE IF NOT EXISTS {txtLogin} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                playlist INTEGER NOT NULL,
                musica TEXT NOT NULL,
                artista TEXT NOT NULL,
                caminho TEXT NOT NULL)''')
        return jsonify({"resposta":"valido"})
    else:
        return jsonify({"resposta":"invalido"})
    
@app.route("/adicionarPlaylist", methods = ["POST"])
def adicionarPlaylist():
    conexao = sqlite3.connect('app.db')
    cursor = conexao.cursor()
    Json = request.get_json()
    playlist = Json['playlist']
    musica = Json['musica']
    artista = Json['artista']
    caminho = Json['caminho']
    check = cursor.execute(f"SELECT * FROM {usuarioAtivo} WHERE musica = ?",(musica,)).fetchone()
    if check == None:
        salvarPlaylist(playlist, musica, artista, caminho, usuarioAtivo)
        return jsonify(
            {"resposta": "Playlist adicionada com sucesso"},
            {"playlist": playlist})
    else:
        
        return jsonify(
            {"resposta": "0"})

@app.route("/AtualizarPlaylist")
def AtualizarPlaylist():
    conexao = sqlite3.connect('app.db')
    cursor = conexao.cursor()
    cursor.execute(f"SELECT * FROM {usuarioAtivo}")
    musicas = cursor.fetchall()
    print(musicas)
    return(musicas)

@app.route("/gerarSignificado", methods = ["POST"])
def chamarIA(): 
    Json = request.get_json()
    significado = gerar_significado(Json)
    return jsonify(
        {"significado": significado})

@app.route("/musicasProvisorias")
def musicasProvisorias():
    conexao = sqlite3.connect('app.db')
    cursor = conexao.cursor()
    cursor.execute(f"SELECT * FROM musicas")
    musicas = cursor.fetchall()
    print(musicas)
    return(musicas)

@app.route("/RemoverMusica", methods = ["POST"])
def RemoverMusica():
    Json = request.get_json()
    print(Json)
    print('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB')
    RemoverPlaylist(usuarioAtivo, Json)
    print(Json)
    return(Json)
    
    

if __name__ == "__main__":
    app.run(debug=True)