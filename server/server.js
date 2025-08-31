const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory storage (in production, use a real database)
let users = [];
let profiles = [];
let matches = [];
let messages = [];

// JWT Secret (in production, use environment variable)
const JWT_SECRET = 'your-secret-key';

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Check if user already exists
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      fullName,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    // Create JWT token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET);

    res.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        createdAt: newUser.createdAt
      },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Profile routes
app.post('/api/profiles', authenticateToken, (req, res) => {
  try {
    const { name, age, gender, location, bio, lookingFor, hobbies, profilePicture } = req.body;

    // Check if profile already exists
    const existingProfile = profiles.find(p => p.userId === req.user.id);
    if (existingProfile) {
      return res.status(400).json({ success: false, message: 'Profile already exists' });
    }

    // Create profile
    const newProfile = {
      userId: req.user.id,
      name,
      age,
      gender,
      location,
      bio,
      lookingFor,
      hobbies,
      profilePicture,
      createdAt: new Date().toISOString()
    };

    profiles.push(newProfile);

    res.json({ success: true, profile: newProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/profiles', authenticateToken, (req, res) => {
  try {
    // Return all profiles except the current user's
    const filteredProfiles = profiles.filter(profile => profile.userId !== req.user.id);
    res.json({ success: true, profiles: filteredProfiles });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Match routes
app.post('/api/matches', authenticateToken, (req, res) => {
  try {
    const { userId1, userId2 } = req.body;

    // Check if match already exists
    const matchId = `${userId1}_${userId2}`;
    const reverseMatchId = `${userId2}_${userId1}`;
    
    if (matches.some(m => m.id === matchId || m.id === reverseMatchId)) {
      return res.status(400).json({ success: false, message: 'Match already exists' });
    }

    // Create match
    const newMatch = {
      id: matchId,
      users: [userId1, userId2],
      createdAt: new Date().toISOString()
    };

    matches.push(newMatch);

    res.json({ success: true, match: newMatch });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/matches', authenticateToken, (req, res) => {
  try {
    // Return matches for current user
    const userMatches = matches.filter(match => match.users.includes(req.user.id));
    res.json({ success: true, matches: userMatches });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Message routes
app.post('/api/messages', authenticateToken, (req, res) => {
  try {
    const { recipientId, content } = req.body;

    const newMessage = {
      id: Date.now().toString(),
      senderId: req.user.id,
      recipientId,
      content,
      timestamp: new Date().toISOString()
    };

    messages.push(newMessage);

    res.json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/messages/:userId', authenticateToken, (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get messages between current user and specified user
    const userMessages = messages.filter(msg => 
      (msg.senderId === req.user.id && msg.recipientId === userId) ||
      (msg.senderId === userId && msg.recipientId === req.user.id)
    );

    res.json({ success: true, messages: userMessages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// File upload route
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Generate demo data
app.post('/api/demo/generate', (req, res) => {
  try {
    const firstNames = [
      "Alex", "Jamie", "Jordan", "Taylor", "Casey", "Riley", "Avery", "Quinn", 
      "Morgan", "Skyler", "Charlie", "Dakota", "Hayden", "Reese", "Finley"
    ];
    
    const lastNames = [
      "S.", "J.", "M.", "L.", "P.", "B.", "C.", "D.", "W.", "R."
    ];
    
    const locations = [
      "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
      "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA"
    ];
    
    const hobbies = [
      "Reading", "Cooking", "Hiking", "Photography", "Gaming", 
      "Traveling", "Music", "Movies", "Sports", "Art", 
      "Dancing", "Writing", "Yoga", "Cycling", "Swimming"
    ];
    
    const bios = [
      "Adventure seeker looking for someone to explore with.",
      "Coffee enthusiast and book lover. Let's discuss our favorite reads over a cup of joe.",
      "Fitness junkie who also enjoys a good Netflix binge.",
      "Foodie who loves trying new restaurants and cooking at home.",
      "Music lover and concert-goer. Always looking for new bands to check out.",
      "Outdoor enthusiast who enjoys hiking, camping, and stargazing.",
      "Travel addict with a bucket list a mile long. Let's check off some destinations together!",
      "Creative soul who enjoys art, photography, and expressing myself.",
      "Animal lover with a soft spot for rescue pets.",
      "Sports fan who never misses a game. Let's cheer for our teams together!"
    ];

    // Generate demo users and profiles
    for (let i = 0; i < 10; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      
      // Create demo user
      const demoUser = {
        id: `demo_${i}`,
        email: `demo${i}@example.com`,
        password: bcrypt.hashSync('password123', 10),
        fullName: name,
        createdAt: new Date().toISOString()
      };
      
      if (!users.find(u => u.email === demoUser.email)) {
        users.push(demoUser);
      }

      // Create demo profile
      const hobbyCount = Math.floor(Math.random() * 3) + 3; // 3-5 hobbies
      const selectedHobbies = [];
      const availableHobbies = [...hobbies];
      
      for (let j = 0; j < hobbyCount; j++) {
        const randomIndex = Math.floor(Math.random() * availableHobbies.length);
        selectedHobbies.push(availableHobbies[randomIndex]);
        availableHobbies.splice(randomIndex, 1);
      }

      const demoProfile = {
        userId: `demo_${i}`,
        name,
        age: Math.floor(Math.random() * 15) + 25, // 25-39
        gender: ['Male', 'Female', 'Non-binary'][Math.floor(Math.random() * 3)],
        location: locations[Math.floor(Math.random() * locations.length)],
        bio: bios[Math.floor(Math.random() * bios.length)],
        lookingFor: ['Relationship', 'Friendship', 'Casual'][Math.floor(Math.random() * 3)],
        hobbies: selectedHobbies,
        profilePicture: "https://placehold.co/600x800",
        createdAt: new Date().toISOString()
      };

      if (!profiles.find(p => p.userId === demoProfile.userId)) {
        profiles.push(demoProfile);
      }
    }

    res.json({ success: true, message: 'Demo data generated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
