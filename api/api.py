from flask import Flask, Response, request, send_file
from ig_profile import ProfileImage as pimage

app = Flask(__name__)

@app.route('/get-profile-picture')
def get_profile_picture():
    try:
        username = request.args.get('username')
        pimage.image(username)
        return send_file(f'{username}.png')
    except IndexError:
        r = Response(response="Outside API error occurred", status=500, mimetype="application/xml")
        r.headers["Content-Type"] = "text/xml; charset=utf-8"
        return "Outside API error occurred"
    