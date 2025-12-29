# GJ Riverside Raceway Website

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Copy the example environment file and update with your database credentials:
```bash
cp .env.example .env
```

Edit `.env` and set your database credentials:
```
DATABASE_HOST=localhost
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=your_database_name
```

#### 3. Setup Database server tunnel:
```bash
ssh -f -N -L 3306:127.0.0.1:3306 user@server
```

### 4. Set Up Database
Generates the prisma client & schema, then seed the database with relevent info.
```bash
npm run prisma:init
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the Hello World page.

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── api/              # API used by the app
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page for the app
│   └── globals.css       # Global styles
├── components/           # Various app components
│   ├── footer/           # Footer components
│   ├── header/           # Header components
│   ├── schedule/         # Components related to displaying the race schedule
│   ├── schedule/         # Components related to displaying the raceway socials
│   └── ui/               # Generalized UI components
├── public/               # Static content next.js served by Next.js
├── content/              # Text content/configurations for app components
├── lib/                  # Utility libraries
│   ├── api/              # Frontend API library
│   ├── db/               # Backend database library
│   ├── jobs/             # Periodic backend jobs - Syncing & Scraping
│   ├── utils/            # Generally useful utility classes
│   └── prisma.ts         # Prisma client instance
├── prisma/               # Prisma schema and migrations
│   └── schema.prisma     # Database schema
├── instrumentation.tsx   # Runs on startup, mainly related to @/lib/jobs/
├── build-and-run-prod.sh # For pulling updates, initializing, building, then starting FROM the server.
├── .env                  # Environment variables (not in git)
└── .env.example          # Example environment variables
```

## Build for Production
Clone this repository onto the server & run the command below:
```bash
build-and-run-prod.sh
```