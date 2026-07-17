# Movies & Series Frontend

A modern React frontend for the Movies & Series backend application.

## Features

- 🎬 Browse movies and series
- 🔍 Search functionality
- 👤 User authentication (Login/Signup)
- ❤️ Favorite movies and series
- 📺 Video playback
- ⭐ Reviews and ratings
- 📱 Responsive design

## Tech Stack

- **React 18** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Backend server running on `http://localhost:3000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the next available port).

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── context/        # React context (Auth)
│   ├── pages/          # Page components
│   ├── services/       # API service
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── public/             # Static assets
└── package.json
```

## API Configuration

The frontend is configured to connect to the backend at `http://localhost:3000`. 
To change this, update the `baseURL` in `src/services/api.js`.

## Available Routes

- `/` - Home page
- `/movies` - All movies
- `/movies/:id` - Movie details
- `/series` - All series
- `/series/:id` - Series details
- `/login` - Login page
- `/signup` - Signup page
- `/profile` - User profile (protected)

