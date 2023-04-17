from flask import jsonify
from models import app, Species, PetDetails, PetOwner, OwnerDetails


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
            'first_name': owner_details.firstname if owner_details else None,
            # TODO: add pet owner details here

        }
        results.append(pet_detail_data)
    return jsonify(results)
