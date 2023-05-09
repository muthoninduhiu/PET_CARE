from datetime import datetime

from flask import jsonify, request

from models import app, Species, PetDetails, PetOwner, db, ServiceDetails, ServiceProviderDetails, BookAppointment, \
    ServiceProviderSkills, OwnerDetails


# set FLASK_RUN_PORT = ''

@app.route('/api/species', methods=['GET'])
def get_species():
    species_available = Species.query.all()
    results = []
    for species in species_available:
        species_data = {
            'species_name': species.species_name,
            'life_expectancy': species.life_expectancy
        }
        results.append(species_data)
    return jsonify(results)


@app.route('/api/species', methods=['POST'])
def add_species():
    # Extract data from request
    data = request.get_json()
    species_name = data.get('species_name')
    life_expectancy = data.get('life_expectancy')

    # Create new pet record
    species_details = Species(
        species_name=species_name,
        life_expectancy=life_expectancy,
    )
    db.session.add(species_details)
    db.session.commit()

    # Return response with new pet details
    response = {
        'species_id': species_details.id,
        'species_name': species_details.species_name,
        'life_expectancy': species_details.life_expectancy
    }
    return jsonify(response), 201


@app.route('/api/species/<int:species_id>', methods=['PATCH'])
def edit_species(species_id):
    data = request.get_json()
    print(data)
    try:
        species = Species.query.filter_by(id=species_id).one()
        species.species_name = data['species_name']
        species.life_expectancy = data['life_expectancy']
        db.session.commit()
        return jsonify({'message': 'Species details updated successfully'})
    except ValueError:
        db.session.rollback()
        return jsonify({'message': 'Invalid JSON data'}), 400
    except KeyError as e:
        db.session.rollback()
        return jsonify({'message': f'Missing key: {e.args[0]}'}), 400
    finally:
        db.session.rollback()
        return jsonify({'message': 'Failed to update pet details'}), 500


@app.route('/api/pet_details', methods=['GET'])
def get_pet_details():
    pet_details = PetDetails.query.all()
    results = []
    for pet_detail in pet_details:
        species = Species.query.filter_by(id=pet_detail.species_id).first()
        pet_owner = PetOwner.query.filter_by(pet_id=pet_detail.id).first()
        owner_details = pet_owner.owner_details if pet_owner else None
        pet_detail_data = {
            'pet_id': pet_detail.id,
            'pet_name': pet_detail.pet_name,
            'species_name': species.species_name,
            'life_expectancy': str(species.life_expectancy) + ' Years',
            'birth_date': pet_detail.birth_date.strftime('%Y-%m-%d'),
            'gender': pet_detail.gender,
            'owner_name': owner_details.firstname + owner_details.lastname if owner_details else None,
        }
        results.append(pet_detail_data)
    return jsonify(results)


@app.route('/api/pet_details/<int:pet_id>', methods=['GET'])
def get_pet_by_id(pet_id):
    pet_detail = PetDetails.query.filter_by(id=pet_id).first()
    if not pet_detail:
        return jsonify({'message': 'Pet not found.'}), 404

    species = Species.query.filter_by(id=pet_detail.species_id).first()
    pet_owner = PetOwner.query.filter_by(pet_id=pet_detail.id).first()
    owner_details = pet_owner.owner_details if pet_owner else None

    pet_detail_data = {
        'pet_id': pet_detail.id,
        'pet_name': pet_detail.pet_name,
        'species_name': species.species_name,
        'life_expectancy': str(species.life_expectancy) + ' Years',
        'birth_date': pet_detail.birth_date.strftime('%Y-%m-%d'),
        'gender': pet_detail.gender,
        'owner_name': owner_details.firstname + ' ' + owner_details.lastname if owner_details else None,
    }

    return jsonify(pet_detail_data)


@app.route('/api/pet_details', methods=['POST'])
def add_pet():
    # Extract data from request
    data = request.get_json()
    pet_name = data.get('pet_name')
    species_id = data.get('species_id')
    birth_date = datetime.strptime(data.get('birth_date'), '%Y-%m-%d')
    gender = data.get('gender')

    # Create new pet record
    pet_details = PetDetails(
        pet_name=pet_name,
        species_id=species_id,
        birth_date=birth_date,
        gender=gender
    )
    db.session.add(pet_details)
    db.session.commit()

    # Return response with new pet details
    response = {
        'pet_id': pet_details.id,
        'pet_name': pet_details.pet_name,
        'species_id': pet_details.species_id,
        'birth_date': pet_details.birth_date.strftime('%Y-%m-%d'),
        'gender': pet_details.gender
    }
    return jsonify(response), 201


@app.route('/api/pet_details/<int:pet_id>', methods=['PATCH'])
def edit_pet(pet_id):
    data = request.get_json()
    print(data)
    try:
        pet = PetDetails.query.filter_by(id=pet_id).one()
        pet.pet_name = data['pet_name']
        pet.species_id = data['species_id']
        pet.birth_date = data['birth_date']
        pet.gender = data['gender']
        db.session.commit()
        return jsonify({'message': 'Pet details updated successfully'})
    except ValueError:
        db.session.rollback()
        return jsonify({'message': 'Invalid JSON data'}), 400
    except KeyError as e:
        db.session.rollback()
        return jsonify({'message': f'Missing key: {e.args[0]}'}), 400
    finally:
        db.session.rollback()
        return jsonify({'message': 'Failed to update pet details'}), 500


# add services
@app.route('/api/service_provider', methods=['POST'])
def add_service_provider():
    data = request.json

    # Extract service provider details from the request data
    name = data.get('name')
    phone_number = data.get('phone_number')
    city = data.get('city')
    country = data.get('country')
    email = data.get('email')
    available = data.get('available')
    pay_rate = data.get('pay_rate')

    # Create a new service provider object and add it to the database
    service_provider = ServiceProviderDetails(name=name, phone_number=phone_number, city=city, country=country,
                                              email=email, available=available, pay_rate=pay_rate)
    db.session.add(service_provider)
    db.session.commit()

    # Return a response with the ID of the new service provider
    return jsonify({'id': service_provider.id}), 201


# add service provider
@app.route('/api/service_details', methods=['POST'])
def add_service_details():
    data = request.json

    # Extract service details from the request data
    service_name = data.get('service_name')
    service_cost = data.get('service_cost')
    duration = data.get('duration')

    # Create a new service details object and add it to the database
    service_details = ServiceDetails(service_name=service_name, service_cost=service_cost, duration=duration)
    db.session.add(service_details)
    db.session.commit()

    # Return a response with the ID of the new service details
    return jsonify({'id': service_details.id}), 201


@app.route('/api/service_details', methods=['GET'])
def get_service_details():
    service_details = ServiceDetails.query.all()

    results = []
    for service in service_details:
        service_provider = ServiceProviderDetails.query.filter_by(id=service.id).first()
        service_data = {
            'service_name': service.service_name,
            'duration': str(service.duration) + ' Minutes',
            'cost': str(service.service_cost) + ' Ksh',
            'service_provider_name': service_provider.name,
            'service_provider_salary': str(float(service.service_cost) + (
                    service.duration / 30 * service_provider.pay_rate)) + ' Ksh'
        }
        results.append(service_data)
    return jsonify(results)


@app.route('/api/appointments', methods=['GET'])
def get_appointments():
    appointments = db.session.query(
        BookAppointment.apt_id,
        ServiceProviderDetails.name,
        ServiceDetails.service_name,
        BookAppointment.appointment_date,
        PetDetails.pet_name.label('pet_name'),
        OwnerDetails.firstname.label('owner_name'),
    ).join(
        ServiceProviderDetails,
        BookAppointment.service_provider_id == ServiceProviderDetails.id
    ).join(
        ServiceDetails,
        BookAppointment.service_id == ServiceDetails.id
    ).join(
        PetDetails,
        BookAppointment.pet_id == PetDetails.id
    ).join(
        PetOwner,
        PetDetails.id == PetOwner.pet_id
    ).join(
        OwnerDetails,
        PetOwner.owner_id == OwnerDetails.id
    ).all()

    results = []
    for pet_name, owner_name, apt_id, provider_name, service_name, appointment_date in appointments:
        appointment_data = {
            'apt_id': apt_id,
            'service_provider_name': provider_name,
            'service_name': service_name,
            'appointment_date': appointment_date.isoformat(),
            'pet_name': pet_name,
            'owner_name': owner_name

        }
        results.append(appointment_data)

    return jsonify(results)


@app.route('/api/appointments', methods=['POST'])
def book_appointment():
    data = request.get_json()
    service_provider_id = data.get('service_provider_id')
    pet_id = data.get('pet_id')
    service_id = data.get('service_id')
    appointment_date = data.get('appointment_date')

    new_appointment = BookAppointment(
        service_provider_id=service_provider_id,
        pet_id=pet_id,
        service_id=service_id,
        appointment_date=appointment_date
    )

    db.session.add(new_appointment)
    db.session.commit()

    return jsonify({'message': 'Appointment booked successfully.'})


@app.route('/api/<int:owner_id>/<int:pet_id>/vaccinations', methods=['GET'])
def get_vaccinations(owner_id, pet_id):
    owner = OwnerDetails.query.get(owner_id)
    if not owner:
        return jsonify({'message': 'Owner not found'}), 404
    pet = PetDetails.query.get(pet_id)
    if not pet:
        return jsonify({'message': 'Pet not found'}), 404
    vaccinations = PetOwner.query.filter_by(owner_id=owner_id, pet_id=pet_id).all()
    return jsonify([{
        'vaccination_date': v.vaccination_date.isoformat(),
        'vaccine_type': v.vaccine_type,
        } for v in vaccinations])
