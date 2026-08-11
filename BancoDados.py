import sqlite3
from comandos import lista_de_Musicas


def checarTabela(musica):
    conexao = sqlite3.connect('app.db')
    cursor = conexao.cursor()            # isso aki é pra não repetir
    cursor.execute('''SELECT * FROM musicas WHERE nomeMusica = ? AND artista = ? AND urlImagem = ?''', 
                   (musica[0], musica[1], musica[2]))
    return cursor.fetchone()
    

def StartSQLite3():
    conexao = sqlite3.connect('app.db')
    cursor = conexao.cursor()
    cursor.execute(''' CREATE TABLE IF NOT EXISTS login (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                senha TEXT NOT NULL)''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS musicas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nomeMusica TEXT NOT NULL,
                artista TEXT NOT NULL,
                urlImagem TEXT NOT NULL)''') 

    for musica in lista_de_Musicas:  # isso aqi adiciona as músicas na tabela, mas só se não tiverem lá ainda, pra não repetir
        if not checarTabela(musica):
            cursor.execute('INSERT INTO musicas (nomeMusica, artista, urlImagem) VALUES (?, ?, ?)', musica)

    conexao.commit()
    
def salvarLogin(nome, senha):
    # StartSQLite3()
    conexao = sqlite3.connect('app.db')
    cursor = conexao.cursor()
    cursor.execute('''INSERT INTO login (nome, senha)
                   VALUES (?, ?)''', (nome, senha))
    conexao.commit()

def salvarPlaylist(playlist, musica, artista, caminho, usuario):
    conexao = sqlite3.connect('app.db')
    cursor = conexao.cursor()
    cursor.execute(f'''INSERT INTO {usuario} (playlist, musica, artista, caminho)
                    VALUES (?, ?, ?, ?)''', (playlist, musica, artista, caminho))
    conexao.commit()

def RemoverPlaylist(usuario, json):
    print('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    print(json['remover'])
    conexao = sqlite3.connect('app.db')
    cursor = conexao.cursor()
    cursor.execute(f'DELETE FROM {usuario} WHERE musica = ?', (json['remover'],))
    conexao.commit()