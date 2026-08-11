sistema = """Você é um especialista em análise musical.

Sua tarefa é analisar o significado da música informada.

Escreva apenas UM texto corrido, entre 120 e 180 palavras.

Estrutura obrigatória:

1. Explique qual é a mensagem principal da música.
2. Comente os principais temas abordados (amor, superação, crítica social, esperança, solidão, etc.).
3. Explique qual sentimento ou emoção a música procura transmitir ao ouvinte.
4. Faça uma breve conclusão resumindo a interpretação.

Regras:
- Não utilize listas.
- Não utilize tópicos.
- Não escreva títulos.
- Não use markdown.
- Não invente fatos sobre a produção da música, o artista ou sua história.
- Caso o significado seja interpretativo, deixe isso claro usando expressões como "a música pode ser interpretada como..." ou "uma possível interpretação é...".
- Escreva em português do Brasil.
- Utilize linguagem clara e objetiva.
- Retorne somente o texto solicitado.
- Se os argumentos recebidos forem "nome da musica" e "nome do artista", retorne apenas "escolha uma musica valida para a pesquisa"
""" #nao vai dados, apenas informação.

lista_de_Musicas = [
    ('aguas de março', 'elis regina & tom jobim', 'https://i.scdn.co/image/ab67616d0000b273292018d60c3e04f17656657a'),
    ('anna julia', 'los hermanos', 'https://i.scdn.co/image/ab67616d0000b2732b4da5abb231f0dfc297ff09'),
    ('anunciação', 'alceu valenca', 'https://i.scdn.co/image/ab67616d0000b273f73b8f668602746a2ade736c'),
    ('aquarela brasileira', 'martinho da vila', 'https://i.scdn.co/image/ab67616d0000b2731feda1192c46d94bd4a67ec5'),
    ('boate azul', 'joaquim & manuel', 'https://i.scdn.co/image/ab67616d0000b27307107c03280c5a41ef35338d'),
    ('certas coisas', 'lulu santos', 'https://i.scdn.co/image/ab67616d0000b273e9e7d18863b66c725af46b71'), 
    ('cheia de manias', 'raca negra', 'https://i.scdn.co/image/ab67616d0000b2732046557ea436bdf227db0f58'),
    ('Como nossos pais', 'elis regina', 'https://i.scdn.co/image/ab67616d0000b2736c478a7442fbce2cb88dd4c3'),
    ('depois do prazer', 'so pra contrariar', 'https://i.scdn.co/image/ab67616d0000b2739970f19797f15cc6654c5811'),
    ('diario de um detento', 'racionais mc', 'https://i.scdn.co/image/ab67616d0000b273dc04f429698834d0736ddb0a'),
    ('dias de luta, dias de gloria', 'charlie brown jr.', 'https://i.scdn.co/image/ab67616d0000b2735e7cb9ed84348b98973c823f'),
    ('evidencias', 'chitaozinho & xororo', 'https://i.scdn.co/image/ab67616d0000b27369394cd1782b2b1560558c02'),
    ('fio de cabelo', 'chitaozinho & xororo', 'https://i.scdn.co/image/ab67616d0000b2738f2cf456cfee9bfeb297218c'),
    ('hoje cedo', 'emicida', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMl8P3iuFFRA5oYiLfeZ02dB0trxIEBj95SK5vPpgfUjHwS9Oi5pXDj8Y&s=10'),
    ('infiel', 'marilia mendonca', 'https://i.scdn.co/image/ab67616d0000b2737b4293f65f8fe7003c29279c'),
    ('levanta e anda', 'emicida', 'https://i.scdn.co/image/ab67616d0000b273fbd2467fe87c1bb4891cbed2'),
    ('malandragem', 'cassia eller', 'https://i.scdn.co/image/ab67616d0000b2731f6d30d1398f388efdbcc751'),
    ('metamorfose ambulante', 'raul seixas', 'https://i.scdn.co/image/ab67616d0000b273bd5978f9c520fe61e8c7392f'),
    ('não deixe o samba morrer', 'alcione', 'https://i.scdn.co/image/ab67616d0000b2736a5304ea8cd4f92279f28d78'),
    ('o leaozinho', 'caetano veloso', 'https://i.scdn.co/image/ab67616d0000b273f55d8e57bec9c6a6e410a7b2'),
    ('o show tem que continuar', 'fundo de quintal', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS04-lZExtTYrrIHlQ3_33A_6SKLlwIauPwQzy7SmhMVQ&s=10'),
    ('pais e filhos', 'legiao urbana', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyIC7HAKf_DNHdU4xGD1thgQ7srAUAh623ut4P9zHNr1opnVkYEOmDulc&s=10'),
    ('palco', 'gilberto gil', 'https://i.scdn.co/image/ab67616d0000b2734761fc7af34ab3b052ac0340'),
    ('partido alto', 'chico buarque', 'https://i.scdn.co/image/ab67616d0000b2733d33c18c8e086f62399014e8'),
    ('primeiros erros', 'capital inicial', 'https://i.scdn.co/image/ab67616d0000b273aaa1cb4e28baf640b38a5d5b'),
    ('pro dia nascer feliz', 'barao vermelho', 'https://i.scdn.co/image/ab67616d0000b27370fa35a4c2bb1d695fb5866f'),
    ('romaria', 'renato teixeira', 'https://i.scdn.co/image/ab67616d0000b273d69810dce686bb923305085b'),
    ('sina', 'djavan', 'https://i.scdn.co/image/ab67616d0000b273ff6dbdb76c0cce850eb706e3'),
    ('sinto sua falta', 'ferrugem', 'https://i.scdn.co/image/ab67616d0000b273e64e1a86e30d085ae23d9509'),
    ('sulicidio', 'baco exu do blues & diomedes chinaski', 'https://images.genius.com/fe931b46d43a390f432ef60daa561759.1000x1000x1.png'),
    ('telegrama', 'exaltasamba', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiAWv36mPzfB8pQlSbL_Wn5yA5UGUwLVr6q8K2suVEjQ&s=10'),
    ('tempo perdido', 'legiao urbana', 'https://i.scdn.co/image/ab67616d0000b2731eb5e996639036a49b09f1e5'),
    ('temporal', 'ferrugem', 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8470f3cfced1835d696ad83aa1'),
    ('tocando em frente', 'almir sater & renato teixeira', 'https://i.scdn.co/image/ab67616d00001e028f85ea3634e0d7689c1de118'),
    ('trem das onze', 'demonios da garoa', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3nS4ycR6BQD-eh9WUVqkCXTzWa1n685UAKhkpbmWGv9Hq1X7WhNo2Icf0&s=10'),
    ('trevo (tu)', 'anavitoria & tiago iorc', 'https://i.scdn.co/image/ab67616d0000b273a13d6e3a4cd6042ad01f9998'),
    ('vida loka, pt. 2', 'racionais mc', 'https://i.scdn.co/image/ab67616d0000b273497e68476e7062b1bf5ea83f'),
    ('vou festejar', 'beth carvalho', 'https://i.scdn.co/image/ab67616d0000b2730c6a11e043825fa8bd0052be')
]