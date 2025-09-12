// backend/db.js
const mysql = require("mysql2");

// Create a pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // your DB password
  database: "xpertone_health",
  waitForConnections: true,
  connectionLimit: 10,   // up to 10 connections
  queueLimit: 0          // unlimited queued requests
});

// Export the promise-based pool
module.exports = pool.promise();
