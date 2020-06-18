import pyqrcode

from pyzbar.pyzbar import decode
from PIL import Image

def Encode(data):
    qr = pyqrcode.create(data)
    # print(qr.text())
    qr.png('static/qr.png',scale=5)

def Decode(image):
    d= decode(Image.open(image))
    decoded_data = d[0][0].decode("utf-8")
    return decoded_data