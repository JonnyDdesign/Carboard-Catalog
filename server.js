const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Sample data for demonstration
const baseballCards = [
  { name: 'Babe Ruth', team: 'New York Yankees', year: 1927 },
  { name: 'Hank Aaron', team: 'Atlanta Braves', year: 1974 },
  // Add more cards as needed
];

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files fromthe "public" directory
app.use(express.static(path.join(_dirname, 'public')));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(_dirname, 'public', 'index.html'));
});

// Search endpoint
app.get('/api/search', (req, res) => {
  const { playerName, team, year } = req.query;
  let results = baseballCards;

  if (playerName) {
    results = results.filter(card => card.name.toLowerCase().includes(playerName.toLowerCase()));
  }
  if (team) {
    results = results.filter(card => card.team.toLowerCase().includes(team.toLowerCase()));
  }
  if (year) {
    results = results.filter(card => card.year === parseInt(year));
  }

  res.json(results);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
