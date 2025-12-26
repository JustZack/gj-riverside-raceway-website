const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database connection
const dbPath = path.join(__dirname, 'schedule.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// API endpoint to get schedule
app.get('/api/schedule', (req, res) => {
  db.all('SELECT * FROM schedule WHERE active = 1 ORDER BY id', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// API endpoint to add schedule entry (for future admin functionality)
app.post('/api/schedule', (req, res) => {
  const { day_of_week, time, description } = req.body;
  
  // Validate required fields
  if (!day_of_week || !time || !description) {
    res.status(400).json({ error: 'Missing required fields: day_of_week, time, and description are required' });
    return;
  }
  
  db.run(
    'INSERT INTO schedule (day_of_week, time, description) VALUES (?, ?, ?)',
    [day_of_week, time, description],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// API endpoint to update schedule entry
app.put('/api/schedule/:id', (req, res) => {
  const { day_of_week, time, description, active } = req.body;
  const { id } = req.params;
  
  // Validate ID is a number
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID: must be a number' });
    return;
  }
  
  // Validate required fields
  if (!day_of_week || !time || !description || active === undefined) {
    res.status(400).json({ error: 'Missing required fields: day_of_week, time, description, and active are required' });
    return;
  }
  
  db.run(
    'UPDATE schedule SET day_of_week = ?, time = ?, description = ?, active = ? WHERE id = ?',
    [day_of_week, time, description, active, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Handle cleanup on exit
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    }
    process.exit(0);
  });
});
