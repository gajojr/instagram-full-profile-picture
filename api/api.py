import os
from flask import Flask, Response, request, send_file
import instaloader

app = Flask(__name__)

@app.route('/get-profile-picture')
def get_profile_picture():
    try:
        username = request.args.get('username')
        mod = instaloader.Instaloader()
        mod.download_profile(username, profile_pic_only=True)
        return send_file(f'{username}/' + os.listdir(f'{username}')[0])
    except instaloader.exceptions.ProfileNotExistsException:
        return "Profile doesn't exist"
