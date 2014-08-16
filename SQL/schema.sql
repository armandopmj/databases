/*  Execute this file from the command line by typing:
 *  $ mysql -u root < schema.sql
 *  to create the database and the tables.
 */

CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(20),
  password VARCHAR(20),
  current_room INT
);

CREATE TABLE rooms (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  room_name VARCHAR(20) UNIQUE
);

CREATE TABLE messages (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  message_text VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  room_id INT,
  user_id INT
);

CREATE TABLE friends (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  friend_id INT
);

ALTER TABLE rooms
MODIFY room_name VARCHAR(20),
ADD UNIQUE(room_name);

ALTER TABLE messages
MODIFY created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
MODIFY updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP




