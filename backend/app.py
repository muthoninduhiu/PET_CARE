from datetime import datetime

from flask import jsonify, request

from models import app, Species, PetDetails, PetOwner, db


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
    except:
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
    except:
        db.session.rollback()
        return jsonify({'message': 'Failed to update pet details'}), 500
