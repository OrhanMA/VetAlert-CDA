-- Create the 'animals' table
CREATE TABLE animals (
    animal_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age INT CHECK (age <= 30),
    race VARCHAR(50),
    user_id VARCHAR(255) NOT NULL,
    owner_name VARCHAR(50) NOT NULL,
    owner_phone VARCHAR(20),
    owner_email VARCHAR(50) NOT NULL
);

-- Create the 'vaccinations' table
CREATE TABLE vaccinations (
    vaccination_id INT AUTO_INCREMENT PRIMARY KEY,
    vaccin_name VARCHAR(50) NOT NULL,
    animal_id INT,
    user_id VARCHAR(255) NOT NULL,
    vaccination_date DATE NOT NULL,
    FOREIGN KEY (animal_id) REFERENCES animals(animal_id) ON DELETE CASCADE
);


-- Modify the 'animals' table
ALTER TABLE animals
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Modify the 'vaccinations' table
ALTER TABLE vaccinations
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


CREATE INDEX idx_user_id ON animals (user_id);
