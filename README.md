# GJ Riverside Raceway Website

A basic, informational website for the Riverside Raceway RC Track featuring:
- Racing schedule stored in SQLite database
- Links to YouTube, LiveTime RC, and Facebook
- YouTube live stream detection and embedding
- Responsive design for mobile and desktop

## Features

### Racing Schedule
- Schedule stored in SQLite database for easy updates
- Default schedule: Saturdays (10:00 AM - 5:00 PM) and Tuesdays (6:00 PM - 10:00 PM)
- Displays next upcoming race day
- Simple API for schedule management

### External Links
- **YouTube**: Watch racing videos and live streams
- **LiveTime RC**: View live timing and race results
- **Facebook Group**: Join the community

### Live Streaming
- Embedded YouTube player
- Shows live stream when racing is active
- Direct links to channel when not live

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JustZack/gj-riverside-raceway-website.git
cd gj-riverside-raceway-website
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database:
```bash
npm run init-db
```

4. Start the server:
```bash
npm start
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

## Configuration

### YouTube Channel
To display your actual YouTube channel and live streams:

1. Edit `public/script.js`
2. Update the configuration at the top of the file:
```javascript
const YOUTUBE_CHANNEL_URL = '@yourchannelhandle'; // Your channel handle (e.g., @gjriversideraceway)
const YOUTUBE_CHANNEL_ID = 'UCyourChannelID123456'; // Your channel ID
```

**Finding your YouTube Channel ID:**
- Go to https://www.youtube.com/account_advanced
- Your channel ID will be displayed under "Channel ID"

**Finding your YouTube Channel Handle:**
- Your handle is the @username visible on your channel page
- Example: `@gjriversideraceway`

### External Links
To update the external links, edit `public/index.html` and modify the href attributes:
- YouTube: Update the link in the YouTube card
- LiveTime RC: Update the link in the LiveTime card
- Facebook: Update the link in the Facebook card

### Updating Schedule
You can update the schedule by:

1. **Directly in the database**: Use any SQLite browser tool to edit `schedule.db`
2. **Using the API**: Send PUT requests to `/api/schedule/:id`
3. **Re-initialize**: Modify `init-db.js` and run `npm run init-db` (safe to run multiple times)

Example API usage to update a schedule entry:
```bash
curl -X PUT http://localhost:3000/api/schedule/1 \
  -H "Content-Type: application/json" \
  -d '{"day_of_week":"Saturday","time":"10:00 AM - 6:00 PM","description":"Weekend Racing","active":1}'
```

## Project Structure

```
gj-riverside-raceway-website/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # Styling
│   └── script.js       # Frontend JavaScript
├── server.js           # Express server
├── init-db.js         # Database initialization
├── package.json       # Dependencies
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## API Endpoints

- `GET /api/schedule` - Get all active schedule entries
- `POST /api/schedule` - Add a new schedule entry (requires: day_of_week, time, description)
- `PUT /api/schedule/:id` - Update a schedule entry (requires: day_of_week, time, description, active)
- `DELETE /api/schedule/:id` - Delete a schedule entry

### API Examples

**Add a new schedule entry:**
```bash
curl -X POST http://localhost:3000/api/schedule \
  -H "Content-Type: application/json" \
  -d '{"day_of_week":"Friday","time":"7:00 PM - 10:00 PM","description":"Special Event Racing"}'
```

**Update an existing entry:**
```bash
curl -X PUT http://localhost:3000/api/schedule/1 \
  -H "Content-Type: application/json" \
  -d '{"day_of_week":"Saturday","time":"10:00 AM - 6:00 PM","description":"Weekend Racing","active":1}'
```

**Delete an entry:**
```bash
curl -X DELETE http://localhost:3000/api/schedule/3
```

## Deployment

### Option 1: Traditional Hosting
1. Upload all files to your web server
2. Install Node.js on the server
3. Run `npm install` and `npm run init-db`
4. Use a process manager like PM2 to keep the server running:
```bash
npm install -g pm2
pm2 start server.js
pm2 save
```

### Option 2: Cloud Platforms
The website can be deployed to platforms like:
- Heroku
- DigitalOcean App Platform
- Railway
- Render
- Vercel (with serverless functions)

Each platform has specific deployment instructions. Generally:
1. Connect your GitHub repository
2. Set the build command to `npm install && npm run init-db`
3. Set the start command to `npm start`
4. Deploy!

## License

MIT
