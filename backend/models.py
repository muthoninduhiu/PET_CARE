from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

my_secret_key = os.getenv("USER_PASSWORD")

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:{}@localhost:5432/pet_care_db'.format(my_secret_key)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
with app.app_context():
    class Species(db.Model):
        __tablename__ = 'species'
        id = db.Column(db.Integer, primary_key=True)
        species_name = db.Column(db.String(120))
        life_expectancy = db.Column(db.Integer)


    class PetDetails(db.Model):
        __tablename__ = 'pet_details'
        id = db.Column(db.Integer, primary_key=True)
        pet_name = db.Column(db.String(120))
        birth_date = db.Column(db.Date)
        gender = db.Column(db.String(120))
        species_id = db.Column(db.Integer, db.ForeignKey('species.id'))
        species = db.relationship('Species', backref='pet_details')

