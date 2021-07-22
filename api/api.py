import os
import shutil
from flask import Flask, Response, request, send_file
# from ig_profile import ProfileImage as pimage
import instaloader

app = Flask(__name__)

@app.route('/get-profile-picture')
def get_profile_picture():
    try:
        username = request.args.get('username')
        mod = instaloader.Instaloader()
        mod.download_profile(username, profile_pic_only=True)
        # pimage.image(username)
        return send_file(f'{username}/' + os.listdir(f'{username}')[0])
    except IndexError:
        r = Response(response="Outside API error occurred", status=500, mimetype="application/xml")
        r.headers["Content-Type"] = "text/xml; charset=utf-8"
        return "Outside API error occurred"
    finally:
        if os.path.isdir(username):
            shutil.rmtree(username)
