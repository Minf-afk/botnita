import requests
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def get_response(user_message):
    try:
        url = "https://openrouter.ai/api/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",  
            "X-Title": "Nita Chatbot"
        }
        data = {
            "model": "gpt-3.5-turbo", 
            "messages": [
                {"role": "system", "content": "Você é a Gabs, assistente virtual da Nita Alimentos..."},
                {"role": "user", "content": user_message}
            ]
        }
        response = requests.post(url, json=data, headers=headers)
        
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"].strip()
        else:
            print(f"Erro na API OpenRouter: {response.status_code} - {response.text}")
            return "Desculpe, ocorreu um erro ao obter resposta da IA."

    except requests.RequestException as e:
        print(f"Erro de conexão: {e}")
        return "Erro de conexão com OpenRouter."

@app.route('/api/getBotResponse', methods=['POST'])
def get_bot_response():
    data = request.get_json()
    user_message = data.get('message', '')

    if user_message.lower() in ["/start", "olá", "oi", "bom dia", "boa tarde", "boa noite"]:
        return jsonify({
            "response": "Olá! Eu sou a Gabs, assistente virtual da Nita Alimentos. Estou aqui para te ajudar com informações sobre nossos produtos, receitas e dicas de panificação. Como posso te ajudar hoje?"
        })

    response = get_response(user_message)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)