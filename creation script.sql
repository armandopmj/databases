CREATE DATABASE cb;
USE cb;
SHOW DATABASES;

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(20),
  password VARCHAR(20),
  current_room INT );
DESCRIBE users

CREATE TABLE rooms (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  room_name VARCHAR(20) );

CREATE TABLE messages (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  text VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME,
  room_id INT,
  user_id INT );

CREATE TABLE friends (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  friend_id INT);

INSERT INTO users ( user_name, password, current_room )
  VALUES ( 'Mikey', '12345', NULL );

INSERT INTO users ( user_name, password, current_room )
  VALUES ( 'Armando', 'bad_mofo', NULL );

INSERT INTO users ( user_name, password )
  VALUES ( 'Joey', 'kangaroo' );

SELECT * FROM users;
