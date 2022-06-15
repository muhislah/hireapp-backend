CREATE TABLE employee (
     idemployee INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     fullname VARCHAR(200) NOT NULL,
     password VARCHAR(300) NOT NULL,
     email VARCHAR(300) NOT NULL,
     phonenumber numeric NOT NULL,
     jobs TEXT DEFAULT NULL,
     workplace TEXT  DEFAULT NULL,
     address TEXT DEFAULT NULL,
     description TEXT DEFAULT NULL,
     skill VARCHAR(300) DEFAULT NULL,
     image VARCHAR(300) ,
     active VARCHAR(50),
     idCompany INT ,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO employee (fullname,password,email,phonenumber,jobs,work_place,address,image,description,skill,idCompany) 
VALUES ('wahyu','wahyu123','wahyu@gmail.com',0856546554654,'software development','tokopedia','jalan jalan','profil.png','pekerja keras tanpa lelah','jsavascript, php, golang',3),
('fatih','fatih12','fatih@gmail.com',0827339299292,'quality asuranse','tokopedia','jalan belok','profil.png','pekerja keras tanpa lelah','jsavascript, php, golang',2),
('faqih','faqihaja','faqih@gmail.com',0877362282929,'UI UX','pijar sekolah','jalan terus aja','profil.png','pekerja keras tanpa lelah','jsavascript, php, golang',1),
('muhammad','muhammad','muhammad@gmail.com',086368292910,'Engginering','pijar sekolah','jalan buntu','profil.png','selalu istiqomah','java, sprintbot, pwa',1),
('dwi','dwi888','dwi@gmail.com',0865352282929,'frontend','pijar sekolah',' akhir jalan','profil.png','selalu istiqomah','java, sprintbot, pwa',2),
('purwanto','purwanto233','purwanto@gmail.com',082736289329,'backend','tokopedia','jalan menggok','profil.png','selalu istiqomah','java, sprintbot, pwa',2)


CREATE TABLE company (
     idCompany VARCHAR(200) NOT NULL PRIMARY KEY,
     fullname VARCHAR(200) NOT NULL,
     password VARCHAR(300) NOT NULL,
     email VARCHAR(300) NOT NULL,
     phonenumber numeric NOT NULL,
     company VARCHAR(200) NOT NULL,
     position TEXT  NOT NULL,
     address TEXT DEFAULT NULL,
     companyDescription TEXT DEFAULT NULL,
     companyField VARCHAR(300) DEFAULT NULL,
     image VARCHAR(300) ,
     instagram VARCHAR(300) DEFAULT NULL,
     linkedin VARCHAR(300) DEFAULT NULL,
     active VARCHAR(50),
     id_employee INT,
     role VARCHAR(50),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO company (id_company,fullname,password,email,phonenumber,position,company_field,address,image,company_description,company) 
VALUES ('id-cpny-1','wahyu','wahyu123','wahyu@gmail.com',0856546554654,'software development','tokopedia','jalan jalan','profil.png','pekerja keras tanpa lelah','PT. serba guna.com'),
('id-cpny-1','fatih','fatih12','fatih@gmail.com',0827339299292,'quality asuranse','tokopedia','jalan belok','profil.png','pekerja keras tanpa lelah','PT. serba guna.com'),
('id-cpny-1','faqih','faqihaja','faqih@gmail.com',0877362282929,'UI UX','pijar sekolah','jalan terus aja','profil.png','pekerja keras tanpa lelah','PT. serba guna.com'),
('id-cpny-1','muhammad','muhammad','muhammad@gmail.com',086368292910,'Engginering','pijar sekolah','jalan buntu','profil.png','selalu istiqomah','PT abal-abal'),
('id-cpny-1','dwi','dwi888','dwi@gmail.com',0865352282929,'frontend','pijar sekolah',' akhir jalan','profil.png','selalu istiqomah','PT abal-abal'),
('id-cpny-1','purwanto','purwanto233','purwanto@gmail.com',082736289329,'backend','tokopedia','jalan menggok','profil.png','selalu istiqomah','PT abal-abal')

CREATE TABLE work_experience (
     idexperience INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     position VARCHAR(300) NOT NULL,
     namecompany VARCHAR(200) NOT NULL,
     monthyear VARCHAR(200) NOT NULL,
     jobdescription TEXT NOT NULL,
     idemployee VARCHAR(200),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE portfolio (
    idPortfolio INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nameApps VARCHAR(300) NOT NULL,
    respository VARCHAR(200) NOT NULL,
    type  VARCHAR(200) DEFAULT NULL,
    image VARCHAR(200) [],
    idEmployee VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hirejobs (
     idhirejob INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    status VARCHAR(300) NOT NULL,
    idEmployee VARCHAR(200),
    idCompany VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
INSERT INTO company (id_company,fullname,password,email,phonenumber,position,company_field,address,image,company_description,company) 
VALUES ('id-cpny-1','wahyu','wahyu123','wahyu@gmail.com',0856546554654,'software development','tokopedia','jalan jalan','profil.png','pekerja keras tanpa lelah','PT. serba guna.com'),


SELECT * FROM employee INNER JOIN work_experience ON employee.idexperience = work_experience.idexperience INNER JOIN portfolio ON employee.idportfolio = portfolio.idportfolio WHERE employee.idemployee = 'ad3506a1-2c9a-46c1-8daf-ea1efb5fec0c';

SELECT * FROM work_experience INNER JOIN portfolio ON employee.idemployee = work_experience.idemployee INNER JOIN portfolio ON employee.idemployee = portfolio.idemployee WHERE employee.idemployee =$1

CREATE TABLE employee (
     idemployee VARCHAR(70) NOT NULL PRIMARY KEY,
     fullname VARCHAR(200) NOT NULL,
     password VARCHAR(300) NOT NULL,
     email VARCHAR(300) NOT NULL,
     phonenumber numeric NOT NULL,
     jobs TEXT DEFAULT NULL,
     workplace TEXT  DEFAULT NULL,
     address TEXT DEFAULT NULL,
     description TEXT DEFAULT NULL,
     skill VARCHAR(300) DEFAULT NULL,
     image VARCHAR(300) ,
     active VARCHAR(50),
     role VARCHAR(50),
     idexperience INT,
     idportfolio INT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)