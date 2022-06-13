CREATE TABLE employee (
     id_employee VARCHAR(70) NOT NULL PRIMARY KEY,
     fullname VARCHAR(200) NOT NULL,
     password VARCHAR(300) NOT NULL,
     email VARCHAR(300) NOT NULL,
     phonenumber numeric NOT NULL,
     jobs TEXT DEFAULT NULL,
     work_place TEXT  DEFAULT NULL,
     address TEXT DEFAULT NULL,
     description TEXT DEFAULT NULL,
     skill VARCHAR(300) DEFAULT NULL,
     image VARCHAR(300) ,
     active VARCHAR(50),
     role VARCHAR(50),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO employee(id_employee, fullname, password, email, phonenumber, jobs, work_place, address, skill)VALUES(1, 'budi', 'budi123', 'budi123@gmail.com', 08131510777, 'web developer', 'jakarta', 'jakarta', 'javascript');

CREATE TABLE company (
     id_company VARCHAR(70) NOT NULL PRIMARY KEY,
     fullname VARCHAR(200) NOT NULL,
     password VARCHAR(300) NOT NULL,
     email VARCHAR(300) NOT NULL,
     phonenumber numeric NOT NULL,
     company VARCHAR(200) NOT NULL,
     position TEXT  NOT NULL,
     address TEXT DEFAULT NULL,
     company_description TEXT DEFAULT NULL,
     company_field VARCHAR(300) DEFAULT NULL,
     instagram VARCHAR(300) DEFAULT NULL,
     linkedin VARCHAR(300) DEFAULT NULL,
     image VARCHAR(300) ,
     active VARCHAR(50),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE work_experience (
     id_experience INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     position VARCHAR(300) NOT NULL,
     name_company VARCHAR(200) NOT NULL,
     month_year VARCHAR(200) NOT NULL,
     job_description TEXT NOT NULL,
     id_employee INT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE portfolio (
    id_portfolio INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name_apps VARCHAR(300) NOT NULL,
    respository VARCHAR(200) NOT NULL,
    type  VARCHAR(200) DEFAULT NULL,
    image VARCHAR(200) NOT NULL,
    id_employee INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE userEmployee