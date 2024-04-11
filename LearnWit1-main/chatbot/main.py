from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from flask_cors import CORS

chat_history = []
os.environ["GOOGLE_API_KEY"] = "AIzaSyBkOOay16dl5RdDhAsE8WaHbVVbaS-Oc-4"
genai.configure(api_key = os.environ['GOOGLE_API_KEY'])
model = genai.GenerativeModel('gemini-pro')

app = Flask(__name__) 
CORS(app)

prompt =  '''Act as a chatbot for my "LearnWit" - a study quiz web app. Your task is to take user queries related to study quiz knowledge or any questions related to studies and answer them. You should act as a knowledgeable tutor bot for LearnWit, providing answers and sharing useful links upon request. Keep your responses concise, limited to five lines of bullet points. Additionally, if a user greets you with "hii," "hello," or any other greeting, please respond with a greeting from the LearnWit team and proceed to answer their questions. If a user asks you a question that is not related to quiz knowledge or studies, please inform them that you are a LearnWit bot and can only answer questions related to these topics. Remember to always be polite and helpful to the user. Only answer study-related questions and don't answer questions related to general knowledge or any other topic.'''
@app.route('/chat', methods = ['POST', 'GET']) 
def chat():
  if request.method == 'GET': 
    return "Bot is working"
  else :
    # data = request.get_json()
    # array_data = data.get('arrayData', [])
    # print(array_data)
    # queries = ""
    # for query in array_data:
    #   queries = queries + query + " and "
    # print(queries)
    msg = request.form["msg"]
    # if model.generate_content(f"Refer {prompt} and behave as it is given in it.Is {msg} as per prompt. Please only state ans in yes or no? ").text=="Yes":
    #     input_msg = msg
    #     response = get_chat_response(input_msg)
    #     response=response.replace("**","").split("*")
    #     chat_history.append({"user": input_msg, "gemini": response})
    #     print(response)
    #     return jsonify({"response": response})
    # else:
    #     return jsonify({"response":'Query is not related to Quiz or Study questions.I am LearnWit bot,So I can only ans queries regarding it'})
   
    response = get_chat_response(f"Refer {prompt} and answer {msg}")
    response=response.replace("**","").split("*")
    chat_history.append({"user": msg, "gemini": response})
    print(response)
    return jsonify({"response": response})
  
def get_chat_response(text):
    response = model.generate_content(text).text
    return response
  
@app.route('/') 
def home():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
    
    