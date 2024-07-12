const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'your_password', // Replace with your MySQL password
    database: 'baseball_cards_db' // Replace with your database name
  });
  
  // Connect to the database
  db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
  });
  
  // Middleware to parse JSON bodies
  app.use(express.json());
  
  // Serve static files from the "public" directory
  app.use(express.static(path.join(__dirname, 'public')));
  
  // Define a route for the root URL
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  // Search endpoint
  app.get('/api/search', (req, res) => {
    const { playerName, team, year } = req.query;
    let query = 'SELECT * FROM baseball_cards WHERE 1=1';
    let queryParams = [];
  
    if (playerName) {
      query += ' AND name LIKE ?';
      queryParams.push(`%${playerName}%`);
    }
    if (team) {
      query += ' AND team LIKE ?';
      queryParams.push(`%${team}%`);
    }
    if (year) {
      query += ' AND year = ?';
      queryParams.push(parseInt(year));
    }
  
    db.query(query, queryParams, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });