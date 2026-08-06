from flask import Flask, request, render_template, jsonify, redirect, url_for
import sqlite3


def StartSQLite3():
    conexao = sqlite3.connect('app.db')
    cursor = conexao.cursor()
    cursor.execute(''' CREATE TABLE IF NOT EXISTS login (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                senha TEXT NOT NULL)''')
    
    cursor.execute(''' CREATE TABLE IF NOT EXISTS musicas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                artista TEXT NOT NULL,
                caminho TEXT NOT NULL)''')
    
def salvarLogin(nome, senha):
    # StartSQLite3()
    conexao = sqlite3.connect('app.db')
    cursor = conexao.cursor()
    cursor.execute('''INSERT INTO login (nome, senha)
                   VALUES (?, ?)''', (nome, senha))
    conexao.commit()

StartSQLite3()
app = Flask(__name__)

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
    print(usuario)
    if usuario == None:
        return jsonify({"resposta":"invalido"})
    elif txtSenha==usuario[2]:
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
    Json = request.get_json()
    playlist = Json['playlist']
    musica = Json['musica']
    artista = Json['artista']
    caminho = Json['caminho']
    return jsonify({"resposta":"Playlist adicionada com sucesso"})
    # criar função pra criar playlist e salvar o nome do login para passar pra UEPlaylists

if __name__ == "__main__":
    app.run(debug=True)