var mysql = require('mysql');

/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

// objectId
// roomname
// username
// text
// createdAt
// updatedAt

exports.findAllMessages = function(cb){
  dbConnection.query("SELECT "+
    "users.user_name as username, "+
    "messages.message_text as text, "+
    "messages.id as objectId, "+
    "messages.created_at as createdAt, "+
    "messages.updated_at as updatedAt, "+
    "rooms.room_name as roomname "+
    "FROM messages "+
    "JOIN users ON users.id = messages.user_id "+
    "JOIN rooms ON rooms.id = messages.room_id; ", function(err, rows, fields) {
    if (err) throw err;
    cb(err, rows);
  });
};

exports.findUser = function(username, cb){
  dbConnection.query("SELECT id FROM users WHERE user_name = ? LIMIT 1;",
    [username],
    function(err, rows, fields) {
      cb(err, rows);
  });
};

exports.saveUser = function(username, cb){
  dbConnection.query("INSERT INTO users (user_name) VALUES (?)",[username], function(err, rows, fields) {
    rows[0] = {id: rows.insertId};
    cb(rows);
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  //calls saveRoom which calls back insertMessage
  saveRoom(message, userid, roomname, cb, insertMessage);
    // insertMessage calls back original cb
};

var saveRoom = function(message, userid, roomname, cb, callback){
  //add roomname to rooms
    // callback to saveMessage
  dbConnection.query(
    "INSERT INTO rooms (room_name)"+
    "VALUES ( ? )",
    [roomname],
    function(err, rows, fields) {
      callback(message, userid, roomname, cb);
  });
};

var insertMessage = function(message, userid, roomname, cb){
  dbConnection.query(
    "INSERT INTO messages (message_text, user_id, room_id)"+
    "VALUES               (   ?,       ?,       "+
      "(SELECT id FROM rooms WHERE room_name= ?)"+
    ")",
    [message, userid, roomname],
    function(err, rows, fields) {
      if (err) throw err;
      cb(err, rows);
  });
};

/*
 * If you paid attention, you may have noticed that this escaping allows you to do neat things like this:
 *
 * var post  = {id: 1, title: 'Hello MySQL'};
 * var query = connection.query('INSERT INTO posts SET ?', post, function(err, result) {
 *   // Neat!
 * });
 * console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
 *
 */

/*
 *
 * If you are inserting a row into a table with an auto increment primary key, you can retrieve the insert id like this:
 *
 * connection.query('INSERT INTO posts SET ?', {title: 'test'}, function(err, result) {
 *   if (err) throw err;
 *
 *   console.log(result.insertId);
 * });
 *
 */
