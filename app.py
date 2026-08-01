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

    cursor.execute('''CREATE TABLE IF NOT EXISTS playlist1 (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                artista TEXT NOT NULL,
                caminho TEXT NOT NULL)''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS playlist2 (
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

app = Flask(__name__)

@app.route('/')
def inicio():
    return redirect(url_for('criarconta'))

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
    Json = request.get_json()
    txtLogin = Json['login']
    txtSenha = Json['senha']
    if txtSenha == "" or txtLogin == "":
        return jsonify({
            "Criar conta": "invaliddo"
        })
    else:
        salvarLogin(txtLogin, txtSenha)
        return jsonify({
            'Criar conta': "valido",
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
        return jsonify({"resposta":"valido"})
    else:
        return jsonify({"resposta":"invalido"})

if __name__ == "__main__":
    app.run(debug=True)