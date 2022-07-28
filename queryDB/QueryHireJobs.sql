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
	fullname VARCHAR(200) DEFAULT NULL,
	 hp VARCHAR(200) DEFAULT NULL,
	deskripsi VARCHAR(800) DEFAULT NULL,
	tujuan VARCHAR(200) DEFAULT NULL,
	email VARCHAR(200) DEFAULT NULL,
    idemployee VARCHAR(200) NOT NULL,
    idcompany VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO company (id_company,fullname,password,email,phonenumber,position,company_field,address,image,company_description,company) 
VALUES ('id-cpny-1','wahyu','wahyu123','wahyu@gmail.com',0856546554654,'software development','tokopedia','jalan jalan','profil.png','pekerja keras tanpa lelah','PT. serba guna.com'),


SELECT * FROM employee INNER JOIN work_experience ON employee.idexperience = work_experience.idexperience INNER JOIN portfolio ON employee.idportfolio = portfolio.idportfolio WHERE employee.idemployee = 'ad3506a1-2c9a-46c1-8daf-ea1efb5fec0c';

SELECT * FROM work_experience INNER JOIN portfolio ON work_experience.idemployee = portfolio.idemployee WHERE employee.idemployee =$1

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


CREATE TABLE food (
     idfood INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     title VARCHAR(200) NOT NULL,
     image VARCHAR(300) DEFAULT NULL,
     ingrediens VARCHAR(300) NOT NULL,
     video VARCHAR(600) ,
     idcoment INT ,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
      iduser VARCHAR(70) NOT NULL PRIMARY KEY,
     fullname VARCHAR(200) NOT NULL,
     password VARCHAR(300) NOT NULL,
     email VARCHAR(300) NOT NULL,
     phonenumber numeric NOT NULL,
     image VARCHAR(300) ,
     active VARCHAR(50),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comentar (
      idcomentar INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     comentar TEXT DEFAULT NULL,
     iduser INT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE simpan(
      idsimpan INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     iduser varchar(300) ,
     idfood INT ,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(id,fullname,password,email,username) 
VALUES ('4282d16f-720a-4512-8179-2b2501780134', 'wahyutitik','testing123','testing123@gmail.com','tutorialmp4');



psql -U manxdniwzxwyiu -h ec2-52-22-136-117.compute-1.amazonaws.com -p 5432 -d deaserd2in9uj3


ALTER TABLE food
ADD iduser varchar(500)


CREATE TABLE users (
       id VARCHAR(70) NOT NULL PRIMARY KEY,
     fullname VARCHAR(200) Default NULL,
     password VARCHAR(300) NOT NULL,
     email VARCHAR(300) NOT NULL,
 username VARCHAR(300) Default NULL,
     phone VARCHAR(300) DEFAULT NULL,
     photo VARCHAR(300) DEFAULT NULL,
  short_name VARCHAR(300) DEFAULT NULL,
     active VARCHAR(50) DEFAULT NULL,
     bio VARCHAR(500) DEFAULT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chats (
        id VARCHAR(70) NOT NULL PRIMARY KEY,
     sender VARCHAR(200)  DEFAULT NULL,
     receiver VARCHAR(200) DEFAULT NULL,
     chat_type varchar(200) DEFAULT NULL,
     message TEXT DEFAULT NULL,
     date varchar(200) DEFAULT NULL,
is_read varchar(200) ,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


psql -U hlqmulkbayltge -h ec2-44-198-82-71.compute-1.amazonaws.com -p 5432 -d d6v1jp9cocrlpn

a8a0f07b-e628-4e5b-b183-92df49a92814

SELECT * FROM hirejobs INNER JOIN company ON hirejobs.idcompany = company.idcompany WHERE company.idcompany = 'a8a0f07b-e628-4e5b-b183-92df49a92814'


// telegrams
psql -U hlqmulkbayltge -h ec2-44-198-82-71.compute-1.amazonaws.com -p 5432 -d d6v1jp9cocrlpn



https://github.com/muhislah/hireapp-frontend/tree/develop2.git