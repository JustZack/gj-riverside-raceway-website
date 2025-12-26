const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'schedule.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Create schedule table
  db.run(`
    CREATE TABLE IF NOT EXISTS schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day_of_week TEXT NOT NULL,
      time TEXT NOT NULL,
      description TEXT,
      active INTEGER DEFAULT 1
    )
  `);

  // Insert default schedule (Saturdays and Tuesdays)
  // Use INSERT OR IGNORE to avoid duplicate entries on re-runs
  db.run(`
    INSERT OR IGNORE INTO schedule (id, day_of_week, time, description, active)
    VALUES 
      (1, 'Saturday', '10:00 AM - 5:00 PM', 'Weekend Racing - All Classes', 1),
      (2, 'Tuesday', '6:00 PM - 10:00 PM', 'Weeknight Racing - Open Practice', 1)
  `, (err) => {
    if (err) {
      console.error('Error inserting schedule:', err);
    } else {
      console.log('Schedule database initialized successfully!');
    }
  });
});

db.close((err) => {
  if (err) {
    console.error('Error closing database:', err);
  } else {
    console.log('Database connection closed.');
  }
});
