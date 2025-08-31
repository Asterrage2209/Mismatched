# Mismatched - Dating Website

A modern dating website built with React + TypeScript frontend and Node.js backend, featuring interest-based matching, profile creation, and real-time messaging.

## Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Profile Creation**: Multi-step profile setup with interests and photos
- **Interest-Based Matching**: Connect with people who share your hobbies
- **Swipe Interface**: Tinder-like swiping experience
- **Real-time Messaging**: Chat with your matches
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful pink-themed design with Bootstrap

## Tech Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Bootstrap 5 for styling
- Font Awesome for icons
- Vite for build tooling

### Backend
- Node.js with Express
- JWT for authentication
- bcryptjs for password hashing
- multer for file uploads
- CORS enabled

## Project Structure

```
cursor/
├── src/                    # React frontend source
│   ├── components/         # Reusable components
│   ├── contexts/          # React contexts (Auth, Profile)
│   ├── pages/             # Page components
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── server/                # Node.js backend
│   ├── server.js          # Express server
│   └── package.json       # Backend dependencies
├── package.json           # Frontend dependencies
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

### Installing Node.js

1. **Windows**: Download and install from [nodejs.org](https://nodejs.org/)
2. **macOS**: Use Homebrew: `brew install node`
3. **Linux**: Use your package manager or download from nodejs.org

## Installation & Setup

### 1. Install Frontend Dependencies

```bash
# Navigate to the project directory
cd cursor

# Install frontend dependencies
npm install
```

### 2. Install Backend Dependencies

```bash
# Navigate to the server directory
cd server

# Install backend dependencies
npm install
```

### 3. Start the Backend Server

```bash
# From the server directory
npm run dev
```

The backend server will start on `http://localhost:5000`

### 4. Start the Frontend Development Server

```bash
# From the project root directory (cursor/)
npm run dev
```

The frontend will start on `http://localhost:3000`

## Usage

### 1. Generate Demo Data (Optional)

To populate the app with demo profiles, make a POST request to:
```
http://localhost:5000/api/demo/generate
```

You can use tools like Postman or curl:
```bash
curl -X POST http://localhost:5000/api/demo/generate
```

### 2. Create an Account

1. Visit `http://localhost:3000`
2. Click "Sign Up"
3. Fill in your details and create an account
4. Complete your profile setup

### 3. Start Matching

1. Go to the Dashboard
2. Swipe right on profiles you like
3. When you match, you can start chatting
4. View your matches in the sidebar

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Profiles
- `POST /api/profiles` - Create user profile
- `GET /api/profiles` - Get all profiles (except current user)

### Matches
- `POST /api/matches` - Create a match
- `GET /api/matches` - Get user's matches

### Messages
- `POST /api/messages` - Send a message
- `GET /api/messages/:userId` - Get messages with a user

### File Upload
- `POST /api/upload` - Upload profile picture

### Demo Data
- `POST /api/demo/generate` - Generate demo users and profiles

## Development

### Frontend Development

The frontend uses Vite for fast development:

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development

The backend uses nodemon for auto-restart during development:

```bash
npm run dev          # Start development server with nodemon
npm start           # Start production server
```

## Customization

### Styling

The app uses CSS custom properties for theming. Main colors are defined in `src/index.css`:

```css
:root {
  --primary-pink: #ff6b8b;
  --secondary-pink: #ff8fab;
  --light-pink: #ffc2d1;
  --lighter-pink: #ffe5ec;
  --dark-pink: #e75480;
}
```

### Adding New Features

1. **New Pages**: Add components to `src/pages/`
2. **New Components**: Add to `src/components/`
3. **New API Routes**: Add to `server/server.js`
4. **New Context**: Add to `src/contexts/`

## Deployment

### Frontend Deployment

Build the frontend for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to services like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

### Backend Deployment

The backend can be deployed to:
- Heroku
- Railway
- DigitalOcean
- AWS EC2

Make sure to:
1. Set environment variables for production
2. Use a real database instead of in-memory storage
3. Configure CORS for your frontend domain
4. Set up proper JWT secrets

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in `vite.config.ts` or `server.js`
2. **CORS errors**: Check that the backend is running on the correct port
3. **Module not found**: Run `npm install` in both frontend and backend directories
4. **Authentication issues**: Check that JWT tokens are being sent correctly

### Getting Help

If you encounter issues:

1. Check the browser console for frontend errors
2. Check the terminal for backend errors
3. Verify all dependencies are installed
4. Ensure both servers are running

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Feel free to use and modify as needed.

## Support

For questions or support, please open an issue in the repository.
