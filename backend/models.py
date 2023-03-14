from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv
load_dotenv()

my_secret_key = os.getenv("USER_PASSWORD")

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:{}@localhost/pet_care_db'.format(my_secret_key)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    breed = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    owner = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Pet {self.id}>'

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pet_name = db.Column(db.String(100), nullable=False)
    service = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'<Appointment {self.id}>'