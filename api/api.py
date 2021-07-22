from flask import Flask, request, send_file
from ig_profile import ProfileImage as pimage

app = Flask(__name__)

@app.route('/get-profile-picture')
def get_profile_picture():
    username = request.args.get('username')
    return send_file(pimage.image(username), f'./{username}-profile-picture.jpg')
    