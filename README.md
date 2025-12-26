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
DATABASE_NAME=gj_riverside_raceway
```

#### Setup Database server tunnel:
```bash
ssh -f -N -L 3306:127.0.0.1:3306 user@server
```

### 3. Set Up Database

Generates the prisma client & schema, then seed the database with relevent info.

```bash
npm run prisma:init
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the Hello World page.

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── lib/                 # Utility libraries
│   └── prisma.ts        # Prisma client instance
├── prisma/              # Prisma schema and migrations
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database initialization
├── .env                 # Environment variables (not in git)
└── .env.example         # Example environment variables
```

## Build for Production

```bash
npm run build
npm start
```