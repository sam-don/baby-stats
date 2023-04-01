from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime

app = Flask(__name__)
# app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///baby_stats.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Guesses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    length = db.Column(db.Float, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'dob': self.dob.strftime('%d/%m'),
            'weight': self.weight,
            'length': self.length
        }

@app.route('/api/guesses', methods=['GET'])
def get_guesses():
    guesses = Guesses.query.all()
    return jsonify([guess.serialize() for guess in guesses])

@app.route('/api/guesses', methods=['POST'])
def create_guess():
    print(request.json)
    name = request.json['name']
    dob = datetime.datetime.strptime(request.json['dob'], '%Y-%m-%d')
    weight = request.json['weight']
    length = request.json['length']
    guess = Guesses(name=name, dob=dob, weight=weight, length=length)
    db.session.add(guess)
    db.session.commit()
    return jsonify(guess.serialize()), 201

with app.app_context():
    db.create_all()
    db.session.commit()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
