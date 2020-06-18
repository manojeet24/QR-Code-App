from flask import Flask, render_template
from flask import request, send_file
from pyzbar.pyzbar import decode
import base64
import core

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/generate.html')
def generate():
    return render_template('generate.html')

@app.route('/decode.html')
def deCode():
    return render_template('decode.html')


@app.route('/qrGenerate',methods=['POST'])
def encrypt():
    input_text = request.json
    # print(type(input_text['text']))
    core.Encode(input_text['text'])
    # image = open('qr.png','rb') 
    # return str(base64.b64encode(image.read()))
    return 'generated'

@app.route('/qrDecode', methods = ['POST'])
def decrypt():
    input_file = request.files['image']
    # print(isthisFile.filename)
    # print(type(isthisFile))
    result = core.Decode(input_file)
    return result

@app.route('/favicon.ico')
def fault():
    return 'favIcon'

if __name__ == "__main__":
    app.run(debug=True)