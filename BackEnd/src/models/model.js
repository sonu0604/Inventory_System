const db = require('../../db.js');

const createUser = (userData, callback) => {
  const sql = `INSERT INTO users 
    (username, password_hash, role, email, contact, name, picture)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    userData.username,
    userData.password_hash,
    userData.role,
    userData.email,
    userData.contact,
    userData.name,
    userData.picture
  ];
  db.query(sql, values, callback);
};

const findUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

module.exports = {
  createUser,
  findUserByEmail
};
