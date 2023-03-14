// Function to get pets from the server and populate the pets table
function getPets() {
    fetch('/pets')
    .then(response => response.json())
    .then(data => {
        // Get the table body element
        const tableBody = document.querySelector('#pets tbody');
        
        // Clear the table
        tableBody.innerHTML = '';
        
        // Loop through the pets and add them to the table
        data.forEach(pet => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${pet.name}</td>
                <td>${pet.breed}</td>
                <td>${pet.age}</td>
                <td>${pet.owner}</td>
                <td><button class="delete-pet-button" data-id="${pet.id}">Delete</button></td>
            `;
        });
        
        // Add event listeners to the delete buttons
        const deleteButtons = document.querySelectorAll('.delete-pet-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                deletePet(button.dataset.id);
            });
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to add a pet to the server and update the pets table
function addPet(event) {
    event.preventDefault();
    
    // Get the data from the form
    const data = {
        name: document.querySelector('#name').value,
        breed: document.querySelector('#breed').value,
        age: document.querySelector('#age').value,
        owner: document.querySelector('#owner').value
    };
    
    // Send a POST request to the server to add the pet
    fetch('/pets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(() => {
        // Clear the form
        document.querySelector('#add-pet-form').reset();
        
        // Update the pets table
        getPets();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to delete a pet from the server and update the pets table
function deletePet(id) {
    // Send a DELETE request to the server to delete the pet
    fetch(`/pets/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        // Update the pets table
        getPets();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to get appointments from the server and populate the appointments table
function getAppointments() {
    fetch('/appointments')
    .then(response => response.json())
    .then(data => {
        // Get the table body element
        const tableBody = document.querySelector('#appointments tbody');
        
        // Clear the table
        tableBody.innerHTML = '';
        
        // Loop through the appointments and add them to the table
        data.forEach(appointment => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${appointment.pet_name}</td>
                <td>${appointment.service}</td>
                <td>${appointment.date}</td>
                <td><button class="delete-appointment-button" data-id="${appointment.id}">Delete</button></td>
            `;
        });
        
        // Add event listeners to the delete buttons
        const deleteButtons = document.querySelectorAll('.delete-appointment-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                deleteAppointment(button.dataset.id);
            });

        })
    })
}


// Function to add an appointment to the server and update the appointments table
function addAppointment(event) 
{
    event.preventDefault();


    // Get the data from the form
    const data = {
        pet_name: document.querySelector('#pet_name').value,
        service: document.querySelector('#service').value,
        date: document.querySelector('#date').value
    };

    // Send a POST request to the server to add the appointment
    fetch('/appointments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(() => {
        // Clear the form
        document.querySelector('#add-appointment-form').reset();
        
        // Update the appointments table
        getAppointments();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to delete an appointment from the server and update the appointments table
function deleteAppointment(id) {
// Send a DELETE request to the server to delete the appointment
    fetch(`/appointments/${id}`, {
    method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
    // Update the appointments table
    getAppointments();
    })
    .catch(error => {
    console.error('Error:', error);
    });
}

// Add event listeners to the forms
document.querySelector('#add-pet-form').addEventListener('submit', addPet);
document.querySelector('#add-appointment-form').addEventListener('submit', addAppointment);

// Populate the tables when the page loads
getPets();
getAppointments()