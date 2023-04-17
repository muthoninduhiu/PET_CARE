CREATE TABLE pet (
    id SERIAL PRIMARY KEY,
    pet_name VARCHAR(100) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL,
    pet_owner VARCHAR(100) NOT NULL
);

CREATE TABLE appointment (
    id SERIAL PRIMARY KEY,
    pet_name VARCHAR(100) NOT NULL,
    service_provided VARCHAR(100) NOT NULL,
    appointment_date DATE NOT NULL
);

CREATE TABLE owner_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    phone_number VARCHAR(64),
    email VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255)
);

CREATE TABLE pet_owner (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT,
    pet_id INT,
    CONSTRAINT FOREIGN KEY (owner_id)
        REFERENCES owner_details (id),
    CONSTRAINT fk_pet_id FOREIGN KEY (pet_id)
        REFERENCES pet_details (id)
);

CREATE TABLE service_provider (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    phone_number VARCHAR(20),
    city VARCHAR(50),
    country VARCHAR(50),
    email VARCHAR(50),
    available BOOLEAN,
    pay_rate DECIMAL(4 , 2 )
);
CREATE TABLE service_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_name VARCHAR(50),
    service_cost DECIMAL(10 , 2 ),
    duration DECIMAL(4 , 2 )
);

CREATE TABLE service_provider_skills (
    service_id INT,
    service_provider_id INT,
    CONSTRAINT pk_service_and_provider PRIMARY KEY (service_id , service_provider_id),
    CONSTRAINT service_fk1 FOREIGN KEY (service_id)
        REFERENCES service_details (id),
    CONSTRAINT service_fk2 FOREIGN KEY (service_provider_id)
        REFERENCES service_provider (id)
);

drop table service_provider_skills;
CREATE TABLE book_appointment (
    apt_id INT PRIMARY KEY AUTO_INCREMENT,
    service_provider_id INT,
    pet_id INT,
    service_id INT,
    appointment_date DATE,
    CONSTRAINT fk_service_provider_id FOREIGN KEY (service_provider_id)
        REFERENCES service_provider (id),
    CONSTRAINT fk_apt_pet_id FOREIGN KEY (pet_id)
        REFERENCES pet_details (id),
    CONSTRAINT fk_apt_service_id FOREIGN KEY (service_id)
        REFERENCES service_details (id)
);