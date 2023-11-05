const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();


const SECRET_KEY = 'middleware';

app.use(express.json());

// In-memory database for simplicity (Can replace with actual database)
const users = [];

// Register a new user
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  // Check if the username is already taken
  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already taken' });
  }

  // Store user data in the database
  users.push({ username, password, email });
  console.log(users);
  res.status(201).json({ message: 'User registered successfully' });
});

// User login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists and the password is correct
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // Generate a token for the authenticated user
    const token = jwt.sign({ username }, SECRET_KEY);
    console.log(token);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Account recovery (basic implementation, just for demonstration)
app.post('/recover', (req, res) => {
  const { email } = req.body;

  // Check if the email exists in the database
  const user = users.find(user => user.email === email);

  if (user) {
    // For simplicity, in a real scenario, you might send a recovery email to the user.
    res.json({ message: 'Recovery email sent successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(3001, () => {
  console.log('Authentication Service is running on port 3001');
});
