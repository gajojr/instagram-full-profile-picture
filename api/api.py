import time
from flask import Flask

app = Flask(__name__)

users = [{
    "id": 1,
    "name": 'andrija',
    "last_name": 'gajic'
}, {
    "id": 2,
    "name": 'nikola',
    "last_name": 'poletarac'
}, {
    "id": 3,
    "name": 'gaser',
    "last_name": 'makser'
}]

@app.route('/users')
def get_current_time():
    return {'users': users}