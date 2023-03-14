from flask import  request, jsonify
from models import Pet, Appointment,db,app


@app.route('/pets', methods=['POST'])
def create_pet():
    data = request.get_json()
    new_pet = Pet(name=data['name'], breed=data['breed'], age=data['age'], owner=data['owner'])
    db.session.add(new_pet)
    db.session.commit()
    return jsonify({'message': 'New pet added successfully!'})

@app.route('/pets', methods=['GET'])
def get_all_pets():
    pets = Pet.query.all()
    result = []
    for pet in pets:
        pet_data = {}
        pet_data['id'] = pet.id
        pet_data['name'] = pet.name
        pet_data['breed'] = pet.breed
        pet_data['age'] = pet.age
        pet_data['owner'] = pet.owner
        result.append(pet_data)
    return jsonify(result)

@app.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.get_json()
    new_appointment = Appointment(pet_name=data['pet_name'], service=data['service'], date=data['date'])
    db.session.add(new_appointment)
    db.session.commit()
    return jsonify({'message': 'New appointment added successfully!'})

@app.route('/appointments', methods=['GET'])
def get_all_appointments():
    appointments = Appointment.query.all()
    result = []
    for appointment in appointments:
        appointment_data = {}
        appointment_data['id'] = appointment.id
        appointment_data['pet_name'] = appointment.pet_name
        appointment_data['service'] = appointment.service
        appointment_data['date'] = appointment.date
        result.append(appointment_data)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
