from google import genai #importa a IA do gemini
from google.genai.errors import APIError # descobrir erros na IA em caso de falha
from google.genai import types # usado para algumas configurações da IA
import json #permite trabalhar no formato JSON


from comandos import sistema # Puxa a variável sistema do arquivo prompt

client = genai.Client(api_key=Key) #Dá acesso ao serviço IA do gemini

def gerar_significado(musica_significado):
    """Recebe uma música e mostra o significado dela"""      
            
            
    mensagem= f"Música para ser analisada: \n{musica_significado}" #Dados do prompt 
    try: # vai tentar puxar a IA 
        response = client.models.generate_content( #puxa a resposta das informações dentro do parentêses
            model="gemini-3.5-flash", #modelo da IA
            contents=mensagem, #Informação da IA
            config=types.GenerateContentConfig( #as configurações da IA
              system_instruction=sistema, #dados da IA
        )
        )
        return (response.text)

    except APIError as e:
        return f'Erro na API {e}' #mostrar qual foi o erro,caso ocorra 


musica_significado = []
if __name__ == "__main__":
    resultado = gerar_significado(musica_significado) 