from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = "musicas.db"


def conectar_banco():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def criar_tabela():
    conn = conectar_banco()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS musicas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            artista TEXT NOT NULL,
            album TEXT,
            ano INTEGER
        )
    """)

    conn.commit()
    conn.close()


@app.route("/api/musicas", methods=["GET"])
def listar_musicas():
    conn = conectar_banco()

    musicas = conn.execute(
        "SELECT * FROM musicas ORDER BY id DESC"
    ).fetchall()

    conn.close()

    return jsonify([dict(musica) for musica in musicas])


@app.route("/api/musicas/<int:id>", methods=["GET"])
def buscar_musica(id):
    conn = conectar_banco()

    musica = conn.execute(
        "SELECT * FROM musicas WHERE id = ?",
        (id,)
    ).fetchone()

    conn.close()

    if musica is None:
        return jsonify({"erro": "Música não encontrada"}), 404

    return jsonify(dict(musica))


@app.route("/api/musicas", methods=["POST"])
def criar_musica():
    dados = request.get_json()

    if not dados:
        return jsonify({"erro": "JSON inválido"}), 400

    titulo = dados.get("titulo")
    artista = dados.get("artista")
    album = dados.get("album")
    ano = dados.get("ano")

    if not titulo or not artista:
        return jsonify({
            "erro": "Título e artista são obrigatórios"
        }), 400

    conn = conectar_banco()

    cursor = conn.execute("""
        INSERT INTO musicas (titulo, artista, album, ano)
        VALUES (?, ?, ?, ?)
    """, (titulo, artista, album, ano))

    conn.commit()

    id_musica = cursor.lastrowid

    conn.close()

    return jsonify({
        "mensagem": "Música cadastrada com sucesso",
        "id": id_musica
    }), 201


@app.route("/api/musicas/<int:id>", methods=["PUT"])
def atualizar_musica(id):
    dados = request.get_json()

    if not dados:
        return jsonify({"erro": "JSON inválido"}), 400

    conn = conectar_banco()

    musica = conn.execute(
        "SELECT * FROM musicas WHERE id = ?",
        (id,)
    ).fetchone()

    if musica is None:
        conn.close()
        return jsonify({"erro": "Música não encontrada"}), 404

    titulo = dados.get("titulo", musica["titulo"])
    artista = dados.get("artista", musica["artista"])
    album = dados.get("album", musica["album"])
    ano = dados.get("ano", musica["ano"])

    conn.execute("""
        UPDATE musicas
        SET titulo = ?, artista = ?, album = ?, ano = ?
        WHERE id = ?
    """, (titulo, artista, album, ano, id))

    conn.commit()
    conn.close()

    return jsonify({
        "mensagem": "Música atualizada com sucesso"
    })


@app.route("/api/musicas/<int:id>", methods=["DELETE"])
def deletar_musica(id):
    conn = conectar_banco()

    musica = conn.execute(
        "SELECT * FROM musicas WHERE id = ?",
        (id,)
    ).fetchone()

    if musica is None:
        conn.close()
        return jsonify({"erro": "Música não encontrada"}), 404

    conn.execute(
        "DELETE FROM musicas WHERE id = ?",
        (id,)
    )

    conn.commit()
    conn.close()

    return jsonify({
        "mensagem": "Música removida com sucesso"
    })


if __name__ == "__main__":
    criar_tabela()
    app.run(debug=True, port=5000)