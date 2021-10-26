DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
  id INT auto_increment NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role ( 
id INTEGER auto_increment NOT NULL,
title  VARCHAR(30) NOT NULL,
salary DECIMAL (10.1),
department_id  INTEGER ,
PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT auto_increment NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);