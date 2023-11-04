DROP TABLE IF EXISTS teacher;

CREATE TABLE teacher
(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(10),
   assigned_class int,
   login_id varchar(10),
   password varchar(20),
   PRIMARY KEY(id)
);

CREATE TABLE classroom
(
    id int not null auto_increment,
    teacher_id int,
    name varchar(10),
    address varchar(100),
    capacity int,
    PRIMARY KEY(id)
);

CREATE TABLE student
(
    id int not null auto_increment,
    teacher_id int,
    classroom_id int,
    name varchar(10),
    login_id varchar(10),
    password varchar(20),
    PRIMARY KEY(id),
    FOREIGN KEY teacher_id_foreign_key (teacher_id) references teacher(id),
    FOREIGN KEY classroom_id_foreign_key (classroom_id) references classroom(id)
);

CREATE TABLE classes
(
    id int not null auto_increment,
    class_date date,
    class_time int,
    classroom_id int,
    PRIMARY KEY(id),
    FOREIGN KEY classroom_id_foreign_key (classroom_id) references classroom(id)
);

CREATE TABLE class_management
(
    id int not null auto_increment,
    class_id int,
    student_id int,
    PRIMARY KEY(id),
    FOREIGN KEY class_id_foreign_key (class_id) references classes(id),
    FOREIGN KEY student_id_foreign_key (student_id) references student(id)
);

